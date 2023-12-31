import prisma from "utils/prisma";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return await getComments(req, res);
    case "POST":
      return await createComment(req, res);
    case "PUT":
      return await updateComment(req, res);
    default:
      res.status(404).json({ error: "Not Allowed Method" });
      break;
  }
}

async function getComments(req, res) {
  const {
    query: { bribeId },
  } = req;
  try {
    const truthRes = await prisma.comment.findMany({
      where: {
        bribeId: bribeId,
        reactionWhenCommented: 1,
      },
      include: {
        user: {
          select: {
            nickName: true,
            emoji: true,
          },
        },
      },
      rejectOnNotFound: true,
    });
    const lieRes = await prisma.comment.findMany({
      where: {
        bribeId: bribeId,
        reactionWhenCommented: 2,
      },
      include: {
        user: {
          select: {
            nickName: true,
            emoji: true,
          },
        },
      },
      rejectOnNotFound: true,
    });
    res.status(200).json({ truthRes: truthRes, lieRes: lieRes });
  } catch (e) {
    res.status(404).json({
      error: "Get Failed",
      errorMessage: e.message,
    });
  }
}

async function createComment(req, res) {
  const { body } = req;
  try {
    const data = await prisma.comment.create({
      data: {
        comment: body.comment,
        reactionWhenCommented: body.reactionWhenCommented,
        user: {
          connect: {
            id: body.userId,
          },
        },
        bribe: {
          connect: {
            id: body.bribeId,
          },
        },
      },
    });
    return res.status(200).json(data, { success: true });
  } catch (e) {
    // Errors reference
    // https://www.prisma.io/docs/reference/api-reference/error-reference
    res.status(404).json({
      error: "Post Failed",
      errorMessage: e.message,
    });
  }
}

async function updateComment(req, res) {
  const { body } = req;
  try {
    const data = await prisma.reaction.update({
      where: {
        id: body.id,
      },
      data: {
        comment: body.comment,
      },
    });
    return res.status(200).json(data, { success: true });
  } catch (e) {
    // Errors reference
    // https://www.prisma.io/docs/reference/api-reference/error-reference
    res.status(404).json({
      error: "PUT Failed",
      errorMessage: e.message,
    });
  }
}

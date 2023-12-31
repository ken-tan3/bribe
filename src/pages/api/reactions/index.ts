import prisma from "utils/prisma";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return await getReactions(req, res);
    case "POST":
      return await createReaction(req, res);
    case "PUT":
      return await updateReaction(req, res);
    default:
      res.status(404).json({ error: "Not Allowed Method" });
      break;
  }
}

async function getReactions(req, res) {
  const {
    query: { bribeId },
  } = req;
  try {
    const truthRes = await prisma.reaction.groupBy({
      by: ["bribeId"],
      where: {
        reaction: 1,
        bribeId: bribeId,
      },
      _count: {
        _all: true,
      },
    });
    const lieRes = await prisma.reaction.groupBy({
      by: ["bribeId"],
      where: {
        reaction: 2,
        bribeId: bribeId,
      },
      _count: {
        _all: true,
      },
    });
    res.status(200).json({ truthRes: truthRes, lieRes: lieRes });
  } catch (e) {
    res.status(404).json({
      error: "Get Failed",
      errorMessage: e.message,
    });
  }
}

async function createReaction(req, res) {
  const { body } = req;
  try {
    const data = await prisma.reaction.create({
      data: {
        reaction: body.reaction,
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

async function updateReaction(req, res) {
  const { body } = req;
  try {
    const data = await prisma.reaction.update({
      where: {
        id: body.id,
      },
      data: {
        reaction: body.reaction,
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

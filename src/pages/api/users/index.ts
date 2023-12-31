import prisma from "utils/prisma";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return await getUser(req, res);
    case "PUT":
      return await updateUser(req, res);
    default:
      res.status(404).json({ error: "Not Allowed Method" });
      break;
  }
}

async function getUser(req, res) {
  const {
    query: { userId },
  } = req;
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        nickName: true,
        emoji: true,
      },
      rejectOnNotFound: true,
    });
    res.status(200).json(data);
  } catch (e) {
    res.status(404).json({
      error: "Get Failed",
      errorMessage: e.message,
    });
  }
}

// async function createReaction(req, res) {
//   const { body } = req;
//   try {
//     const data = await prisma.reaction.create({
//       data: {
//         reaction: body.reaction,
//         user: {
//           connect: {
//             id: body.userId,
//           },
//         },
//         bribe: {
//           connect: {
//             id: body.bribeId,
//           },
//         },
//       },
//     });
//     return res.status(200).json(data, { success: true });
//   } catch (e) {
//     // Errors reference
//     // https://www.prisma.io/docs/reference/api-reference/error-reference
//     res.status(404).json({
//       error: "Post Failed",
//       errorMessage: e.message,
//     });
//   }
// }

async function updateUser(req, res) {
  const { body } = req;

  const updateField = () => {
    if ("emoji" in body) {
      return {
        emoji: body.emoji,
      };
    } else if ("nickName" in body) {
      return {
        nickName: body.nickName,
      };
    }
  };

  try {
    const data = await prisma.user.update({
      where: {
        id: body.id,
      },
      data: updateField(),
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

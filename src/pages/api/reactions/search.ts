import prisma from "utils/prisma";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return await getReaction(req, res);
    default:
      res.status(404).json({ error: "Not Allowed Method" });
      break;
  }
}

async function getReaction(req, res) {
  const {
    query: { bribeId, userId },
  } = req;
  try {
    const data = await prisma.reaction.findFirst({
      where: {
        userId: userId,
        bribeId: bribeId,
      },
      rejectOnNotFound: true,
    });
    res.status(200).json(data);
    // }
  } catch (e) {
    res.status(404).json({
      error: "Get Failed",
      errorMessage: e.message,
    });
  }
}

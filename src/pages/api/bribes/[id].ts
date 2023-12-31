import prisma from "utils/prisma";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return await getBribe(req, res);
    default:
      res.status(404).json({ error: "Not Allowed Method" });
      break;
  }
}

async function getBribe(req, res) {
  const bribeId = req.query.id;
  try {
    const bribe = await prisma.bribe.findUnique({
      where: {
        id: bribeId,
      },
    });
    res.status(200).json(bribe);
  } catch (e) {
    res.status(404).json({
      error: "Get Failed",
      errorMessage: e.message,
    });
  }
}

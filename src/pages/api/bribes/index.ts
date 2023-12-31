import prisma from "utils/prisma";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return await getBribes(req, res);
    case "POST":
      return await createBribe(req, res);
    case "PUT":
      return await updateBribe(req, res);
    case "DELETE":
      return await deleteBribe(req, res);
    default:
      res.status(404).json({ error: "Not Allowed Method" });
      break;
  }
}

async function getBribes(req, res) {
  const {
    query: { userId },
  } = req;
  try {
    const data = await prisma.bribe.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        what: true,
        who: true,
        googleMapAddress: true,
        googleMapLatitude: true,
        googleMapLongitude: true,
        when: true,
        goods: true,
        howMuch: true,
        howMuchIsoCode: true,
        note: true,
        userId: true,
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

async function createBribe(req, res) {
  const { body } = req;
  try {
    const createdData = await prisma.bribe.create({
      data: {
        id: body.id,
        what: body.what,
        who: body.who,
        googleMapAddress: body.googleMapAddress,
        googleMapLatitude: body.googleMapLatitude,
        googleMapLongitude: body.googleMapLongitude,
        when: body.when,
        goods: body.goods,
        howMuch: body.howMuch,
        howMuchIsoCode: body.howMuchIsoCode,
        note: body.note,
        user: {
          connect: {
            id: body.userId,
          },
        },
      },
    });
    return res.status(200).json(createdData, { success: true });
  } catch (e) {
    // Errors reference
    // https://www.prisma.io/docs/reference/api-reference/error-reference
    res.status(404).json({
      error: "Post Failed",
      errorMessage: e.message,
    });
  }
}

async function updateBribe(req, res) {
  const { body } = req;
  try {
    const data = await prisma.bribe.update({
      where: {
        id: body.id,
      },
      data: {
        what: body.what,
        who: body.who,
        googleMapAddress: body.googleMapAddress,
        googleMapLatitude: body.googleMapLatitude,
        googleMapLongitude: body.googleMapLongitude,
        when: body.when,
        goods: body.goods,
        howMuch: body.howMuch,
        howMuchIsoCode: body.howMuchIsoCode,
        note: body.note,
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

async function deleteBribe(req, res) {
  const { body } = req;

  try {
    const transaction = await prisma.$transaction([
      prisma.bribe.delete({
        where: {
          id: body.id,
        },
      }),
      prisma.reaction.deleteMany({
        where: {
          bribeId: body.id,
        },
      }),
      prisma.comment.deleteMany({
        where: {
          bribeId: body.id,
        },
      }),
    ]);

    return res.status(200).json(transaction, { success: true });
  } catch (e) {
    // Errors reference
    // https://www.prisma.io/docs/reference/api-reference/error-reference
    res.status(400).json({
      error: "DELETE Failed",
      errorMessage: e.message,
    });
  }
}

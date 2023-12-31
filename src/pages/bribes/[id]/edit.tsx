import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Layout from "components/Layout";
import NotFound from "components/NotFound";
import BribeEdit from "components/BribeEdit";

const Edit = ({ sessionUserId, bribeData }) => {
  // get bribeId
  const bribeId = bribeData.id;
  const bribeDataUserId = bribeData.userId;

  if (sessionUserId !== bribeDataUserId) return <NotFound />;

  return (
    <Layout title="Bribe | Edit">
      <BribeEdit
        isNew={false}
        bribeId={bribeId}
        userId={bribeDataUserId}
        bribeData={bribeData}
      ></BribeEdit>
    </Layout>
  );
};

export default Edit;

export async function getServerSideProps(ctx: NextPageContext, res) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        statusCode: 307,
        destination: "/",
      },
    };
  }

  //@ts-ignore
  const sessionUserId = session.user.id;

  const bribeId = ctx.query.id;
  try {
    const bribeRes = await fetch(
      `${process.env.APP_DOMAIN}/api/bribes/${bribeId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const bribeData = await bribeRes.json();

    return {
      props: {
        statusCode: 200,
        bribeData,
        sessionUserId,
      },
    };
  } catch (e) {
    return {
      props: {
        statusCode: 404,
        errorMessage: e.message,
      },
    };
  }
}

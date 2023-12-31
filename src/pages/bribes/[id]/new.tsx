import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useRecoilValue } from "recoil";

import Layout from "components/Layout";
import NotFound from "components/NotFound";
import BribeEdit from "components/BribeEdit";
import newBribeIdState from "atoms/newBribeId";

const New = ({ sessionUserId }) => {
  // get current page path parameter
  const router = useRouter();
  const id = router.query.id;

  // get bribeId in case of new post
  const bribeId = useRecoilValue(newBribeIdState);

  // if page is new post and id is different from what WriteButton.tsx made, throw error.
  if (id !== bribeId) return <NotFound />;

  return (
    <Layout title="Bribe | New">
      <BribeEdit
        isNew={true}
        bribeId={bribeId}
        //@ts-ignore
        userId={sessionUserId}
        bribeData=""
      />
    </Layout>
  );
};

export default New;

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

  return {
    props: {
      statusCode: 200,
      sessionUserId,
    },
  };
}

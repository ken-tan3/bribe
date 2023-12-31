import Error from "next/error";
import { Spacer } from "@nextui-org/react";

import Layout from "components/Layout";
import CardItems from "components/CardItems";
import About from "components/About";

const IndexPage = ({ statusCode, bribesData, reactionsData }) => {
  // if we cannot get bribeData or get error, return error.
  if (statusCode == 404) return <Error statusCode={statusCode} />;

  return (
    <Layout title="Bribe | Home">
      <About />
      <Spacer y={1} />
      <CardItems bribes={bribesData} reactions={reactionsData} />
    </Layout>
  );
};

export default IndexPage;

export async function getServerSideProps() {
  try {
    const [bribesRes, reactionsRes] = await Promise.all([
      fetch(`${process.env.APP_DOMAIN}/api/bribes`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      fetch(`${process.env.APP_DOMAIN}/api/reactions`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    ]);

    const [bribesData, reactionsData] = await Promise.all([
      bribesRes.json(),
      reactionsRes.json(),
    ]);

    return {
      props: {
        statusCode: 200,
        bribesData,
        reactionsData,
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

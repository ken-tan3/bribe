import NextLink from "next/link";

import { Link, Text, Spacer, Container } from "@nextui-org/react";

import Layout from "components/Layout";

const NotFound = () => {
  return (
    <Layout title="404 | Not Found">
      <Container xs css={{ textAlign: "center" }}>
        <Spacer y={1} />
        <Text h4>404 | Page Not Found</Text>
        <Spacer y={1} />
        <NextLink href="/">
          <Link href="/">
            <Text color="primary">Go back home</Text>
          </Link>
        </NextLink>
        <Spacer y={1} />
      </Container>
    </Layout>
  );
};

export default NotFound;

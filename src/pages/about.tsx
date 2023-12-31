import NextLink from "next/link";
import { Link, Text, Container } from "@nextui-org/react";
import Layout from "components/Layout";
import About from "components/About";

const AboutPage = () => (
  <Layout title="Bribe | About">
    <Container xs justify="center" css={{ textAlign: "center" }}>
      <About />
      <NextLink href="/">
        <Link href="/">
          <Text color="primary">Go back home</Text>
        </Link>
      </NextLink>
    </Container>
  </Layout>
);

export default AboutPage;

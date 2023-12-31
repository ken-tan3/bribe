import React, { ReactNode } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  Grid,
  Link,
  Text,
  Container,
  Row,
  Spacer,
  Divider,
  Avatar,
} from "@nextui-org/react";
import { FaTwitter } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa";

import PopoverItem from "components/PopoverItem";
import LoginButton from "components/LoginButton";
import WriteButton from "components/WriteButton";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
  return (
    <>
      <Container xl>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <header>
          <nav>
            <Grid.Container gap={1} alignItems="center" justify="space-between">
              <Grid>
                <PopoverItem
                  placement={"bottom-left"}
                  buttonIcon={<FaMapPin />}
                />
              </Grid>
              <Grid>
                <NextLink href="/">
                  <Link href="/">
                    <Text weight="bold" color="primary" size={20}>
                      Bribe
                    </Text>
                  </Link>
                </NextLink>
              </Grid>
              <Grid>
                <Row>
                  <WriteButton />
                  <LoginButton />
                </Row>
              </Grid>
            </Grid.Container>
          </nav>
        </header>
        {children}
        <footer>
          <Spacer y={4} />
          <Divider />
          <Spacer y={2} />
          <Container xs>
            <Grid.Container>
              <Grid xs={3} justify="flex-end">
                <NextLink href="/about">
                  <Link href="/about">
                    <Text color="primary" css={{ m: 5 }}>
                      About
                    </Text>
                  </Link>
                </NextLink>
              </Grid>
              <Grid xs={3} sm={6} />
              <Grid xs={3}>
                <a
                  href="https://twitter.com/bribe_dev"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Avatar
                    icon={<FaTwitter />}
                    pointer
                    //@ts-ignore
                    css={{
                      color: "$twitter",
                    }}
                    //@ts-ignore
                    color="$white"
                  />
                </a>
              </Grid>
            </Grid.Container>
            <Spacer y={2} />
          </Container>
        </footer>
      </Container>
    </>
  );
};

export default Layout;

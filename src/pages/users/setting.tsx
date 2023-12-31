import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { Grid, Spacer, Row, Container, Text, Col } from "@nextui-org/react";
import { useRecoilState } from "recoil";

import Layout from "components/Layout";
import EmojiPicker from "components/EmojiPicker";
import LogoutButton from "components/LogoutButton";
import CardItems from "components/CardItems";
import InputSave from "components/InputSave";
import emojiState from "atoms/emoji";

const Setting = ({ bribeData, userData, reactionsData }) => {
  const [nickName, setNickName] = useState(userData.nickName);
  const [emoji, setEmoji] = useRecoilState(emojiState);
  const { data: session } = useSession();

  useEffect(() => {
    setEmoji(userData.emoji);
  }, [setEmoji, userData.emoji]);

  if (session) {
    return (
      <Layout title="Bribe | User">
        <Grid.Container>
          <Grid xs={0} sm={3} />
          <Grid xs={12} sm={6}>
            <Container>
              <Col>
                <Spacer y={1} />
                <Row>
                  <EmojiPicker
                    emoji={emoji}
                    setEmoji={setEmoji}
                    userId={userData.id}
                  />
                  <Spacer x={1} />
                  <InputSave
                    nickName={nickName}
                    setNickName={setNickName}
                    userId={userData.id}
                  />
                </Row>
                <Spacer y={1} />
                <Text h4>Setting</Text>
                <Spacer y={0.5} />
                <LogoutButton />
                <Spacer y={1} />
                <Text h4>My Posts</Text>
                <Spacer y={0.5} />
              </Col>
            </Container>
          </Grid>
          <Grid xs={0} sm={3} />
          <CardItems bribes={bribeData} reactions={reactionsData} />
        </Grid.Container>
      </Layout>
    );
  }
  // This return isn't called because redirect to root in getServerSideProps if not session.
  return <></>;
};

export default Setting;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        statusCode: 307,
        destination: "/",
      },
    };
  }
  //@ts-ignore
  const userId = session.user.id;

  try {
    const [bribeRes, userRes, reactionsRes] = await Promise.all([
      fetch(`${process.env.APP_DOMAIN}/api/bribes?userId=${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      fetch(`${process.env.APP_DOMAIN}/api/users?userId=${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
      fetch(`${process.env.APP_DOMAIN}/api/reactions`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    ]);
    const [bribeData, userData, reactionsData] = await Promise.all([
      bribeRes.json(),
      userRes.json(),
      reactionsRes.json(),
    ]);
    return {
      props: {
        statusCode: 200,
        bribeData,
        userData,
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

import { Avatar, Button, Modal, Spacer, Text } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import NextLink from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRecoilValue } from "recoil";

import emojiState from "atoms/emoji";

const LoginButton = () => {
  const { data: session } = useSession();
  const emoji = useRecoilValue(emojiState);
  const [visible, setVisible] = useState(false);

  if (session) {
    return (
      <>
        <NextLink href="/users/setting">
          <Avatar icon={emoji} css={{ fontSize: "20px" }} pointer />
        </NextLink>
      </>
    );
  }
  return (
    <>
      <Avatar
        icon={emoji}
        css={{ fontSize: "20px" }}
        pointer
        onClick={() => setVisible(true)}
      />
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => setVisible(false)}
        css={{ m: 10 }}
      >
        <Modal.Header>
          <Text id="modal-title" size="20">
            Sign in to Google
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Button
            auto
            onClick={async () =>
              await signIn("google", {
                callbackUrl: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/users/setting`,
              })
            }
            css={{
              background: "transparent",
              m: 50,
              borderColor: "$gray",
              borderRadius: "30px",
            }}
            bordered
            ripple={false}
          >
            <FcGoogle size="20" />
            <Spacer x={1} />
            <Text size="20">Google</Text>
          </Button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginButton;

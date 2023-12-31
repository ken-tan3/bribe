import { signOut } from "next-auth/react";
import { Button, Spacer, Text, Row } from "@nextui-org/react";

const LogoutButton = () => {
  return (
    <Row>
      <Text>Logout</Text>
      <Spacer x={1} />
      <Button
        flat
        color="error"
        size="xs"
        onClick={() =>
          signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_APP_DOMAIN}` })
        }
      >
        LOGOUT
      </Button>
    </Row>
  );
};

export default LogoutButton;

import Router from "next/router";
import { useSession } from "next-auth/react";
import { Avatar } from "@nextui-org/react";
import { useRecoilState } from "recoil";

import { FaPen } from "react-icons/fa";

import newBribeId from "atoms/newBribeId";
import newId from "utils/newId";

const WriteButton = () => {
  const { data: session } = useSession();

  const [bribeId, setBribe] = useRecoilState(newBribeId);

  const onClick = () => {
    const newBribeId = newId();
    setBribe(newBribeId);
    const newBribeUrl = "/bribes/" + newBribeId + "/new";
    Router.push(newBribeUrl);
  };

  if (session) {
    return (
      <Avatar
        icon={<FaPen />}
        pointer
        css={{
          color: "$primaryLight",
        }}
        //@ts-ignore
        color="$white"
        onClick={onClick}
      />
    );
  }
  return <></>;
};

export default WriteButton;

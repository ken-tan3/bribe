import { useRouter } from "next/router";
import { Avatar } from "@nextui-org/react";
import { FaTwitter } from "react-icons/fa";
import { TwitterShareButton } from "react-share";

const Twitter = ({ bribeData }) => {
  const router = useRouter();
  const path = router.asPath;
  const url = `${process.env.NEXT_PUBLIC_APP_DOMAIN}${path}`;
  const what = bribeData.what ? `[Title] ${bribeData.who}` : "";
  const who = bribeData.who ? `[Who] ${bribeData.who}` : "";
  const via = `By @bribe_dev`;
  const text = `${via}\n${what}\n${who}\n`;
  return (
    <TwitterShareButton
      url={url}
      title={text}
      hashtags={[]}
      // @ts-ignore
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
    </TwitterShareButton>
  );
};

export default Twitter;

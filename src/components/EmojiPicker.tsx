import dynamic from "next/dynamic";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import { Avatar, Popover } from "@nextui-org/react";
import { useState } from "react";

import sendData from "utils/sendData";

const EmojiPicker = ({ userId, emoji, setEmoji }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onEmojiClick = (e, newEmojiObject) => {
    e.preventDefault();
    const body = {
      id: userId,
      emoji: newEmojiObject.emoji,
    };
    setEmoji(newEmojiObject.emoji);
    setIsOpen(false);
    sendData("PUT", "/api/users", body);
  };

  return (
    <div>
      <Popover
        placement="bottom-left"
        isOpen={isOpen}
        //@ts-ignore
        shouldCloseOnInteractOutside={() => setIsOpen(false)}
      >
        <Popover.Trigger>
          <Avatar
            //@ts-ignore
            onClick={() => setIsOpen(true)}
            icon={emoji}
            css={{ fontSize: "20px" }}
          />
        </Popover.Trigger>
        <Popover.Content>
          <Picker onEmojiClick={onEmojiClick} />
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default EmojiPicker;

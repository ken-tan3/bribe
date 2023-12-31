import { useState } from "react";
import { Modal, Button, Text, Avatar, Textarea } from "@nextui-org/react";
import { FaCommentAlt } from "react-icons/fa";

import sendData from "utils/sendData";

const CommentModal = ({ bribeId, reaction, userId, comments, setComments }) => {
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState("");

  const modalHeader = () => {
    if (reaction == 1) {
      return (
        <>
          <Text id="modal-title" color="success">
            Comment To Truth
          </Text>
        </>
      );
    }
    return (
      <>
        <Text id="modal-title" color="primary">
          Comment To Lie
        </Text>
      </>
    );
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const getComments = async () => {
    const commentsRes = await fetch(
      `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/comments?bribeId=${bribeId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const commentsData = await commentsRes.json();
    return commentsData;
  };

  const onClick = async (e) => {
    e.preventDefault();
    if (comment) {
      // api request
      const body = {
        comment: comment,
        reactionWhenCommented: reaction,
        userId: userId,
        bribeId: bribeId,
      };
      await sendData("POST", "/api/comments", body);
      // get comments after post
      await getComments().then((commentsData) => setComments(commentsData));

      // useState
      setVisible(false);
      setComment("");
      return;
    }
    alert("Please Write Some Comments");
  };

  return (
    <>
      <Avatar
        icon={<FaCommentAlt />}
        pointer
        css={{
          color: "$primaryLight",
        }}
        //@ts-ignore
        color="$white"
        onClick={() => setVisible(true)}
      />

      <Modal
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>{modalHeader()}</Modal.Header>
        <Modal.Body>
          <Textarea
            initialValue={comment}
            placeholder="Some Comments"
            onChange={onChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="error"
            flat
            size="xs"
            onClick={() => setVisible(false)}
          >
            CANCEL
          </Button>
          <Button color="success" flat size="xs" onClick={onClick}>
            POST
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommentModal;

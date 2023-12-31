import { Text, Card, Spacer, Row } from "@nextui-org/react";

const CommentItem = ({ commentRes }) => {
  return (
    <Card
      css={{
        minWidth: "290px",
      }}
    >
      <Text css={{ overflowWrap: "break-word" }}>{commentRes.comment}</Text>
      <Row justify="flex-end">
        {commentRes.user.emoji}
        <Spacer x={0.5} />
        <Text small> {commentRes.user.nickName}</Text>
      </Row>
    </Card>
  );
};

export default CommentItem;

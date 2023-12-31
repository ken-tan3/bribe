import { Fragment } from "react";
import { Text, Spacer, Container, Col } from "@nextui-org/react";

import CommentItem from "components/CommentItem";

const CommentItems = ({ commentsData }) => {
  if (!commentsData) {
    return <></>;
  }

  return (
    <Col>
      {commentsData.lieRes.length ? (
        <>
          <Container xs>
            <Spacer y={1} />
            <Text color="primary">Comment To Lie</Text>
            {commentsData.lieRes.map((commentRes, index) => {
              return (
                <Fragment key={index}>
                  <Spacer y={0.5} />
                  <CommentItem commentRes={commentRes} />
                </Fragment>
              );
            })}
          </Container>
        </>
      ) : (
        <></>
      )}
      {commentsData.truthRes.length ? (
        <>
          <Container xs>
            <Spacer y={1} />
            <Text color="success">Comment To Truth</Text>
            {commentsData.truthRes.map((commentRes, index) => {
              return (
                <Fragment key={index}>
                  <Spacer y={0.5} />
                  <CommentItem commentRes={commentRes} />
                </Fragment>
              );
            })}
          </Container>
        </>
      ) : (
        <></>
      )}
    </Col>
  );
};

export default CommentItems;

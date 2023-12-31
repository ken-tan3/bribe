import { useState } from "react";
import { Button, Row, Spacer, Text } from "@nextui-org/react";

import sendData from "utils/sendData";

export const TruthButton = ({
  userId,
  bribeId,
  reaction,
  setReaction,
  reactionId,
  conditions,
  setConditions,
}) => {
  const onClick = (prevReaction: number, newReaction: number) => {
    setReaction(newReaction);
    if (prevReaction == 0 && newReaction == 1) {
      setConditions({
        lieCount: conditions.lieCount,
        truthCount: conditions.truthCount + 1,
      });
    } else if (prevReaction == 2 && newReaction == 1) {
      setConditions({
        lieCount: conditions.lieCount - 1,
        truthCount: conditions.truthCount + 1,
      });
    } else if (prevReaction == 1 && newReaction == 0) {
      setConditions({
        lieCount: conditions.lieCount,
        truthCount: conditions.truthCount - 1,
      });
    }

    // error will happen if no post is found in db
    if (reactionId) {
      const body = {
        id: reactionId,
        reaction: newReaction,
      };
      sendData("PUT", "/api/reactions", body);
    } else {
      const body = {
        reaction: newReaction,
        userId: userId,
        bribeId: bribeId,
      };
      sendData("POST", "/api/reactions", body);
    }
  };

  if (reaction == 1) {
    return (
      <Button
        size="xs"
        color="success"
        ripple={false}
        // @ts-ignore
        onClick={() => onClick(reaction, 0)}
      >
        TRUTH
      </Button>
    );
  }
  return (
    <Button
      size="xs"
      css={{
        color: "$gray",
        borderColor: "$gray",
        background: "$white",
      }}
      bordered
      ripple={false}
      // @ts-ignore
      onClick={() => onClick(reaction, 1)}
    >
      TRUTH
    </Button>
  );
};

export const LieButton = ({
  userId,
  bribeId,
  reaction,
  setReaction,
  reactionId,
  conditions,
  setConditions,
}) => {
  const onClick = (prevReaction: number, newReaction: number) => {
    setReaction(newReaction);
    if (prevReaction == 0 && newReaction == 2) {
      setConditions({
        lieCount: conditions.lieCount + 1,
        truthCount: conditions.truthCount,
      });
    } else if (prevReaction == 1 && newReaction == 2) {
      setConditions({
        lieCount: conditions.lieCount + 1,
        truthCount: conditions.truthCount - 1,
      });
    } else if (prevReaction == 2 && newReaction == 0) {
      setConditions({
        lieCount: conditions.lieCount - 1,
        truthCount: conditions.truthCount,
      });
    }

    // error will happen if no post is found in db
    if (reactionId) {
      const body = {
        id: reactionId,
        reaction: newReaction,
      };
      sendData("PUT", "/api/reactions", body);
    } else {
      const body = {
        reaction: newReaction,
        userId: userId,
        bribeId: bribeId,
      };
      sendData("POST", "/api/reactions", body);
    }
  };

  if (reaction == 2) {
    return (
      <Button
        size="xs"
        ripple={false}
        // @ts-ignore
        onClick={() => onClick(reaction, 0)}
      >
        LIE
      </Button>
    );
  }
  return (
    <Button
      size="xs"
      css={{
        color: "$gray",
        borderColor: "$gray",
        background: "$white",
      }}
      bordered
      ripple={false}
      // @ts-ignore
      onClick={() => onClick(reaction, 2)}
    >
      LIE
    </Button>
  );
};

const TruthLieButton = ({
  userId,
  bribeId,
  reaction,
  setReaction,
  reactionId,
  lieCount,
  truthCount,
}) => {
  const [conditions, setConditions] = useState({
    lieCount: lieCount,
    truthCount: truthCount,
  });

  return (
    <Row justify="center">
      {LieButton({
        userId,
        bribeId,
        reaction,
        setReaction,
        reactionId,
        conditions,
        setConditions,
      })}
      <Spacer x={0.5} />
      <Text>{conditions.lieCount}</Text>
      <Spacer x={1} />
      {TruthButton({
        userId,
        bribeId,
        reaction,
        setReaction,
        reactionId,
        conditions,
        setConditions,
      })}
      <Spacer x={0.5} />
      <Text>{conditions.truthCount}</Text>
    </Row>
  );
};
export default TruthLieButton;

import { useSession } from "next-auth/react";
import {
  Text,
  Card,
  Spacer,
  Row,
  Col,
  Container,
  Divider,
} from "@nextui-org/react";
import { FiPenTool } from "react-icons/fi";
import { CgOrganisation, CgNotes } from "react-icons/cg";
import { SiGooglemaps } from "react-icons/si";
import { BiTime, BiCoin } from "react-icons/bi";
import { GiPresent } from "react-icons/gi";

import BribeItemEllipsisButton from "./BribeItemEllipsisButton";
import TruthLieButton from "components/TruthLieButton";
import TruthLieText from "components/TruthLieText";

const BribeItem = ({
  reaction,
  setReaction,
  bribeData,
  reactionId,
  sessionUserId,
  reactionsData,
}) => {
  const { data: session } = useSession();

  const cardFooter = () => {
    const lieCount = reactionsData.lieRes[0]
      ? reactionsData.lieRes[0]._count._all
      : 0;
    const truthCount = reactionsData.truthRes[0]
      ? reactionsData.truthRes[0]._count._all
      : 0;
    if (session) {
      return (
        <TruthLieButton
          userId={bribeData.userId}
          bribeId={bribeData.id}
          reaction={reaction}
          setReaction={setReaction}
          reactionId={reactionId}
          lieCount={lieCount}
          truthCount={truthCount}
        />
      );
    }
    return (
      <TruthLieText
        justify="center"
        isSmall={false}
        lieCount={lieCount}
        truthCount={truthCount}
      />
    );
  };

  return (
    <Card
      css={{
        minWidth: "330px",
      }}
    >
      <Container xs>
        <Card.Header>
          <Col>
            <Text small>
              <FiPenTool /> Bribed What
            </Text>
            <Text h4>{bribeData.what ?? "---"}</Text>
          </Col>
          <BribeItemEllipsisButton
            sessionUserId={sessionUserId}
            bribeUserId={bribeData.userId}
            bribeId={bribeData.id}
          />
        </Card.Header>
        <Divider />
        <Card.Body>
          <Row>
            <Row>
              <SiGooglemaps />
              <Spacer x={0.2} />
              <Text small css={{ width: "200px", overflowWrap: "break-word" }}>
                {bribeData.googleMapAddress ?? ""}
              </Text>
            </Row>
            <Row>
              <BiTime />
              <Spacer x={0.2} />
              <Text small>
                {bribeData.when
                  ? new Date(bribeData.when).toLocaleDateString("en-ZA")
                  : ""}
              </Text>
            </Row>
          </Row>
          <Spacer y={1} />
          <Col>
            <Text small>
              <CgOrganisation /> Bribed Character or Organization
            </Text>
            <Text size="20px">{bribeData.who}</Text>
          </Col>
          <Spacer y={0.5} />
          <Col>
            <Text small>
              <BiCoin />
              Bribed Amount
            </Text>
            <Text size="20px">
              {bribeData.howMuch
                ? bribeData.howMuch + " " + bribeData.howMuchIsoCode
                : "---"}
            </Text>
          </Col>
          <Spacer y={0.5} />
          <Col>
            <Text small>
              <GiPresent /> Bribed Goods
            </Text>
            <Text size="20px">{bribeData.goods ?? "---"}</Text>
          </Col>
          <Spacer y={0.5} />
          <Text small>
            <CgNotes /> Detail
          </Text>
          <Text size="20px">{bribeData.note ?? "---"}</Text>
        </Card.Body>
        <Card.Footer>{cardFooter()}</Card.Footer>
      </Container>
    </Card>
  );
};

export default BribeItem;

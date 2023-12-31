import { Card, Divider, Grid, Row, Spacer, Text } from "@nextui-org/react";
import NextLink from "next/link";
import { BiTime } from "react-icons/bi";
import { CgOrganisation } from "react-icons/cg";
import { SiGooglemaps } from "react-icons/si";

import TruthLieText from "./TruthLieText";

const CardItem = ({ bribe, lieCount, truthCount }) => {
  return (
    <Grid xs={12} sm={3} justify="center">
      <NextLink href={`/bribes/${bribe.id}`}>
        <Card isPressable isHoverable css={{ width: "330px", margin: "10px" }}>
          <Card.Header>
            <CgOrganisation />
            <Spacer x={0.3} />
            <Text>{bribe.who}</Text>
          </Card.Header>
          <Divider />
          <Card.Body>
            <Row>
              <Row>
                <SiGooglemaps size="15" />
                <Spacer x={0.2} />
                <Text
                  small
                  css={{
                    width: "150px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {bribe.googleMapAddress ?? ""}
                </Text>
              </Row>
              <Row>
                <BiTime size="15" />
                <Spacer x={0.2} />
                <Text small>
                  {bribe.when
                    ? new Date(bribe.when).toLocaleDateString("en-ZA")
                    : ""}
                </Text>
              </Row>
            </Row>
            <Spacer y={0.5} />
            <Text>{bribe.what}</Text>
          </Card.Body>
          <Card.Footer>
            <TruthLieText
              justify="flex-end"
              isSmall={true}
              lieCount={lieCount ? lieCount : 0}
              truthCount={truthCount ? truthCount : 0}
            />
          </Card.Footer>
        </Card>
      </NextLink>
    </Grid>
  );
};
export default CardItem;

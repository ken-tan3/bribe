import { Text, Row, Spacer } from "@nextui-org/react";

const TruthLieText = ({ justify, isSmall, lieCount, truthCount }) => {
  return (
    <Row justify={justify}>
      <Text small={isSmall} size="xs">
        lie
      </Text>
      <Spacer x={0.5} />
      <Text small={isSmall} color="primary">
        {lieCount}
      </Text>
      <Spacer x={1} />
      <Text small={isSmall}>truth</Text>
      <Spacer x={0.5} />
      <Text small={isSmall} color="success">
        {truthCount}
      </Text>
    </Row>
  );
};
export default TruthLieText;

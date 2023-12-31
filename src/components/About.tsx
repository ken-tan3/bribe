import { Grid, Card, Text } from "@nextui-org/react";

const About = () => {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid sm={12} md={7} justify="center">
        <Card css={{ px: "$4", maxWidth: "500px" }}>
          <Text
            h1
            css={{
              textGradient: "45deg, $blue500 -20%, $pink500 50%",
              textAlign: "center",
            }}
            weight="bold"
          >
            Report Bribe
          </Text>
          <Text
            h1
            css={{
              textGradient: "45deg, $yellow500 -20%, $red500 100%",
              textAlign: "center",
            }}
            weight="bold"
          >
            Reduce Bribe
          </Text>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default About;

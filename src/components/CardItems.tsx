import { Fragment } from "react";
import { Grid } from "@nextui-org/react";
import CardItem from "components/CardItem";

const CardItems = ({ bribes, reactions }) => {
  if (!bribes || bribes.error) {
    return <></>;
  }

  const bribesLength = bribes.length;

  let truthCountDictionary = {};
  let lieCountDictionary = {};
  if (reactions && reactions.truthRes && reactions.lieRes) {
    for (let i = 0; i < reactions.truthRes.length; i++) {
      truthCountDictionary[reactions.truthRes[i].bribeId] =
        reactions.truthRes[i]._count._all;
    }
    for (let i = 0; i < reactions.lieRes.length; i++) {
      lieCountDictionary[reactions.lieRes[i].bribeId] =
        reactions.lieRes[i]._count._all;
    }
  }

  return (
    <Grid.Container justify="center">
      {bribes.map((bribe, index) => {
        if (index % 2 == 0) {
          return (
            <Fragment key={index}>
              {/* if map is odds and index is last, change grid place */}
              {index == bribesLength - 1 ? <></> : <Grid xs={0} sm={3} />}
              <CardItem
                bribe={bribe}
                lieCount={lieCountDictionary[bribe.id]}
                truthCount={truthCountDictionary[bribe.id]}
              />
              {index == bribesLength - 1 ? <Grid xs={0} sm={3} /> : <></>}
            </Fragment>
          );
        }
        return (
          <Fragment key={index}>
            <CardItem
              bribe={bribe}
              lieCount={lieCountDictionary[bribe.id]}
              truthCount={truthCountDictionary[bribe.id]}
            />
            <Grid xs={0} sm={3} />
          </Fragment>
        );
      })}
    </Grid.Container>
  );
};
export default CardItems;

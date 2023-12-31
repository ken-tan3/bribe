import { useState } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { Grid } from "@nextui-org/react";

import Layout from "components/Layout";
import CommentItems from "components/CommentItems";
import CardToolbar from "components/CardToolbar";
import BribeItem from "components/BribeItem";
import NotFound from "components/NotFound";
import GoogleMap from "components/GoogleMap";

const Bribe = ({
  statusCode,
  bribeData,
  reactionData,
  reactionsData,
  commentsData,
  sessionUserId,
}) => {
  // googlemap
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [googleMapLatLng, setGoogleMapLatLng] = useState(
    bribeData && bribeData.googleMapLatitude && bribeData.googleMapLongitude
      ? {
          lat: bribeData.googleMapLatitude,
          lng: bribeData.googleMapLongitude,
        }
      : null
  );

  const [reaction, setReaction] = useState(
    // if reactionData is undefined, set 0
    reactionData ? reactionData.reaction : 0
  );
  const [comments, setComments] = useState(commentsData);

  // if we cannot get bribeData or get error, return error.
  if (statusCode == 404) return <NotFound />;

  return (
    <Layout title={`Bribe | Page`}>
      <GoogleMap
        map={map}
        setMap={setMap}
        maps={maps}
        setMaps={setMaps}
        setGeocoder={setGeocoder}
        googleMapLatLng={googleMapLatLng}
      />
      <Grid.Container justify="center">
        <Grid xs={0} sm={1}></Grid>
        <Grid xs={12} sm={7}>
          <BribeItem
            reaction={reaction}
            setReaction={setReaction}
            bribeData={bribeData}
            reactionId={reactionData ? reactionData.id : ""}
            sessionUserId={sessionUserId}
            reactionsData={reactionsData}
          />
        </Grid>
        <CardToolbar
          bribeId={bribeData.id}
          bribeData={bribeData}
          reaction={reaction}
          comments={comments}
          setComments={setComments}
        />
        <Grid xs={12} sm={7}>
          {commentsData ? <CommentItems commentsData={comments} /> : <></>}
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export default Bribe;

export async function getServerSideProps(ctx: NextPageContext, res) {
  // Call an external API endpoint to get data.
  // You can use any data fetching library
  const { id } = ctx.query;

  const session = await getSession(ctx);

  if (!session) {
    try {
      const [bribeRes, reactionsRes, commentsRes] = await Promise.all([
        fetch(`${process.env.APP_DOMAIN}/api/bribes/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        fetch(`${process.env.APP_DOMAIN}/api/reactions?bribeId=${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        fetch(`${process.env.APP_DOMAIN}/api/comments?bribeId=${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
      ]);
      const [bribeData, reactionsData, commentsData] = await Promise.all([
        bribeRes.json(),
        reactionsRes.json(),
        commentsRes.json(),
      ]);
      return {
        props: {
          statusCode: 200,
          bribeData,
          reactionsData,
          commentsData,
        },
      };
    } catch (e) {
      return {
        props: {
          statusCode: 404,
          errorMessage: e.message,
        },
      };
    }
  }

  //@ts-ignore
  const sessionUserId = session.user.id;
  try {
    const [bribeRes, reactionRes, reactionsRes, commentsRes] =
      await Promise.all([
        fetch(`${process.env.APP_DOMAIN}/api/bribes/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        fetch(
          `${process.env.APP_DOMAIN}/api/reactions/search?bribeId=${id}&?userId=${sessionUserId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        ),
        fetch(`${process.env.APP_DOMAIN}/api/reactions?bribeId=${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        fetch(`${process.env.APP_DOMAIN}/api/comments?bribeId=${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
      ]);
    const [bribeData, reactionData, reactionsData, commentsData] =
      await Promise.all([
        bribeRes.json(),
        // if reactionData is undefined, set 0
        reactionRes.json(),
        reactionsRes.json(),
        commentsRes.json(),
      ]);
    return {
      props: {
        statusCode: 200,
        bribeData,
        reactionData,
        reactionsData,
        commentsData,
        sessionUserId,
      },
    };
  } catch (e) {
    return {
      props: {
        statusCode: 404,
        errorMessage: e.message,
      },
    };
  }
}

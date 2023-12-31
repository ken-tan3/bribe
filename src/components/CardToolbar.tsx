import { useSession } from "next-auth/react";
import { Grid } from "@nextui-org/react";

import CommentModal from "components/CommentModal";
import Twitter from "components/Twitter";

const CardToolbar = ({
  bribeId,
  bribeData,
  reaction,
  comments,
  setComments,
}) => {
  const { data: session } = useSession();

  const toolbar = () => {
    return (
      <>
        {session && reaction ? (
          <CommentModal
            bribeId={bribeId}
            reaction={reaction}
            // @ts-ignore
            userId={session.user.id}
            comments={comments}
            setComments={setComments}
          />
        ) : (
          <></>
        )}
        <Twitter bribeData={bribeData} />
      </>
    );
  };
  // user grid twice for responsive
  return (
    <>
      <Grid xs={0} sm={1} justify="center" direction="column" css={{ m: 20 }}>
        {toolbar()}
      </Grid>
      <Grid xs={12} sm={0} justify="center" direction="row" css={{ mt: 15 }}>
        {toolbar()}
      </Grid>
    </>
  );
};
export default CardToolbar;

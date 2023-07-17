"use client";
import * as React from "react";
import {
  MastodonAPIGetPostContextPayload,
  MastodonAPIGetPostPayload,
  // IMastodonPost,
  MastodonPostFeedProps,
} from "./mastodon-post-feed.types";
import { MastodonPostFeedLoading } from "./skeletons/mastodon-post-feed-loading";
import axios from "axios";
// import { MastodonPost } from "./components";
import { MastodonPostPresentation } from "./components";

const MastodonPostFeed = ({
  postId,
  mastodonInstanceUrl,
}: MastodonPostFeedProps) => {
  // const mastodonPostState = React.useState<unknown | null>(null);
  const [mastodonPostAndReplies, setMastodonPostAndReplies] = React.useState<
  MastodonAPIGetPostPayload[]
  >([]);

  React.useEffect(() => {
    axios
      .get<MastodonAPIGetPostPayload>(
        `https://${mastodonInstanceUrl}/api/v1/statuses/${postId}`
      )
      .then((response) => {
        // const originalPost: MastodonAPIGetPostPayload = {
        //   username: response.data.account.username,
        //   userPost: response.data.content,
        // };
        // const originalPost: MastodonAPIGetPostPayload = {...response.data};

        setMastodonPostAndReplies((state) => [...state, response.data]);
      });

    axios
      .get<MastodonAPIGetPostContextPayload>(
        `https://${mastodonInstanceUrl}/api/v1/statuses/${postId}/context`
      )
      .then((response) => {
        // const replies: MastodonAPIGetPostContextPayload[] = response.data.descendants.map(
        //   (reply) => {
        //     return {
        //       username: reply.account.username,
        //       userPost: reply.content,
        //     };
        //   }
        // );

        setMastodonPostAndReplies((state) => [...state, ...response.data.descendants]);
      });

    setMastodonPostAndReplies((state) => [...state.reverse()]);
  }, [postId]);

  React.useEffect(() => {}, [mastodonPostAndReplies]);

  return (
    <div
      id="mastodon-post-feed"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <React.Suspense fallback={<MastodonPostFeedLoading />}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          background: "#313543",
          padding: "16px",
          maxWidth: "23rem",
          maxHeight: "34rem",
          minWidth: "23rem",
          minHeight: "34rem",
          color: "#fff",
          overflowY: "auto",
        }}>
          {mastodonPostAndReplies.map((post, i) => {
            const elementObj = {
              elementId: `mastodon-post-${i}`,
            }
            return (
                <MastodonPostPresentation props={
                  {...elementObj, ...post}
                }/>
            );
          })}
        </div>
      </React.Suspense>
    </div>
  );
};

export default MastodonPostFeed;

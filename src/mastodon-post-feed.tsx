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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";

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
        setMastodonPostAndReplies((state) => [...state, response.data]);
      });

    axios
      .get<MastodonAPIGetPostContextPayload>(
        `https://${mastodonInstanceUrl}/api/v1/statuses/${postId}/context`
      )
      .then((response) => {
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
        <div id="post-feed-container"
            style={{
                width: "100%",
                height: "100%",
                border: ".5rem solid #252330",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
            }}
        >
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
            <div id="mastodon-post-feed-footer"
                style={{
                    flexGrow: 1,
                    background: "#252330",
                    display: "flex",
                    justifyItems: "end",
                    justifyContent: "end",
                    maxHeight: "4rem",
                }}
            >
                <FontAwesomeIcon icon={faGithub}
                    style={{
                        fontSize: "1.5rem",
                        color: "#fff",
                        cursor: "pointer",
                        padding: "1rem 2rem 0 0",
                        }}
                />
            </div>
        </div>
      </React.Suspense>
    </div>
  );
};

export default MastodonPostFeed;

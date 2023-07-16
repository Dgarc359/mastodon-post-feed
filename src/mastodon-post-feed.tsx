"use client";
import * as React from "react";
import {
  MastodonAPIGetPostContextPayload,
  MastodonAPIGetPostPayload,
  MastodonPost,
  MastodonPostFeedProps,
} from "./mastodon-post-feed.types";
import { MastodonPostFeedLoading } from "./skeletons/mastodon-post-feed-loading";
import axios from "axios";

const MastodonPostFeed = ({ postId, mastodonInstanceUrl }: MastodonPostFeedProps) => {
  // const mastodonPostState = React.useState<unknown | null>(null);
  const [mastodonPostAndReplies, setMastodonPostAndReplies] = React.useState<
    MastodonPost[]
  >([]);

  React.useEffect(() => {
    axios
      .get<MastodonAPIGetPostPayload>(
        `https://${mastodonInstanceUrl}/api/v1/statuses/${postId}`
      )
      .then((response) => {
        const originalPost: MastodonPost = {
          username: response.data.account.username,
          userPost: response.data.content,
        };

        setMastodonPostAndReplies((state) => {
          state.push(originalPost);
          return state;
        });
      });
    axios
      .get<MastodonAPIGetPostContextPayload>(
        `https://${mastodonInstanceUrl}/api/v1/statuses/${postId}/context`
      )
      .then((response) => {
        const replies: MastodonPost[] = response.data.descendants.map(
          (reply) => {
            return {
              username: reply.account.username,
              userPost: reply.content,
            };
          }
        );

        setMastodonPostAndReplies((state) => {
          state.push(...replies);
          return state;
        });
      });
  }, [postId]);

  return (
    <React.Suspense fallback={<MastodonPostFeedLoading />}>
      {mastodonPostAndReplies.map((post) => {
        return (
          <div>
            <div>{post.username}</div>
            <div>{post.userPost}</div>
          </div>
        );
      })}
    </React.Suspense>
  );
};

export default MastodonPostFeed;
import { MastodonAPIGetPostPayload } from "@/mastodon-post-feed.types";

export interface IMastodonPostProps {
  props: MastodonAPIGetPostPayload & {
    elementId: string;
  }
}
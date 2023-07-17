
export type MastodonAPIV1GetPostPayload = {
  id: string;
  created_at: string;
  in_reply_to_id: null;
  in_reply_to_account_id: null;
  sensitive: boolean;
  spoiler_text: string;
  visibility: string;
  language: string;
  uri: string;
  url: string;
  replies_count: number;
  reblogs_count: number;
  favourites_count: number;
  edited_at: null;
  content: string;
  reblog: null;
  application: {
    name: string;
    website: string;
  };
  account: {
    id: string;
    username: string;
    acct: string;
    display_name: string;
    locked: boolean;
    bot: boolean;
    discoverable: boolean;
    group: boolean;
    created_at: string;
    note: string;
    url: string;
    avatar: string;
    avatar_static: string;
    header: string;
    header_static: string;
    followers_count: number;
    following_count: number;
    statuses_count: number;
    last_status_at: string;
    noindex:boolean,
    emojis:Array<any>,
    roles:Array<any>,
    fields:Array<any>
  };
  media_attachments:Array<{
      id:string,
      type:string,
      url:string,
      preview_url:string,
      remote_url:null,
      preview_remote_url:null,
      text_url:null,
      meta:{
          original:{
              width:number,
              height:number,
              frame_rate:string,
              duration:number,
              bitrate:number
          },
          small:{
              width:number,
              height:number,
              size:string,
              aspect:number
          }
      },
      description:null,
      blurhash:string
  }>;
  mentions:Array<any>;
  tags:Array<any>;
  emojis:Array<any>;
  card?: {
    url: string;
    title: string;
    description: string;
    type: string;
    author_name: string;
    author_url: string;
    provider_name: string;
    provider_url: string;
    html: string;
    width: number;
    height: number;
    image: string;
    embed_url: string;
    blurhash: string;
},
  poll:null
}

export type MastodonAPIV1GetPostContextPayload = {
  ancestors: Array<MastodonAPIV1GetPostPayload>;
  descendants: Array<MastodonAPIV1GetPostPayload>;
}

export type MastodonAPIGetPostPayload = MastodonAPIV1GetPostPayload;

export type MastodonAPIGetPostContextPayload = MastodonAPIV1GetPostContextPayload;

// // export type MastodonPost = {
// //   username: string;
// //   userPost: string;
// }
// export interface IMastodonPost {
//   username: string;
//   userPost: string;
// }

export type MastodonPostFeedProps = {
  mastodonInstanceUrl: string;
  postId: string;
}
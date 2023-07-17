# Mastodon Post Feed

This project will give you a JSX element that contains a post and all of its replies in a single, scrollable element.

## Features
* Displays a mastodon post and it's replies in chronological order
* Usable in React or Next.js!

## Usage
```tsx
import MastodonPostFeed from 'mastodon-post-feed'

const YourReactFC = () => {
  return (
    <MastodonPostFeed postId="MASTODON_POST_ID" mastodonInstanceUrl="MASTODON_INSTANCE_URL.XYZ" />
  )
}
```

## Future Improvements
* Improve the props API for this component so that consumers can pass the link to the 
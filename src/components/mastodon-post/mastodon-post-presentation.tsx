import * as React from "react";
import { IMastodonPostProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
// import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export const MastodonPostPresentation = ({
  props: {
    url,
    account: { username, avatar_static },
    content: userPost,
    elementId: id,
    card,
    media_attachments,
  },
}: IMastodonPostProps) => {
  return (
    <>
      <div
        id={id}
        style={{
          display: "block",
          padding: "8px",
          borderBottom: "1px solid #b0b0b0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <a href={url}>
            <span>
              <img
                style={{ width: "46px", height: "46px" }}
                src={avatar_static}
                alt=""
              />
            </span>
          </a>
          <div>
            <div>{username}</div>
            {/* <div></div> */}
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: userPost }} />
        {media_attachments.length > 0 &&
          media_attachments.map((media, i) => {
            return (
              <div
                id={`video-${i}`}
                style={{
                  maxWidth: "100%",
                  // maxHeight: "190px",
                  // height: "190px",
                  background: "#000000",
                  borderRadius: "4px",
                  verticalAlign: "baseline",
                  position: "relative",
                  boxSizing: "border-box",
                }}
              >
                <video
                  src={media.url}
                  style={{
                    height: "190px",
                    width: "100%",
                  }}
                />
                <div
                  id={`video-player-controls-${i}`}
                  style={{
                    // display: "inline",
                    display: "inline",
                    direction: "ltr",
                    // justifyContent: "space-between",
                    position: "absolute",
                    zIndex: 2,
                    bottom: 0,
                    top: 0,
                    left: 0,
                    right: 0,
                    background: "transparent",
                    verticalAlign: "baseline",
                    maxHeight: "61px",
                  }}
                >
                  <div style={{verticalAlign: "baseline", display: "inline"}}>
                    {/* <i className={"fa fa-play fa-fw"}/> */}
                    {/* <FontAwesomeIcon icon={faPlay} /> */}
                    <i style={{verticalAlign: "baseline"}}>
                      <FontAwesomeIcon icon={faPlay} />
                    </i>
                  </div>
                </div>
              </div>
            );
          })}
        {card && (
          <a
            href={card.url}
            style={{
              background: "transparent",
              borderColor: "#313543",
              position: "relative",
              display: "flex",
              fontSize: "14px",
              border: "1px solid #393f4f",
              borderRadius: "4px",
              color: "#606984",
              marginTop: "14px",
              textDecoration: "none",
              overflow: "hidden",
            }}
          >
            <div style={{ height: "50px", maxHeight: "50px", display: "flex" }}>
              <div>
                <img
                  style={{
                    width: "69px",
                    height: "50px",
                  }}
                  src={card.image}
                />
              </div>
              <div id="status-card-text" style={{ margin: "8px" }}>
                <div
                  style={{
                    font: "14px",
                    margin: "0px 0px 5px",
                    color: "#9baec8",
                  }}
                >
                  {card.title}
                </div>
                <div style={{ font: "13px" }}>{card.provider_name}</div>
              </div>
            </div>
          </a>
        )}
      </div>
    </>
  );
};

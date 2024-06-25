// @flow

import React from "react";
import styled from "styled-components";

type Props = React.PropsWithChildren<{
  href: string;
  imageSource: string;
  altText: string;
  caption?: string;
}>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  .caption {
    font-size: 0.7em;
    line-height: 1.2em;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color: #aaa;
    padding: 0 5px;
  }
`;

const VideoLink: React.FC<Props> = ({ href, imageSource, altText, caption }) => {
  return (
    <Container>
      <a className="VideoLink" target="_blank" rel="noopener noreferrer" href={href}>
        <img src={imageSource} alt={altText} />
      </a>

      {caption && <div className="caption">{caption}</div>}
    </Container>
  );
};

export default VideoLink;

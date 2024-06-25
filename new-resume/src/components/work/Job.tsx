import cx from "classnames";
import React, { useState } from "react";
import PhotoAlbum, { Photo } from "react-photo-album";
import styled from "styled-components";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import Note from "../lib/Note";
import Company from "./Company";

type Props = React.PropsWithChildren<{
  className?: string;
  start: string;
  end: string;
  company?: string;
  companyHref?: string;
  logo?: string;
  extraLogos?: Array<string>;
  title: string;
  layout: "left" | "right";
  endorsements?: React.ReactNode;
  note?: React.ReactNode;
  photos?: Array<Photo>;
  sidebar?: React.ReactNode;
}>;

const Container = styled.div`
  display: flex;
  padding: 30px 0;

  .examples img,
  .VideoLink img {
    border-radius: 5px;
    -moz-outline-radius: 5px;
    outline: 1px solid #aaa;
    border: 1px solid white;
  }

  .VideoLink img {
    width: 100%;
  }

  .details {
    font-family: "Dosis", sans-serif;
    min-width: 190px;
    max-width: 190px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .company {
    font-size: 1.6em;
    font-weight: normal;
    line-height: 1.1em;
    margin: 0 0 5px;
    padding: 0;
  }

  .company a {
    text-decoration: none;
  }

  .title {
    font-size: 1.1em;
    margin: 0 !important;
    padding: 0;
  }

  .logo {
    width: 100%;
  }

  .extra-logos {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  .extra-logos .logo {
    width: 60%;
  }

  &.right {
    flex-direction: row-reverse;
  }

  &.left .details {
    margin-right: 30px;
  }

  &.right .details {
    margin-left: 30px;
  }

  p {
    margin-top: 0;
  }

  @media (max-width: 800px) {
    display: block !important;

    .logo {
      width: 100% !important;
    }

    .details {
      margin: 0 0 20px !important;
      min-width: initial;
      max-width: initial;
    }
  }
`;

const Job: React.FC<Props> = ({
  className,
  children,
  start,
  end,
  company,
  companyHref,
  logo,
  extraLogos,
  title,
  endorsements,
  note,
  photos,
  sidebar,
  layout = "left",
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(-1);

  const classes = cx(className, {
    left: layout === "left",
    right: layout === "right",
    item: !endorsements,
  });

  return (
    <>
      <Container className={classes}>
        <div className={cx("details")}>
          <div>
            {company && (
              <h4 className="company">
                <Company name={company} href={companyHref} logo={logo} />
              </h4>
            )}

            <h5 className="title">{title}</h5>

            <div className="timeframe">
              {start} — {end}
            </div>
          </div>

          {(note || extraLogos) && (
            <Note>
              {note}

              {extraLogos && (
                <div className={cx("extra-logos")}>
                  {extraLogos.map((extraLogo) => (
                    <img key={extraLogo} className="logo" alt="logo" src={extraLogo} />
                  ))}
                </div>
              )}
            </Note>
          )}

          {photos && (
            <div className="examples">
              <div>
                <PhotoAlbum
                  layout="masonry"
                  photos={photos}
                  spacing={8}
                  padding={0}
                  onClick={({ index }) => setSelectedPhotoIndex(index)}
                />
              </div>

              <Lightbox
                slides={photos}
                open={selectedPhotoIndex >= 0}
                index={selectedPhotoIndex}
                close={() => setSelectedPhotoIndex(-1)}
                plugins={[Fullscreen]}
              />
            </div>
          )}

          {sidebar}
        </div>

        {children && <div className="description">{children}</div>}
      </Container>

      {endorsements}
    </>
  );
};

export default Job;

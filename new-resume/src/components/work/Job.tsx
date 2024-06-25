// @flow

import cx from "classnames";
import React from "react";
import styled from "styled-components";
import Company from "./Company";

type Props = {
  className?: string;
  children: string;
  start: string;
  end: string;
  company?: string;
  companyHref?: string;
  logo?: string;
  extraLogos?: Array<string>;
  title: string;
  layout: "left" | "right";
  endorsements?: React.ReactNode;
};

const Container = styled.div`
  display: flex;
  padding: 30px 0;

  .details {
    font-family: "Dosis", sans-serif;
    min-width: 190px;
  }

  .company {
    font-size: 1.6em;
    font-weight: normal;
    line-height: 1.1em;
    margin: 0 0 15px;
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
    border-top: 1px dotted #ddd;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    padding-top: 20px;
    align-items: center;
  }

  .extra-logos .logo {
    width: 80%;
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

  &.coursera .title {
    margin-bottom: 5px !important;
  }

  &.coursera .timeframe {
    font-size: 0.8em;
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
  layout = "left",
  endorsements,
}) => {
  const classes = cx(className, {
    left: layout === "left",
    right: layout === "right",
    item: !endorsements,
  });

  return (
    <>
      <Container className={classes}>
        <div className={cx("details")}>
          {company && (
            <h4 className="company">
              <Company name={company} href={companyHref} logo={logo} />
            </h4>
          )}

          <h5 className="title">{title}</h5>

          <div className="timeframe">
            {start} — {end}
          </div>

          {extraLogos && (
            <div className={cx("extra-logos")}>
              {extraLogos.map((extraLogo) => (
                <img key={extraLogo} className="logo" alt="logo" src={extraLogo} />
              ))}
            </div>
          )}
        </div>

        {children && <div className="description">{children}</div>}
      </Container>

      {endorsements}
    </>
  );
};

export default Job;

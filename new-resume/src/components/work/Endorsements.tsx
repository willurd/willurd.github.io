// @flow

import cx from "classnames";
import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Container = styled.div`
  --gap: 30px;
  padding-bottom: calc(40px - var(--gap));
  column-fill: balance;
  column-count: 2;
  column-gap: var(--gap);
  orphans: 1;

  & > * {
    display: inline-block;
    margin-bottom: var(--gap);
  }

  @media only screen and (max-width: 600px) {
    & {
      column-count: 1;
    }
  }
`;

const Endoresments: React.FC<Props> = ({ children }) => {
  const classes = cx("Endoresments item");

  return <Container className={classes}>{children}</Container>;
};

export default Endoresments;

// @flow

import React, { Component } from "react";
import cx from "classnames";
import "./Endorsements.css";

type Props = {
  children: React.ReactNode,
};

class Endoresments extends Component<Props> {
  render() {
    const { children } = this.props;
    const classes = cx("Endoresments item");

    return <div className={classes}>{children}</div>;
  }
}

export default Endoresments;

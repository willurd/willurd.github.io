// @flow

import React, { Component } from "react";
import cx from "classnames";
import "./Endorsement.css";
import noProfilePictureImg from "../../img/people/no-profile-picture.png";

type Props = {
  name: string,
  title: string,
  company: string,
  message: string,
  profilePicture?: string,
};

class Endoresments extends Component<Props> {
  render() {
    const { name, title, company, message, profilePicture } = this.props;
    const classes = cx("Endorsement");

    return (
      <div className={classes}>
        <div className="header">
          <div className="profile-picture">
            <img src={profilePicture || noProfilePictureImg} alt="profile" />
          </div>
          <div>
            <div className="name">{name}</div>
            <div className="title">
              {title} at {company}
            </div>
          </div>
        </div>
        <div className="message">{message}</div>
      </div>
    );
  }
}

export default Endoresments;

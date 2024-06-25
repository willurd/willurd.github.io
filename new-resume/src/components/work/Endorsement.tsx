// @flow

import styled from "styled-components";
import noProfilePictureImg from "../../img/people/no-profile-picture.png";

type Props = {
  name: string;
  title: string;
  company: string;
  message: string;
  profilePicture?: string;
};

const Container = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;

  .profile-picture img {
    --size: 40px;
    width: var(--size);
    height: var(--size);
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    border-radius: calc(var(--size) / 4);
  }

  .header {
    display: flex;
    gap: 10px;
    background: #f5f5f5;
    margin: -15px -15px 15px;
    padding: 10px 15px 0;
    border-radius: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .name {
    font-weight: bold;
    font-size: 15px;
  }

  .title {
    font-size: 13px;
    font-weight: normal;
  }

  .message {
    font-size: 13px;
    line-height: 1.4em;
    position: relative;
    z-index: 1;
  }

  .message::before {
    content: "“";
    top: 20px;
    left: -15px;
  }

  .message::after {
    content: "”";
    bottom: -25px;
    right: -10px;
  }

  .message::before,
  .message::after {
    position: absolute;
    font-size: 100px;
    color: #eee;
    z-index: -1;
  }
`;

const Endoresments: React.FC<Props> = ({ name, title, company, message, profilePicture }) => {
  return (
    <Container>
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
    </Container>
  );
};

export default Endoresments;

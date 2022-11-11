import React from "react";
import Endorsements from "./Endorsements";
import Endorsement from "./Endorsement";
import davidChatsuthiphanImg from "../../img/people/david-chatsuthiphan.jfif";

const DaVitaEndorsements = () => (
  <Endorsements>
    <Endorsement
      name="David Chatsuthiphan"
      title="Senior Web Manager"
      company="DaVita"
      message="William was a huge asset to our team. He's fast, smart and can seemingly learn anything. There were countless times when he went the extra mile to get the job done. And all the time, William would have a positive easy going attitude. We had a great time working hard and cranking out killer apps and websites."
      profilePicture={davidChatsuthiphanImg}
    />

    <Endorsement
      name="Ann Nguyen"
      title="Web Designer"
      company="DaVita"
      message="William is a strong designer and developer. He's a quick learner and he'll do whatever it takes to finish a project. He's one of the few developers that has an eye for design and knows the quirks of HTML/CSS. It was great working with him."
    />
  </Endorsements>
);

export default DaVitaEndorsements;

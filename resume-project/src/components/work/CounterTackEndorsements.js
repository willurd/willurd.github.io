import React from "react";
import Endorsements from "./Endorsements";
import Endorsement from "./Endorsement";
import justinWhiteImg from "../../img/people/justin-white.jfif";

const CounterTackEndorsements = () => (
  <Endorsements>
    <Endorsement
      name="Justin White"
      title="Principal Designer, UI/UX"
      company="CounterTack"
      message="William is an extremely talented developer. His skill set and desire to take on new challenges, sets him apart from the rest of the crowd. William is an asset to any team and a pleasure to work with."
      profilePicture={justinWhiteImg}
    />
  </Endorsements>
);

export default CounterTackEndorsements;

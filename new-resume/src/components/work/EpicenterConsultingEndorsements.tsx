import clarkValbergImg from "../../img/people/clark-valberg.jfif";
import Endorsement from "./Endorsement";
import Endorsements from "./Endorsements";

const EpicenterConsultingEndorsements = () => (
  <Endorsements>
    <Endorsement
      name="Clark Valberg"
      title="Founder"
      company="InVision"
      message="I've had the great pleasure of working with Mr. Bowers on several occasions over the past few years. I've brought him in on mission critical projects and trusted him in leadership roles of great consequence. Will Bowers has always delivered with utmost in creativity and integrity. His passion for serving the customer and enthusiasm for solving problems is extraordinary. Will Bowers is highly recommended -- I would hire him again any time!"
      profilePicture={clarkValbergImg}
    />
  </Endorsements>
);

export default EpicenterConsultingEndorsements;

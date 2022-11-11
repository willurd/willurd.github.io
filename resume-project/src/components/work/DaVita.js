import React from "react";
import Job from "./Job";
import logo from "../../img/davita.png";
import DaVitaEndorsements from "./DaVitaEndorsements";

const DaVita = () => (
  <Job
    className="davita"
    start="June 2006"
    end="October 2007"
    company="DaVita, Inc"
    companyHref="https://www.davita.com"
    logo={logo}
    title="Web Designer / Developer"
    layout="right"
    endorsements={<DaVitaEndorsements />}
  >
    <p>
      At DaVita I was responsible for designing, developing and maintaining some of their public-facing websites.
      Developing websites for medical companies has its own set of challenges, especially when your target demographic
      is over 50. I learned a lot about professional design working at DaVita, including how not to be afraid of{" "}
      <span className="bigger">large font sizes</span>.
    </p>
  </Job>
);

export default DaVita;

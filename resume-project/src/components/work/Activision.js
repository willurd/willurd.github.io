
import React from "react";
import logo from "../../img/activision-demonware.png";
import ExternalLink from '../lib/ExternalLink';
import Job from "./Job";

const Activision = () => (
  <Job
    className="activision"
    start="January 2023"
    end="Present"
    company="Activision Blizzard"
    companyHref="https://www.activision.com/"
    logo={logo}
    title="Expert Frontend Engineer"
    layout="right"
  >
    <p>
      I'm now working as a staff-level engineer at Activision Blizzard in the <ExternalLink href="https://www.demonware.net/" label="Demonware" /> studio, fulfilling a life-long dream of working in games. I'm contributing to one of the biggest game franchises of all time, Call of Duty, building UI for the desktop and console games using web technologies.
    </p>
  </Job>
);

export default Activision;

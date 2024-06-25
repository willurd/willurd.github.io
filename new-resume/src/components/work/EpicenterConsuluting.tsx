import React from "react";
import Job from "./Job";
import logo from "../../img/epicenter.png";
import EpicenterConsultingEndorsements from "./EpicenterConsultingEndorsements";

const EpicenterConsulting = () => (
  <Job
    className="epicenter"
    start="July 2007"
    end="2008"
    company="Epicenter Consulting"
    companyHref="https://www.epicenterconsulting.com"
    logo={logo}
    title="Web Developer / Prototyper"
    layout="left"
    endorsements={<EpicenterConsultingEndorsements />}
  >
    <p>
      My job at Epicenter Consulting was to prototype web applications (such as an exit survey application and builder
      for an employee retention company). We had weekly meetings where I was able to interface directly with the clients
      and talk about their needs and how we would meet them. This is when I fell in love with application development.
    </p>
  </Job>
);

export default EpicenterConsulting;

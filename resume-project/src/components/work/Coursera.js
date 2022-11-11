import React from "react";
import Job from "./Job";
import logo from "../../img/coursera.svg";
import CourseraEndorsements from "./CourseraEndorsements";

const Coursera = () => (
  <Job
    className="current coursera"
    start="March 2014"
    end="November 2022"
    company="Coursera"
    companyHref="https://www.coursera.org"
    logo={logo}
    title="Software Engineer"
    layout="left"
    endorsements={<CourseraEndorsements />}
  >
    <p style={{ display: "none" }}></p>

    <p>
      During my time at Coursera I helped build the learner-facing platform from the ground up, organized two
      company-wide Make-a-Thons (their version of a Hack-a-Thon) and helped to improve that process for future
      organizing teams, wrote tooling and editor plugins for internal use, mentored several interns and two full time
      engineers, helped create one of their flagship features, Labs, as a founding member of that team, advocated for
      and helped to modernize their frontend development environment, interviewed hundreds of candidates, spent more
      than two years on the Hiring Committee, six months of which I was leading that team, and worked on a whole host of
      teams and projects on the learner-facing app and instructor-facing admin site.
    </p>
  </Job>
);

export default Coursera;

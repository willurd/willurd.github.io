import React from 'react';
import Job from './Job';
import logo from '../../img/coursera.svg';

const Coursera = () => (
  <Job
    className="current coursera"
    start="March 2014"
    end="Present"
    company="Coursera"
    companyHref="https://www.coursera.org"
    logo={logo}
    title="Software Engineer"
    layout="left"
  >
    <p>
      I'm a frontend engineer at Coursera helping to bring the very best education to anyone
      in the world for free!
    </p>

    <p>
      During my time at Coursera I have helped with a full re-write of our platform to modernize
      it and support on-demand courses, organized two company-wide Make-a-Thons (our version of
      a Hack-a-Thon) and helped to improve the process for future organizing teams, wrote tooling
      and editor plugins for internal use, mentored several interns, worked on projects for new
      business models, advocated and helped to modernize our frontend development environment,
      and worked on a whole host of teams and projects on the learner-facing app and
      instructor-facing admin site.
    </p>
  </Job >
);

export default Coursera;

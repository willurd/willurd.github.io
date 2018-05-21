import React, { Component } from 'react';
import Job from './Job';

const CounterTack = () => (
  <Job
    className="countertack"
    start="November 2007"
    end="March 2014"
    company="CounterTack, Inc"
    companyHref="https://www.countertack.com"
    title="UI Technical Lead"
    layout="right"
  >
    <p>
      My work at CounterTack was eclectic. I did everything from specing, mocking, prototyping
      and building Flex/AIR and Web applications and the backend services that feed them, to
      domain modeling, interaction and user experience design, interfacing with 3rd party
      applications, developing use cases, raw socket development, and designing and implementing
      REST APIs in both Python and Ruby. Throughout my time at CounterTack, I wrote several
      internal usability assessments and libraries for internal customers that abstract away
      3rd party APIs. I contributed to open source projects, and as a team we did some really
      cutting edge work. It was exciting to say the least.
    </p>
  </Job >
);

export default CounterTack;

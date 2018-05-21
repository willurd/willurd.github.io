import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div id="about" className="row section">
        <div className="column content-column">
          <h3 className="greeting">Hey, I'm Will</h3>

          <p>
            I love <em>programming</em>, <em>learning</em>, <em>solving problems</em>, and
            <em>building products</em> and <em>tools</em>. My <em>goal in life</em> is to do
            these things as much as possible for as long as I can.
          </p>

          <p>
            I've worked in <a href="https://www.coursera.org">EdTech</a>, building a world-class
            platform for online learning, and helping to bring the best course content on the
            planet to millions of people for free.
          </p>

          <p>
            I've worked in <a href="https://www.davita.com">Healthcare</a>, building a platform
            where patients at all stages of renal failure could get the care and information
            they need to live a better life.
          </p>

          <p>
            I've worked in <a href="https://www.countertack.com">Cyber Security</a>, building a
            next-generation product that helps businesses detect and neutralize historically
            hard-to-mitigate attacks called Advanced Persistent Threats.
          </p>

          <p>
            I've written production code in a dozen languages. My focus has always been on the
            <em>frontend</em>, but I love to code at any level of the stack, from desktop UIs
            to C libraries. <em>Software engineering is my greatest passion</em>.
          </p>
        </div>
      </div>
    );
  }
}

export default About;

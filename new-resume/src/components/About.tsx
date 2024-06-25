import ExternalLink from "./lib/ExternalLink";

const About = () => {
  return (
    <div id="about" className="row section">
      <div className="column content-column">
        <h3 className="greeting">Hey, I'm Will</h3>

        <p>
          I love <em>programming</em>, <em>learning</em>, <em>solving problems</em>, and &nbsp;
          <em>building products</em> and <em>tools</em>. My <em>goal in life</em> is to do these things as much as
          possible for as long as I can.
        </p>

        <p>
          I'm now working in <ExternalLink href="https://www.activision.com/" label="Video" />{" "}
          <ExternalLink href="https://www.demonware.net/" label="Games" /> on one of the largest, most beloved game
          franchises of all time, Call of Duty, building UI for the game with web technologies.
        </p>

        <p>
          I've worked in <ExternalLink href="https://www.coursera.org" label="EdTech" />, building a world-class
          platform for online learning, and helping to bring the best course content on the planet to millions of people
          for free.
        </p>

        <p>
          I've worked in <ExternalLink href="https://www.gosecure.net/" label="Cyber Security" />, building a
          next-generation product that helps businesses detect and neutralize historically hard-to-mitigate attacks
          called Advanced Persistent Threats.
        </p>

        <p>
          I've worked in <ExternalLink href="https://www.davita.com" label="Healthcare" />, building a platform where
          patients at all stages of renal failure can get the care and information they need to live a better life.
        </p>

        <p>
          I've written production code in a dozen languages. My focus has always been on the &nbsp;<em>frontend</em>,
          but I love to code at any level of the stack, from desktop UIs to C libraries.{" "}
          <em>Programming is my greatest passion</em>.
        </p>
      </div>
    </div>
  );
};

export default About;

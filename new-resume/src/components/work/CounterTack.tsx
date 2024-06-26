import logo from "../../img/countertack.png";
import eventHorizon from "../../img/countertack/event-horizon.jpg";
import goSecure from "../../img/go-secure.webp";
import VideoLink from "../lib/VideoLink";
import CounterTackEndorsements from "./CounterTackEndorsements";
import Job from "./Job";

const CounterTack = () => (
  <Job
    className="countertack"
    start="November 2007"
    end="March 2014"
    company="CounterTack (Now GoSecure)"
    companyHref="https://www.gosecure.net/"
    logo={logo}
    title="UI Technical Lead"
    layout="right"
    endorsements={<CounterTackEndorsements />}
    note={<p>CounterTack is now GoSecure</p>}
    extraLogos={[goSecure]}
    sidebar={
      <>
        <VideoLink
          href="https://www.youtube.com/watch?app=desktop&v=VyVWepjvNwg"
          imageSource={eventHorizon}
          altText="Event Horizon Platform"
          caption="This UI was built over 10 years ago, in Flash. The UI isn't modern, but the technical
          challenges were real."
        />
      </>
    }
  >
    <p>
      I wore many hats at CounterTack. I did everything from specing, mocking, prototyping and building Flex/AIR and Web
      applications and the backend services that feed them, to domain modeling, interaction and user experience design,
      integrating with 3rd party applications, developing use cases, raw socket development, and designing and
      implementing REST APIs in both Python and Ruby. Throughout my time at CounterTack, I wrote several internal
      usability assessments and libraries for internal customers that abstract away 3rd party APIs. I contributed to
      open source projects, and as a team we did some really cutting edge work.
    </p>
  </Job>
);

export default CounterTack;

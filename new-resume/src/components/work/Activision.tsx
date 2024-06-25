import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import logo from "../../img/activision.png";
import codHq from "../../img/activision/cod-hq.png";
import mw3Credit from "../../img/activision/mw3-credit.jpg";
import polar3 from "../../img/activision/polar-3.png";
import polar7 from "../../img/activision/polar-7.png";
import demonwareLogo from "../../img/demonware.png";
import microsoftLogo from "../../img/microsoft.png";
import ExternalLink from "../lib/ExternalLink";
import Job from "./Job";

const photos = [
  { alt: "MW3 Credit", src: mw3Credit, width: 1364, height: 1536 },
  { alt: "COD HQ", src: codHq, width: 2560, height: 1440 },
  { alt: "Polar Area Chart with 7 Elements", src: polar7, width: 2560, height: 1440 },
  { alt: "Polar Area Chart with 3 Elements", src: polar3, width: 2560, height: 1440 },
];

const Activision = () => {
  return (
    <Job
      className="activision"
      start="January 2023"
      end="Present"
      company="Activision Blizzard"
      companyHref="https://www.activision.com/"
      logo={logo}
      extraLogos={[microsoftLogo, demonwareLogo]}
      title="Staff Software Engineer"
      layout="right"
      note={
        <p>
          My team started out in the <ExternalLink href="https://www.demonware.net/" label="Demonware" /> studio, and
          transitioned to Activision Publishing after the acquisition from Microsoft.
        </p>
      }
      photos={photos}
    >
      <p>
        I'm a Staff Software Engineer at Activision Blizzard, fulfilling a life-long dream of working in games. I'm
        contributing to one of the biggest game franchises of all time, Call of Duty, building UI for the desktop and
        console games using web technologies.
      </p>

      <p>
        In my short time at Activision, I proactively modernized my team's tech stack, bringing in best practices like{" "}
        <em>unit testing</em>, <em>linting</em>, automatic code formatting with <em>Prettier</em> and{" "}
        <em>EditorConfig</em>, and <em>npm workspaces</em>. I have built multiple internal tools, including a{" "}
        <em>Chrome Devtools extension</em> that acts as a simulator for the production game environment in which our
        apps are run, giving us gamepad input and audio feedback in the browser, as well as other functionality. I have
        formally <em>mentored</em> an intern on the team, as well as taken every opportunity to informally mentor my
        team through code reviews, spontaneous knowledge sharing, and starting a tech-focused <em>book club</em> and
        regular <em>tech talk watch party</em>. I also started a monthly game session for team members to group up and
        play our game, which has helped to make our largely remote team feel less isolated.
      </p>

      <p>
        I have built UI features that shipped in{" "}
        <ExternalLink href="https://www.callofduty.com/modernwarfare2" label="Call of Duty: Modern Warfare 2" />
        and <ExternalLink href="https://www.callofduty.com/modernwarfare3" label="Call of Duty: Modern Warfare 3" />,
        landing me a <em>credit</em> in MW3 (I joined after the MW2 credit roll had been finalized), and am currently
        working on UI that will ship in{" "}
        <ExternalLink href="https://www.callofduty.com/playnow/blackops6" label="Call of Duty: Black Ops 6" />. I have
        built multiple <em>prototypes</em> for features where it was unclear how they would be implemented or perform in
        production, which <em>shipped</em> in game. I have built <em>libraries</em> that have shipped in production for
        instrumentation, complex scrolling behavior, and more.
      </p>

      <p>
        Lastly, I have done feature work outside of my team for an as-of-yet <em>unnamed product</em>.
      </p>
    </Job>
  );
};

export default Activision;

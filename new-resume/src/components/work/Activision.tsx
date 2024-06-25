import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
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
  const [index, setIndex] = useState(-1);

  return (
    <Job
      className="activision"
      start="January 2023"
      end="Present"
      company="Activision Blizzard"
      companyHref="https://www.activision.com/"
      logo={logo}
      extraLogos={[microsoftLogo, demonwareLogo]}
      title="Staff Frontend Engineer"
      layout="right"
      note={
        <p>
          My team started out in the <ExternalLink href="https://www.demonware.net/" label="Demonware" /> studio, and
          transitioned to Activision Publishing after the acquisition from Microsoft.
        </p>
      }
    >
      <p>
        I'm now working as a staff-level engineer at Activision Blizzard, fulfilling a life-long dream of working in
        games. I'm contributing to one of the biggest game franchises of all time, Call of Duty, building UI for the
        desktop and console games using web technologies.
      </p>

      <p>
        At Activision, I modernized my team's tech stack, bringing in best practices like unit testing, linting,
        automatic code formatting with Prettier and EditorConfig, and npm workspaces. I built multiple internal tools,
        including a Chrome Devtools extension that acts as a simulator for the production game environment in which our
        apps are run. I have formally mentored an intern on the team, as well as taken every opportunity to informally
        mentor my team through code reviews, spontaneous knowledge sharing, and starting a tech-focused book club and
        regular tech talk watch party. I also started a monthly game session for team members to group up and play our
        game, which has helped to make our largely remote team feel less isolated.
      </p>

      <p>
        Additionally, I have built UI features that shipped in Call of Duty: MW2 and Call of Duty: MW3, landing me a
        credit in MW3 (I joined after the MW2 credit roll had been finalized). I have built multiple prototypes for
        features where it was unclear how they would be implemented or perform in production, which then went on to ship
        in game. I have built libraries that have shipped in production for instrumentation, complex scrolling behavior,
        and more.
      </p>

      <p>Lastly, I did some feature work outside of my team for an unfortunately as-of-yet unreleased product.</p>

      <PhotoAlbum
        // masonry
        layout="rows"
        photos={photos}
        spacing={10}
        padding={1}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </Job>
  );
};

export default Activision;

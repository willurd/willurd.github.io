
import React from "react";
import PhotoAlbum from "react-photo-album";
import ExternalLink from "../../components/lib/ExternalLink";
import logo from "../../img/activision.png";
import mw3Credit from "../../img/activision/mw3-credit.jpg";
import demonwareLogo from "../../img/demonware.png";
import microsoftLogo from "../../img/microsoft.png";
import Job from "./Job";

const photos = [
  { alt: "MW3 Credit", src: mw3Credit },
  { alt: "", src: "" },
  { alt: "", src: "" },
  { alt: "", src: "" },
  { alt: "", src: "" },
  { alt: "", src: "" },
  { alt: "", src: "" },
]

const Activision = () => (
  <Job
    className="activision"
    start="January 2023"
    end="Present"
    company="Activision Blizzard"
    companyHref="https://www.activision.com/"
    logo={logo}
    extraLogos={[ microsoftLogo, demonwareLogo ]}
    title="Staff Frontend Engineer"
    layout="right"
  >
    <p>
      I'm now working as a staff-level engineer at Activision Blizzard, fulfilling a life-long dream of working in games. I'm contributing to one of the biggest game franchises of all time, Call of Duty, building UI for the desktop and console games using web technologies.
    </p>

    <p>
      At Activision, I modernized my team's tech stack, bringing in best practices like unit testing, linting, automatic code formatting with Prettier and EditorConfig, and npm workspaces. I built multiple internal tools, including a Chrome Devtools extension that acts as a simulator for the production game environment in which our apps are run. I have formally mentored an intern on the team, as well as taken every opportunity to informally mentor my team through code reviews, spontaneous knowledge sharing, and starting a tech-focused book club and regular tech talk watch party. I also started a monthly game session for team members to group up and play our game, which has helped to make our largely remote team feel less isolated.
    </p>

    <p>Additionally, I have built UI features that shipped in Call of Duty: MW2 and Call of Duty: MW3, landing me a credit in MW3 (I joined after the MW2 credit roll had been finalized).</p>

    <PhotoAlbum layout="rows" photos={photos} />;

    <hr />

    <p>
    My team started out in the <ExternalLink href="https://www.demonware.net/" label="Demonware" /> studio, and transitioned to Activision Publishing after the acquisition from Microsoft.
    </p>
  </Job>
);

export default Activision;

import meImage from "../img/me.jpg";
import trailImage from "../img/trail.jpg";

const Header = () => {
  return (
    <header>
      <div className="header-image-container">
        <img alt="a hiking trail" src={trailImage} />
      </div>

      <div className="header-content">
        <h1>Will Bowers</h1>

        <h4 className="font-normal">
          <span>Staff Software Engineer</span>
          <span className="vertical-rule white" />
          <span>Frontend</span>
        </h4>

        <div className="column heading-column content-column">
          <div className="me">
            <img alt="Will Bowers" src={meImage} width="150" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

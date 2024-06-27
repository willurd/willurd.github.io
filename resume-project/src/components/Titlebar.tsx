import ExternalLink from "./lib/ExternalLink";

const Email = "william.bowers@gmail.com";

const Titlebar = () => {
  return (
    <div className="title-bar row smaller">
      <div className="float-right">
        <a className="nostyle" href={`mailto:${Email}`}>
          {Email}
        </a>
      </div>

      <div>
        <ExternalLink href="http://www.linkedin.com/in/wbowers" label="LinkedIn" />
        &nbsp;&nbsp;·&nbsp;&nbsp;
        <ExternalLink href="https://github.com/willurd" label="GitHub" />
      </div>
    </div>
  );
};

export default Titlebar;

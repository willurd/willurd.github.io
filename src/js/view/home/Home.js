import _ from "lodash";
import React from "react";
import ReactAddons from "react-addons";
import titleMixin from "mixin/title";
import TRIM from "lib/TRIM";

const cx = ReactAddons.classSet;

const IconLink = React.createClass({
  onMouseEnter() {
    this.props.onActivate(this.props);
  },

  render() {
    return (
      <li className={cx("IconLink", this.props.isActive ? "active" : "", this.props.id)}>
        <a href={this.props.href} target="_blank">
          <i className={this.props.iconClass} onMouseEnter={this.onMouseEnter}></i>
        </a>
      </li>
    );
  },
});

const MyLinks = React.createClass({
  getInitialState() {
    return {
      activeLink: null,
      links: [
        {
          id: "github",
          iconClass: "fa fa-github",
          href: "https://github.com/willurd",
          text: TRIM`
            Check out my code (including this site).
          `,
        },
        {
          id: "linkedin",
          iconClass: "fa fa-linkedin",
          href: "https://www.linkedin.com/in/wbowers",
          text: TRIM`
            Read up on my professional history.
          `,
        },
      ],
    };
  },

  onActivate(link) {
    this.setState({ activeLink: link });
  },

  render() {
    let activeLink = this.state.activeLink;

    return (
      <div className="MyLinks">
        <ul>
          {this.state.links.map((link) => (
            <IconLink
              key={link.id}
              {...link}
              isActive={activeLink && activeLink.id === link.id}
              onActivate={this.onActivate}
            />
          ))}
        </ul>

        {activeLink && <div className="active-link-text" dangerouslySetInnerHTML={{ __html: activeLink.text }}></div>}
      </div>
    );
  },
});

const Home = React.createClass({
  mixins: [titleMixin(1)],

  componentDidMount() {
    this.title("Senior Software Engineer");
  },

  getInitialState() {
    return {
      message: TRIM`
        I'm a Senior Software Engineer at
        <a href='https://www.coursera.org/' target='_blank'>Coursera</a>,
        helping them provide
        <br />
        <strong>universal access to the world's best education</strong>.
      `,
    };
  },

  render() {
    return (
      <div className="Home">
        <p className="lead" dangerouslySetInnerHTML={{ __html: this.state.message }}></p>
        <MyLinks />
      </div>
    );
  },
});

export default Home;

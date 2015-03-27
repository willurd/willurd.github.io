import React from 'react';
import ReactAddons from 'react-addons'
import titleMixin from 'mixin/title';

const cx = ReactAddons.classSet;

const IconLink = React.createClass({
  onMouseEnter() {
    this.props.onActivate(this.props);
  },

  render() {
    return (
      <li className={cx('IconLink', this.props.id)}>
        <i
          className={this.props.iconClass}
          onMouseEnter={this.onMouseEnter}></i>
      </li>
    );
  }
});

const MyLinks = React.createClass({
  getInitialState() {
    return {
      activeLink: null,
      links: [
        {
          id: 'github',
          iconClass: 'fa fa-github',
          link: 'https://github.com/willurd',
          text: `
            Check out my code (including this site).
          `
        },
        {
          id: 'linkedin',
          iconClass: 'fa fa-linkedin',
          link: 'http://www.linkedin.com/in/wbowers',
          text: `
            Take a look at my professional history.
          `
        },
        {
          id: 'accredible',
          iconClass: '',
          link: 'http://www.accredible.com/u/willurd',
          text: `
            Check out my portfolio on online course certificates.
          `
        },
        {
          id: 'gibbon',
          iconClass: '',
          link: 'https://gibbon.co/willurd',
          text: `
            Take a look at what I'm teaching.
          `
        },
        {
          id: 'soundcloud',
          iconClass: 'fa fa-soundcloud',
          link: 'http://soundcloud.com/willurd',
          text: `
            Check out my music
          `
        },
      ]
    };
  },

  onActivate(link) {
    this.setState({ activeLink: link });
  },

  render() {
    return (
      <div className='MyLinks'>
        <ul>
          {this.state.links.map(link =>
            <IconLink key={link.id} {...link} onActivate={this.onActivate} />
          )}
        </ul>

        {this.state.activeLink &&
          <div dangerouslySetInnerHTML={{__html: this.state.activeLink.text}}></div>}
      </div>
    );
  }
});

const Home = React.createClass({
  mixins: [
    titleMixin(1)
  ],

  componentDidMount() {
    this.title('Software Engineer');
  },

  render() {
    return (
      <div className='Home'>
        <p>
          I am a Software Engineer at <a href='https://www.coursera.org/'>Coursera</a>,&nbsp;
          helping them provide <em>universal access to the world's best education</em>.
        </p>

        <MyLinks />
      </div>
    );
  }
});

export default Home;

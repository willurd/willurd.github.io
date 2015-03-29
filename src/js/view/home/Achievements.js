import React from 'react';
import { Parse } from 'parse';
import Achievement from 'model/Achievement';

const AchievementItem = React.createClass({
  render() {
    return (
      <div className='Achievement'>
        <div className='icon'>
          <i className='fa fa-trophy'></i>
        </div>
        <div className='text'>
          <div className='title'>Achievement unlocked!</div>
          <div className='achievement'>{ this.props.achievement.get('text') }</div>
        </div>
      </div>
    );
  }
});

const Achievements = React.createClass({
  getInitialState() {
    return {
      achievements: []
    };
  },

  componentDidMount() {
    new Parse.Query(Achievement)
      .limit(3)
      .descending('createdAt')
      .find(achievements => this.setState({ achievements: achievements }));
  },

  render() {
    console.debug(this.state.achievements);

    return (
      <div className='Achievements'>
        {this.state.achievements.map(achievement =>
          <AchievementItem key={achievement.id} achievement={achievement} />
        )}
      </div>
    );
  }
});

export default Achievements;

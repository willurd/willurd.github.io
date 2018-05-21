import React, { Component } from 'react';

class Titlebar extends Component {
  render() {
    return (
      <div class="title-bar row smaller">
        <div class="float-right">
          <a class="nostyle" href="mailto:william.bowers@gmail.com">william.bowers@gmail.com</a>
        </div>

        <div>
          <a target="_blank" href="http://www.linkedin.com/in/wbowers">LinkedIn</a>
          &bullet;
          <a target="_blank" href="https://github.com/willurd">GitHub</a>
        </div>
      </div>
    );
  }
}

export default Titlebar;

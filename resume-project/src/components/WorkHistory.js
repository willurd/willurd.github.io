import React, { Component } from 'react';
import Coursera from './work/Coursera';
import CounterTack from './work/CounterTack';
import EpicenterConsuluting from './work/EpicenterConsuluting';
import DaVita from './work/DaVita';
import Microsource from './work/Microsource';
import Freelance from './work/Freelance';



class WorkHistory extends Component {
  render() {
    return (
      <div id="work-history" className="row section scrollspy">
        <div className="column heading-column">
          <h3>Work History</h3>
        </div>

        <div className="column content-column">
          <Coursera />
          <CounterTack />
          <EpicenterConsuluting />
          <DaVita />
          <Microsource />
          <Freelance />
        </div>
      </div>
    );
  }
}

export default WorkHistory;

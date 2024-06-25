import { Component } from "react";
import Activision from "./work/Activision";
import CounterTack from "./work/CounterTack";
import Coursera from "./work/Coursera";
import DaVita from "./work/DaVita";
import EpicenterConsuluting from "./work/EpicenterConsuluting";
import Freelance from "./work/Freelance";
import Microsource from "./work/Microsource";

class WorkHistory extends Component {
  render() {
    return (
      <div id="work-history" className="row section">
        <div className="column content-column">
          <Activision />
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

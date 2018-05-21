import React, { Component } from 'react';
import ExternalLink from '../lib/ExternalLink';

class Contributions extends Component {
  render() {
    return (
      <div>
        <h4>Contributions</h4>

        <Vim />
        <LibCouchbase />
      </div>
    );
  }
}

const Vim = () => (
  <div>
    <h5>Vim <span className="smaller text-muted">(C)</span></h5>

    <p>
      Added a patch to Vim to allow users to specify what happens when a tab
      is closed. Before the patch, the tab to the right would be selected.
      The patch added a setting, and functionality, for selecting the tab
      to the left instead.
    </p>

    <ul>
      <li>
        <ExternalLink href="https://groups.google.com/forum/embed/#!topic/vim_dev/3fq0WJmlHeg" label="Submission thread" />
      </li>
    </ul>
  </div>
);

const LibCouchbase = () => (
  <div>
    <h5>libcouchbase <span className="smaller text-muted">(C)</span></h5>

    <p>Some changes were submitted as Paul Farag (a coworker who, at one point, was responsible for pushing contributions upstream
to open source projects).</p>

    <ul>
      <li>
        <ExternalLink href="https://github.com/couchbase/libcouchbase/commit/aa54a4dd1ea125337c1a479ae4c44770b31d671c" label="Tap filtration" />
      </li>
      <li>
        <ExternalLink href="https://github.com/couchbase/libcouchbase/commit/4c7f138c920d10786f4cd2cf9edd3c7454f3884d" label="Internal error handling" />
      </li>
    </ul>
  </div>
);

export default Contributions;

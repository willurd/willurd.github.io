import React, { Component } from 'react';
import ExternalLink from '../lib/ExternalLink';

class Created extends Component {
  render() {
    return (
      <div>
        <h4>Projects I've Created</h4>

        <p>
          <i>(I have a few more recent projects that are not online just yet that I would be willing to share.)</i>
        </p>

        <Variadic />
        <ScopeStatus />
        <JsLisp />
      </div>
    );
  }
}

const Variadic = () => (
  <div>
    <h5>
      <ExternalLink href="https://github.com/willurd/variadic.js" label="variadic.js" />
      &nbsp;
      <span>(JavaScript)</span>
    </h5>
    <p>
      A JavaScript library that cleans up your functions that accept different types and
      arrangements of arguments.
    </p>
  </div>
);

const ScopeStatus = () => (
  <div>
    <h5>
      <ExternalLink href="https://github.com/willurd/ScopeStatus" label="ScopeStatus" />
      &nbsp;
      <span className="smaller text-muted">(Python)</span>
    </h5>

    <p>
      A Sublime Text plugin that, when activated, shows you the "scope" of the syntax
      at the current cursor position. This is useful when writing plugins or themes, as
      parts of a document are referenced by their scope.
    </p>
  </div>
);

const JsLisp = () => (
  <div>
    <h5>
      <ExternalLink href="https://github.com/willurd/js-lisp" label="js-lisp" />
      &nbsp;
      <span className="smaller text-muted">(JavaScript, Lisp)</span>
    </h5>

    <p>
      A lisp interpreter that runs in the browser, written 100% in JavaScript. The
      project is old and the code is kind of gross, but it was super fun to write.
    </p>

    <p>
      I wrote quite a large suite of unit tests for this project. The tests are actually
      &nbsp;<ExternalLink href="https://github.com/willurd/js-lisp/blob/master/tests/tests.lisp" label="written in lisp" />,
      and interpreted and run by the project itself, to test itself.
    </p>
  </div>
);

export default Created;

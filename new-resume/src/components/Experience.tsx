import styled from "styled-components";

const Container = styled.div`
  h4 {
    margin-bottom: 10px;
  }

  p {
    margin: 0 0 15px;
  }
`;

const Experience = () => {
  return (
    <Container id="experience" className="row section">
      <div className="column heading-column">
        <h3>Experience</h3>
      </div>

      <div className="column content-column">
        <p>
          I have two decades of experience on the frontend, almost a decade of which has been spent building apps in
          React. I consider myself an expert in JavaScript, TypeScript, React, HTML, CSS, and everything that goes into
          engineering robust, reliable frontend applications for the browser. I also have a keen eye for UX and use that
          to keep a watchful eye out for the user and more effectively communicate with designers.
        </p>

        <p>
          I also have experience working on the backend, although my focus throughout my career has been heavily skewed
          toward the frontend.
        </p>

        <h4>Programming Languages</h4>

        <p>
          I have worked professionally in JavaScript, TypeScript, Python, C, C++, Lua, ActionScript 3, Scala, and
          ColdFusion, and I have used Java, Ruby, Common Lisp, Clojure, C#, GDScript, Perl, PHP and more on side
          projects.
        </p>

        <p>
          Most jobs have required me to learn at least one new language and at least one new framework, which I do
          happily and quickly.
        </p>
      </div>
    </Container>
  );
};

export default Experience;

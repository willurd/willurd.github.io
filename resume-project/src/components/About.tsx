import ExternalLink from "./lib/ExternalLink";

const About = () => {
  return (
    <div id="about" className="row section">
      <div className="column content-column">
        <h3 className="greeting">Hey, I'm Will</h3>

        <p>
          I'm a staff software engineer with 20 years of experience delivering impactful products to tens of millions of
          users across <ExternalLink href="https://www.coursera.org" label="Education" /> (160 million learners),{" "}
          <ExternalLink href="https://www.callofduty.com/" label="Games" /> (100 million MAU),{" "}
          <ExternalLink href="https://www.davita.com" label="Healthcare" /> (250,000 patients), and{" "}
          <ExternalLink href="https://www.gosecure.net/" label="Cyber Security" />. I've developed software in many
          languages and technologies (TypeScript, React, HTML/CSS, Python, C/C++, etc.) across the stack at industry
          leaders like Activision and Coursera.
        </p>

        <p>
          At Activision, I use web technologies to build UI for Call of Duty. As an early employee at Coursera, I helped
          build the platform that delivers courses from leading universities and companies to millions of learners
          worldwide. In Cyber Security, I worked across the stack on hypervisor-based intrusion detection—a novel
          approach at the time—to combat Advanced Persistent Threats. And in Healthcare, I built a platform that
          provides renal failure patients with the care and information they need to live healthier lives.
        </p>

        <p>
          I've helped shape high-performing engineering teams by serving on Coursera's hiring committee for more than
          two years, making hiring decisions on over 200 candidates, interviewing over 100 candidates, mentoring dozens
          of interns and engineers, and creating a culture of learning on my teams by organizing book clubs and tech
          talks, pairing sessions, knowledge sharing, and more. I'm passionate about improving the lives of those around
          me, and building products that make a difference.
        </p>

        <p>
          Outside of work, I spend a good amount of time learning new things, coding side projects, and most recently,
          building AI-powered tools.
        </p>
      </div>
    </div>
  );
};

export default About;

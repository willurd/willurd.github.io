import geoffSchullerImg from "../../img/people/geoff-schuller.jfif";
import jamesTyackImg from "../../img/people/james-tyack.jfif";
import kevinBehanImg from "../../img/people/kevin-behan.jfif";
import philCaytingImg from "../../img/people/phil-cayting.jfif";
import rahulKothariImg from "../../img/people/rahul-kothari.jfif";
import rohanBenkarImg from "../../img/people/rohan-benkar.jfif";
import sashiPentaImg from "../../img/people/sashi-penta.jfif";
import stephenWexlerImg from "../../img/people/stephen-wexler.jfif";
import Endorsement from "./Endorsement";
import Endorsements from "./Endorsements";

const CourseraEndorsements = () => (
  <Endorsements>
    <Endorsement
      name="Stephen Wexler"
      title="Senior Engineering Manager"
      company="Coursera"
      message="I had the pleasure of managing Will for 4 years at Coursera. He is a dedicated Frontend software engineer who built numerous high quality, impactful and innovative features. He's engaged and thoughtful on everything he works on, paying careful attention to detail and edge cases. In addition to being a great teammate to his immediate team, he's also helped improve the engineering-wide culture and processes with his work standardizing data fetching and his contributions to our hiring committee."
      profilePicture={stephenWexlerImg}
    />

    <Endorsement
      name="Phil Cayting"
      title="Engineering Manager"
      company="Coursera"
      message="As a tentpole member of Coursera's Hiring Committee, Will was a fearless advocate for preserving the high bar of technical excellence of our incoming engineers. He gave thoughtful and deep evaluations of our candidates, while always maintaining standards of fairness. His commitment to the ideals and principles of the group was unequaled."
      profilePicture={philCaytingImg}
    />

    <Endorsement
      name="Sashi Penta"
      title="Technical Lead"
      company="Coursera"
      message="William is one of the best front-end engineers I have worked with. He is passionate about the user experience and developed many core features at Coursera. As a back-end technical lead, I am fortunate to work with him on various BE and FE interactions, to name a few: Timed Programming Exams, Git integration to Staff Graded Assignments, and Programming Assignment authoring. Their input is crucial, and they came up with front-end tech designs/plans for the features they worked on, which significantly helped the back-end team."
      profilePicture={sashiPentaImg}
    />

    <Endorsement
      name="Geoff Schuller"
      title="Senior Design Manager"
      company="Coursera"
      message="Will and I worked together on the first project I ever did at Coursera. I designed the UI and he implemented it - like a total pro! He did a fantastic job! Will is diligent, considerate, resourceful and professional in every regard. You'd be very fortunate to have an engineer like him on your team!"
      profilePicture={geoffSchullerImg}
    />

    <Endorsement
      name="Kevin Behan"
      title="Product Manager"
      company="Coursera"
      message="I worked with Will for a year and a half and all the way through, Will was diligent, delivered quality software, and was an exceptional collaborator. I think what makes Will special, is how he contributes to Product requirements, he just has this uncanny ability to think in a creative and expansive way. He also has great energy, too. This comes together to make requirements and features significantly more polished and well-rounded. I'm very grateful for the time I had with Will at Coursera. You're the man Will!"
      profilePicture={kevinBehanImg}
    />

    <Endorsement
      name="Rohan Benkar"
      title="Software Architect"
      company="Coursera"
      message="I worked with Will on Coursera's technical assessments team for over 4 years. Will was instrumental in growing Coursera Labs product from its inception to serving Millions of learners. He is very disciplined, methodical and self-directed. He is definitely one of the most collaborative engineers I have worked with. His deep understanding of FE technologies made him our go-to person for complex FE projects. An exceptional developer and a great team player!!"
      profilePicture={rohanBenkarImg}
    />

    <Endorsement
      name="James Tyack"
      title="Engineering Leader"
      company="Coursera"
      message="I worked closely with Will throughout 2021 and 2022 as a senior engineer partner during our engineering hiring process. Will brought engineering rigor and high standards to analysis and discussions so we were able to quickly make decisions and move forward to hire the most capable candidates. I found Will extremely reliable and dependable. He has strong technical communication skills, and always brought value to our meetings."
      profilePicture={jamesTyackImg}
    />

    <Endorsement
      name="Rahul Kothari"
      title="Product Design"
      company="Coursera"
      message="Will is an excellent and empathetic partner to design! Will asks sharp questions to truly understand the user needs, ensures all the use-cases and workflows are thought through. The thing I appreciate most is he fills in the gaps which designers sometimes miss detailing. And this results in an elegant and intuitive UX."
      profilePicture={rahulKothariImg}
    />
  </Endorsements>
);

export default CourseraEndorsements;

// @flow

import React from "react";

type Props = React.PropsWithChildren<{
  href: string;
  label?: React.ReactNode;
}>;

const About: React.FC<Props> = ({ href, label, children }) => {
  return (
    <a target="_blank" rel="noopener noreferrer" href={href}>
      {label || children}
    </a>
  );
};

export default About;

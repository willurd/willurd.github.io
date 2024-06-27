import ExternalLink from "../lib/ExternalLink";

type Props = {
  name: string;
  href?: string;
  logo?: string;
};

const Company: React.FC<Props> = ({ name, href, logo }) => {
  if (!href) {
    return name;
  }

  return <ExternalLink href={href}>{logo ? <img className="logo" alt={name} src={logo} /> : name}</ExternalLink>;
};

export default Company;

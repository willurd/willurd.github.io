import styled from "styled-components";

type Props = React.PropsWithChildren;

const Container = styled.div`
  background: #ddd;
  border-radius: 8px;
  padding: 12px;
  margin-top: 30px;
  font-size: 1em;
`;

const Note: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Note;

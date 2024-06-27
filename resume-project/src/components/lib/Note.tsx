import styled from "styled-components";

type Props = React.PropsWithChildren;

const Container = styled.div`
  background: #eee;
  color: #888;
  border-radius: 8px;
  padding: 12px;
  font-size: 0.9em;
  line-height: 1.4;

  & > * {
    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Note: React.FC<Props> = ({ children }) => {
  return <Container className="Note">{children}</Container>;
};

export default Note;

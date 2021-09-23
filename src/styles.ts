import styled from "styled-components";

interface SheetProps {
  numberOfColumns: number;
}

export const Sheet = styled.div`
  display: grid;
  grid-template-columns: 32px repeat(
      ${(props: SheetProps) => props.numberOfColumns - 1},
      90px
    );
`;

export const Header = styled.div`
  background: #ccc;
  color: #282828;
  padding: 4px;
  text-align: center;
`;

export const Input = styled.input`
  padding: 0 4px;
  :not(:focus) {
    text-align: right;
  }
  :focus {
    border: 1px solid #1581ba;
    background-color: #e7f2f8;
  }
`;

export const AppContainer = styled.div`
  border: 2px solid;
  width: 50vw;
  height: 50vh;
  max-height: calc(100vh - 30px);
  max-width: calc(100vw - 30px);
  resize: both;
  overflow: auto;
`
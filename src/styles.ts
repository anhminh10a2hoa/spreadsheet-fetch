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

export const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
`;


export const Button = styled.button`
  box-shadow:inset 0px 1px 0px 0px #a4e271;
	background:linear-gradient(to bottom, #74ad5a 5%, #2c6111 100%);
	background-color:#89c403;
	border-radius:6px;
	border:1px solid #74b807;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-size:13px;
	font-weight:600;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #528009;
  margin: 10px;
`;

export const Title = styled.h1`
  padding: 30px;
  text-align: center;
  background: #2c6111;
  color: white;
  font-size: 30px;
`;

export const Wrapper = styled.div`
   &:hover ${Button} {
  background:linear-gradient(to bottom, #2c6111 5%, #74ad5a 100%);
	background-color:#2c6111;
  }
`;


export const InputWrapper = styled.div`
  margin-left: 60px;
  margin-top:20px;
`;

export const NumberInput = styled.input`
  margin-left: 5px;
  padding:5px;
  border-radius: 30px;
  margin-bottom: 10px;
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
  max-height: calc(90vh);
  max-width: calc(90vw);
  resize: both;
  margin: auto;
  overflow: auto;
`
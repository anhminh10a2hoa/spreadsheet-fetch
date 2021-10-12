import styled from "styled-components";
import { AiOutlineSave, AiFillFolderOpen, AiOutlineReload, AiFillPlayCircle, AiFillBulb } from "react-icons/ai";

interface SheetProps {
  numberOfColumns: number;
}

export const Sheet = styled.div`
  overflow: auto;
  display: grid;
  grid-template-columns: 32px repeat(
      ${(props: SheetProps) => props.numberOfColumns - 1},
      90px
    );
`;

export const Label = styled.label`
  font-size: 1rem;
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
	font-size:15px;
	font-weight:600;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #528009;
  margin: 10px;

  &:hover {
  background:linear-gradient(to bottom, #2c6111 5%, #74ad5a 100%);
	background-color:#2c6111;
  }
`;

export const Navbar = styled.div`
  padding: 30px;
  text-align: center;
  background: #1d7545;
  color: white;
  font-size: 30px;
`;

export const Title = styled.p`
  font-size: 20px;
`

export const IconContainer = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
`

export const SaveIcon = styled(AiOutlineSave)`
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
`

export const OpenIcon = styled(AiFillFolderOpen)`
  font-size: 1.5rem;
  cursor: pointer;
`

export const ResetIcon = styled(AiOutlineReload)`
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  margin-left: 2rem;
`

export const ChangeIcon = styled(AiFillPlayCircle)`
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: -7px;
`

export const SimpleIcon = styled(AiFillBulb)`
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
`

export const OpenIconContainer = styled.div`
  position: absolute;
  cursor: pointer;
  top: 5px;
  left: 2.5rem;
`

export const InputHidden = styled.input`
  display: none;
`

export const SetupContainer = styled.div`
  position: absolute;
  top: 2.5rem;
  left: 10px;
`

export const InputWrapper = styled.div`
  margin-left: 60px;
  margin-top:20px;
`;

export const NumberInput = styled.input`
  margin: 10px;
  width: 50px;
`;

export const Header = styled.div`
  background: #ccc;
  color: #282828;
  padding: 4px;
  text-align: center;
`;

export const Input = styled.input`
   resize: both;
  overflow: auto;
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
  max-width: 100vw;
  overflow: auto;
  height: calc(100vh - 80px);
`
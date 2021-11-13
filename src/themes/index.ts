import styled from "styled-components";
import { AiOutlineSave, AiFillFolderOpen, AiOutlineReload, AiFillPlayCircle, AiFillBulb, AiFillEdit, AiOutlineHolder, AiOutlineInsertRowAbove, AiOutlineInsertRowLeft, AiFillGithub, AiOutlineCode } from "react-icons/ai";
import { Link } from "react-router-dom";
interface SheetProps {
  numberOfColumns: number;
}

export const Sheet = styled.div`s
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
  padding: 35px;
  text-align: center;
  background: #ed5ced;
  color: white;
  font-size: 30px;

`;

export const Title = styled.p`
  font-size: 20px;
  padding: 0;
`

export const IconContainer = styled.div`
  position: absolute;
  top: 2px;
  left: 5px;
`

export const SaveIcon = styled(AiOutlineSave)`
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 5px;
`

export const OpenIcon = styled(AiFillFolderOpen)`
  font-size: 1.6rem;
  cursor: pointer;
  margin-bottom: -5px;
`

export const ResetIcon = styled(AiOutlineReload)`
  font-size: 1.5rem;
  cursor: pointer;
`

export const ChangeIcon = styled(AiFillPlayCircle)`
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: -4px;
`

export const SimpleIcon = styled(AiFillBulb)`
  font-size: 1.5rem;
  cursor: pointer;
`

export const ActionIcon = styled(AiOutlineCode)`
  font-size: 1.5rem;
  cursor: pointer;
`

export const EditFileName = styled(AiFillEdit)`
  font-size: 1.5rem;
  cursor: pointer;
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
  margin-top: 20px;
`;

export const NumberInput = styled.input`
  margin: 7px;
  width: 80px;
  border: 1px solid #4B89D1;
  :focus {
    border: 1px solid #4B89D1;
    outline: none;
    background-color: #e7f2f8;
  }
`;

export const Header = styled.div`
  background: #ccc;
  color: #282828;
  padding: 4px;
  text-align: center;
  background-color: #F4F5F8;
  border: none;
  border-bottom: .1px solid #d4d4d4;
  border-right: .1px solid #d4d4d4;
`;

export const Input = styled.input`
  resize: both;
  overflow: auto;
  padding: 0 4px;
  border: none;
  border-bottom: .1px solid #d4d4d4;
  border-right: .1px solid #d4d4d4;
  :not(:focus) {
    text-align: right;
  }
  :focus {
    border: 2px solid #4b89d1;
    outline: none;
    background-color: #e7f2f8;
  }
`;

export const AppContainer = styled.div`
  max-width: 100vw;
  overflow: auto;
  height: calc(100vh - 181px);
`

export const InputExtensionContainer = styled.div`
  padding: 10px;
  background-color: #e6e6e6;
`

export const TextInput = styled.input`
  width: calc(100vw - 200px);
  border: .1px solid #7a7a7a;
  :focus {
    border: 1px solid #4B89D1;
    outline: none;
    background-color: #e7f2f8;
  }
`

export const IndexInput = styled.input`
  width: 50px;
  margin-right: 10px;
  border: .1px solid #7a7a7a;
  :focus {
    border: 1px solid #4B89D1;
    outline: none;
    background-color: #e7f2f8;
  }
`

export const BottomNavBar = styled.div`
  background-color: #333;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  &.active{
    background-color: #ddd;
    color: black;
  }
`

export const SheetLink = styled(Link)`
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  :hover {
    background-color: #ddd;
    color: black;
  }
  :active {
    background-color: #ddd;
    color: black;
  }
}

`

export const BarrierIcon = styled(AiOutlineHolder)`
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: -7px;
  margin-right: 10px;
`

export const RowIcon = styled(AiOutlineInsertRowLeft)`
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: -4px;
`

export const ColumnIcon = styled(AiOutlineInsertRowAbove)`
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: -4px;
`

export const GithubIcon = styled(AiFillGithub)`
  font-size: 1.5rem;
  cursor: pointer;
`


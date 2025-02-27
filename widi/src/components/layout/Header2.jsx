import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import SearchContext from "../context/SearchContext";
import { SearchRounded } from "@mui/icons-material";
import LoginButton from "../login/LoginButton";

const Header2Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  height: 60px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.1);
`;
const ImgHeader2 = styled.img`
  width: 50px;
`;

const InputBoxContainer = styled.div`
background-color: white;
    border-radius: 25px;
    box-shadow: 0px 3px 20px rgba(0,0,0,0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 5px 15px;
    width: 150px;
`

const InputSearch = styled.input`
 width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background: transparent;
    color: black;
    padding-left: 8px;
    font-size: 15px;
`
const AuthDiv = styled.div`
    display: flex;
`

export default function Header2() {
  const { search, setSearch } = useContext(SearchContext);

  return (
    <Header2Div className="header">
      <NavLink to="/">
        <ImgHeader2 src="/images/widiLogoRedondo.png" alt="widilogo" />
      </NavLink>
      <InputBoxContainer>
        <SearchRounded/>
        <InputSearch
          type="text"
          placeholder="Buscar"
          className="inputSearch"
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(search);
          }}
        />
      </InputBoxContainer>

    <AuthDiv>
        <LoginButton/>
    </AuthDiv>
      
    </Header2Div>
  );
}

import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import SearchContext from "../context/SearchContext";

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
export default function Header2() {
  const { search, setSearch } = useContext(SearchContext);

  return (
    <Header2Div className="header">
      <NavLink to="/">
        <ImgHeader2 src="/images/widiLogoRedondo.png" alt="widilogo" />
      </NavLink>
      <div className="inputBox">
        <input
          type="text"
          placeholder="Buscar"
          className="inputSearch"
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(search);
          }}
        />
      </div>
    </Header2Div>
  );
}

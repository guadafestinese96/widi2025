import styled from 'styled-components'

const Header2Div = styled.div`
background-color:black;
height: 50px;
width:100%
`
const ImgHeader2 = styled.img`
width:50px;
`
export default function Header2(){
    return(
        <Header2Div className="header">
            dfsdfdslfdslf
            <ImgHeader2 src='/images/widiLogoRedondo.png' alt='widilogo'/>
        </Header2Div>
    )
}
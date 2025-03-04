import './PerfumesDestacados.css'
import styled from 'styled-components'

const PerfumeDestacadoContainer = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    width: 100px;
    border: 1px solid var(--colorPrimario);
    background-color: rgba(0, 0, 0, 0.2);
`
const PerfumeDestacadoImg = styled.img`
 width: 100px;
    height: 80px;
    filter: drop-shadow(5px 5px 20px white);
`

const PerfumeDestacadoH3 = styled.h3`
 font-size: 12px;
    margin-top: 10px;
    color: var(--colorPrimario);
    text-transform: uppercase;
`
const PerfumeDestacadoH4 = styled.h4`
 font-size: 10px;
`



export default function PerfumeDestacadoCard({perfume}){
    return(
        <PerfumeDestacadoContainer>
            <PerfumeDestacadoImg src={`/images/${perfume.img}`} alt="imgCardDestacado" />
            <PerfumeDestacadoH3>{perfume.marca}</PerfumeDestacadoH3>
            <PerfumeDestacadoH4>{perfume.nombre}</PerfumeDestacadoH4>
        </PerfumeDestacadoContainer>
    )
}
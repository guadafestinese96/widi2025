import perfumes from "../perfumes.js";
import PerfumeDestacadoCard from './PerfumeDestacadoCard.jsx';
import styled from 'styled-components';

const DestacadosContainer = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
`
const DestacadosH1 = styled.h1`
 font-size: 20px;
    text-align: center;
    color: var(--colorPrimario);
`

const PerfumesDestacadosContainer = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
`

export default function PerfumesDestacados(){
    const perfumesDestacados = perfumes.filter(perfume => perfume.marca.toLowerCase().includes("tom") || perfume.marca.toLowerCase().includes("creed") || perfume.marca.toLowerCase().includes("xerj") )

    console.log(perfumesDestacados)
    return(
        <DestacadosContainer>
            <DestacadosH1>Perfumes Destacados</DestacadosH1>
            <PerfumesDestacadosContainer>
                {perfumesDestacados.map(perfume=>(
                <PerfumeDestacadoCard perfume={perfume} key={perfume.id}/>
            ))}
            </PerfumesDestacadosContainer>
            
        </DestacadosContainer>
    )
}
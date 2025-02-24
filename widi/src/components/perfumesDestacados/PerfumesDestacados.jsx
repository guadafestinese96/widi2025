import './PerfumesDestacados.css'
import perfumes from "../perfumes.js";
import PerfumeDestacadoCard from './PerfumeDestacadoCard.jsx';


export default function PerfumesDestacados(){
    const perfumesDestacados = perfumes.filter(perfume => perfume.marca.toLowerCase().includes("tom") || perfume.marca.toLowerCase().includes("creed") || perfume.marca.toLowerCase().includes("xerj") )

    console.log(perfumesDestacados)
    return(
        <div className="destacadosContainer">
            <h1>Perfumes Destacados</h1>
            <div className="perfumesDestacadosContainer">
                {perfumesDestacados.map(perfume=>(
                <PerfumeDestacadoCard perfume={perfume} key={perfume.id}/>
            ))}
            </div>
            
        </div>
    )
}
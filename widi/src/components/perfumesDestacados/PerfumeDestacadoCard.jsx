import './PerfumesDestacados.css'

export default function PerfumeDestacadoCard({perfume}){
    return(
        <div className="perfumeDestacadoContainer">
            <img src={`/images/${perfume.img}`} alt="imgCardDestacado" />
            <h3>{perfume.marca}</h3>
            <h4>{perfume.nombre}</h4>
        </div>
    )
}
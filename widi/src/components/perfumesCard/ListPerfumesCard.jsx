import PerfumesCard from "./PerfumesCard"
import './PerfumesCard.css'

export default function ListPerfumesCard({perfumes}){
    return(
      <div className="listContainerCard">
        {perfumes.map((perfume)=>(
            <PerfumesCard perfume={perfume} key={perfume.id}/>
        ))}
      </div>
    )
}
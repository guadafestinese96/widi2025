import PerfumesCard from "./PerfumesCard";
import styled from "styled-components";

const ListContainerCard = styled.div`
display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export default function ListPerfumesCard({ perfumes }) {
  const perfumesOrdenados = [...perfumes].sort((a,b)=> a.marca.localeCompare(b.marca))
  console.log(perfumesOrdenados)

  return (
    <ListContainerCard>
      {perfumesOrdenados.map((perfume) => (
        <PerfumesCard perfume={perfume} key={perfume.id} />
      ))}
    </ListContainerCard>
  );
}

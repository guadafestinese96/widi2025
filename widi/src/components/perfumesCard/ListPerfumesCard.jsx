import PerfumesCard from "./PerfumesCard";
import "./PerfumesCard.css";
import { useState } from "react";
import styled from "styled-components";

const ListContainerCard = styled.div`
display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export default function ListPerfumesCard({ perfumes }) {
  return (
    <ListContainerCard>
      {perfumes.map((perfume) => (
        <PerfumesCard perfume={perfume} key={perfume.id} />
      ))}
    </ListContainerCard>
  );
}

import PerfumesCard from "./PerfumesCard";
import "./PerfumesCard.css";
import { useState } from "react";

export default function ListPerfumesCard({ perfumes }) {
  return (
    <div className="listContainerCard">
      {perfumes.map((perfume) => (
        <PerfumesCard perfume={perfume} key={perfume.id} />
      ))}
    </div>
  );
}

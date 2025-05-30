'use client'
import Board from "@/components/Board";
import ColumnModal from "@/components/ColumnModal";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Home() {
  const [columnModal, setColumnModal] = useState(false)
  return (
    <main>
      <Navbar />
      <Board />
      <ColumnModal open={columnModal} onClose={() => setColumnModal(false)} />
    </main>
  );
}

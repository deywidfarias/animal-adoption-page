import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Card } from './components/card/card';
import { AnimalData } from './interfaces/AnimalData';
import { useAnimalData } from './hooks/useAnimalData';
import { CreateModal } from './components/create-modal/create-modal';

function App() {
  const {data} = useAnimalData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }
  return (
    <div className='container'>
      <h1>Animais para Adoção</h1>
      <div className='card-grid'>
        {data?.map(AnimalData => 
          <Card 
            id={AnimalData.id}
            nome={AnimalData.nome}
            descricao={AnimalData.descricao}
            imagemUrl={AnimalData.imagemUrl}
            dataNascimento={AnimalData.dataNascimento}
            idade={AnimalData.idade}
            status={AnimalData.status}
            categoria={AnimalData.categoria}
          />
        )}
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
      <button onClick={handleOpenModal}>novo</button>
    </div>
  )
}

export default App

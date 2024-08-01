import { useState } from "react"
import { useAnimalDataMutate } from "../../hooks/useAnimalDataMutate";
import { AnimalData } from "../../interfaces/AnimalData";
import "./card.css"
import { patchAnimalDataMutate } from "../../hooks/patchAnimalDataMutate";

interface CardProps{
    id?: number,
    nome: string,
    descricao: string,
    imagemUrl: string,
    dataNascimento: string,
    categoria: string,
    status: string,
    idade?: number
}

export function Card({id,imagemUrl, nome, descricao, dataNascimento, status, categoria, idade} : CardProps){
    
    const{mutate} = patchAnimalDataMutate();

    function setCheckbox() {
        if (status === "ADOTADO") {
            return true
        }
        return false
    }

    const handleCheckBox = () => {
        
        if (status === "ADOTADO") {
            status = "DISPONIVEL";
            setCheckbox();
        }else{
            status = "ADOTADO";
            setCheckbox();
        }

        const AnimalData: AnimalData = {
            id,
            nome,
            descricao,
            imagemUrl,
            dataNascimento,
            status,
            categoria,
            idade
        }

        mutate(AnimalData);
    }
    
    return(
        <div className="card">
            <img src={imagemUrl} alt="" />
            <div className="card-info">
                <h2>{nome}</h2>
                <p><b>Descrição: </b>{descricao}</p>
                <p><b>Nascimento: </b>{dataNascimento}</p>
                <p><b>Idade: </b>{idade}</p>
                <p><b>Categoria: </b>{categoria}</p>
                <p><b>Status: </b>{status}</p>
            </div>
            <div className="card-info">
                <input 
                    type="checkbox" 
                    name="opcao" 
                    checked={setCheckbox()}
                    onChange={handleCheckBox} />
            </div>
            
        </div>
    )
}
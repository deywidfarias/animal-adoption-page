import { useEffect, useState } from "react"
import { useAnimalDataMutate } from "../../hooks/useAnimalDataMutate";
import { AnimalData } from "../../interfaces/AnimalData";
import "./modal.css"

interface InputProps{
    label:string,
    value: string | number,
    updateValue(value: any): void
}
interface ModalProps{
    closeModal():void
}

const Input = ({label, value, updateValue}: InputProps) => {

    if(label==="data de nascimento"){
        return(
            <>
                <label>{label}</label>
                <input type="date" pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" value={value} onChange={event => updateValue(event.target.value)}></input>
            </>
        )
    }

    return(
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}
export function CreateModal({closeModal}: ModalProps){
    const[nome, setNome] = useState("");
    const[descricao, setDescricao] = useState("");
    const[imagemUrl, setImagemUrl] = useState("");
    const[dataNascimento, setdataNascimento] = useState("");
    const[status, setStatus] = useState("");
    const[categoria, setCategoria] = useState("");
    const{mutate, isSuccess, isPending} = useAnimalDataMutate();

    const submit = () => {
        const AnimalData: AnimalData = {
            nome,
            descricao,
            imagemUrl,
            dataNascimento,
            status,
            categoria
        }

        mutate(AnimalData);
    }

    useEffect(() => {
        //if(!isSuccess)return
        closeModal();
    }, [isSuccess])

    const options = [
        "DISPONIVEL",
        "ADOTADO"
    ];

    const onOptionChangeHandler = (event) => {
        setStatus(event.target.value);
    };

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastrar Animal</h2>
                <form className="input-container">
                    <Input label="nome" value={nome} updateValue={setNome}/>
                    <Input label="descrição" value={descricao} updateValue={setDescricao}/>
                    <Input label="imagem" value={imagemUrl} updateValue={setImagemUrl}/>
                    <Input label="data de nascimento" value={dataNascimento} updateValue={setdataNascimento}/>
                    <Input label="categoria" value={categoria} updateValue={setCategoria}/>

                    <label>Status</label>
                    <select onChange={onOptionChangeHandler}>
                        <option>-- Escolha uma opcao --</option>
                        {options.map((option, index) => {
                            return (
                                <option key={index}>
                                    {option}
                                </option>
                            );
                        })}
                    </select>
                    </form>
                <button onClick={submit} className="btn-secondary">
                    {isPending ? 'Posting...' : 'Post'}
                </button>
                <button onClick={closeModal} id="btn-close">X</button>
            </div>
        </div>
    )
}
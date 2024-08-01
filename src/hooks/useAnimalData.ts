import axios, { AxiosPromise } from "axios"
import { AnimalData } from "../interfaces/AnimalData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const fetchData = async(): AxiosPromise<AnimalData[]>=> {
    const response = axios.get(API_URL + '/animals');
    return response;
}

export function useAnimalData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['animal-data'],
        retry: 2
    })

    return{
        ...query,
        data: query.data?.data
    }
}
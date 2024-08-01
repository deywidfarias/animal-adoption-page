import axios, { AxiosPromise } from "axios"
import { AnimalData } from "../interfaces/AnimalData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const postData = async(data: AnimalData): AxiosPromise<any>=> {
    const response = axios.post(API_URL + '/animals', data);
    return response;
}

export function useAnimalDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['animal-data']})
        }
    })

    return mutate;
}
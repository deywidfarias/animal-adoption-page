import axios, { AxiosPromise } from "axios"
import { AnimalData } from "../interfaces/AnimalData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const patchData = async(data: AnimalData): AxiosPromise<any>=> {
    const id = data.id;
    const response = axios.patch(API_URL + '/animals/' + id, data);
    return response;
}

export function patchAnimalDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: patchData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['animal-data']})
        }
    })

    return mutate;
}
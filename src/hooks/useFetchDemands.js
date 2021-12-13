
import { useQuery, useQueryClient } from "react-query";
// import { useNavigate } from 'react-router-dom'

import { api } from "../api/api";

export const useFetchDemands = (obj) => {
    // const navigate = useNavigate()
    const client = useQueryClient()
    const query = useQuery(
        ['demands', obj],
        async () => {
            const demands = await api.fetchDemands(obj)

            return demands.List
        },
        )

    return query
}
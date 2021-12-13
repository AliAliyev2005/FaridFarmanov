
import { useQuery } from "react-query";
// import { useNavigate } from 'react-router-dom'

import { api } from "../api/api";

// export const useFetchDocuments = (obj) => {
//     // const navigate = useNavigate()
//     const client = useQueryClient()
//     const query = useQuery(
//         ['documents', obj],
//         async () => {
//             const documents = await api.fetchDocuments(obj)

//             return documents.List
//         },
//         )

//     return query
// }
export const useFetchDocuments = () => {
    const query = useQuery('documents', api.fetchDocuments({}))
    return query
}
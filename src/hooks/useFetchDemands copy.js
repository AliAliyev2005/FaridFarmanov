
import { useQuery } from "react-query";

import { api } from "../api/api";

export const useFetchDashboards = () => {
    const query = useQuery('demands', api.fetchDashboards)
    return query
}
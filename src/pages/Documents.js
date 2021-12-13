import React from 'react'
import withLoading from '../HOC/withLoading'
import { useFetchDocuments } from '../hooks/useFetchDocuments'
import { useFetchDemands } from '../hooks/useFetchDemands'

function Documents(props) {
    // const fetchDocuments = useFetchDocuments()
    // console.log(fetchDocuments)


    return (
        <div>
           Documents 
        </div>
    )
}

export default withLoading(Documents,'documents')

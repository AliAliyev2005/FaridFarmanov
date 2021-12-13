import React, {useEffect, useState} from 'react'
import { Navigate } from 'react-router';
import MyLoading from '../components/UI/loading/MyLoading';
import { useGlobalContext } from '../config/context';
import sendRequest from '../config/sentRequest';

function withLoading(Component, url) {

    return (props) => {

        const { logout } = useGlobalContext()

        const [isLoading, setIsLoading] = useState(false)
        const [data, setData] = useState(null)
      
        useEffect(() => {
          setIsLoading(true)
          async function fetchData() {
            const res = await sendRequest(`${url}/get.php`,{})
            if(res === null) { logout() }
            else { setData(res) }
            setIsLoading(false)
          }
          fetchData();
        }, []); 
      
        if(isLoading) {
          return <div>
            <h1>Loading...</h1>
            <MyLoading />
          </div>
        }
        if(data && data.props) {
          return <Navigate to='login'/>
        }
        return <Component {...props} data={data} />
    }
}

export default withLoading

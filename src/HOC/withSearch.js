import React, { useEffect, useRef, useState } from 'react'
import MyInput from '../components/UI/input/MyInput';
import MyLoading from '../components/UI/loading/MyLoading';
import sendRequest from '../confiq/sentRequest';
import { FaSearch } from 'react-icons/fa';

function withSearch(Component, url, objSR, dr=0) {

    return (props) => {

        const [searchTerm, setSearchTerm] = useState("");
        const [ isLoading, setIsLoading ] = useState(false)
        const [ items, setItems ] = useState(null)
    
        let obj = {
            lm: 100,
            pg: 0,
            nm: searchTerm,
            gp: '', 
            sr: objSR,
            dr: 0
        }

        const fetchSearchItem = async () => {
            setIsLoading(true)
            let res = await sendRequest(url ,obj)
            setItems(res.List)
            setIsLoading(false)
        }

        useEffect(() => {
            fetchSearchItem()
        },[])

        const handleChange = e => {
            setSearchTerm(e.target.value);
        };

        const search = () => {
            fetchSearchItem()
        }

        if(isLoading) {
            return <MyLoading />
        }

        return (
            <div>


                <div style={{display:'flex'}}>
                    <input className='form-control form-control-lg' style={style} value={searchTerm} onChange={handleChange}  type='text' />
                    <button style={{btnStyle}} onClick={search} className="search-button"><FaSearch style={{fontSize:'20px'}} /></button>
                </div>


                <Component {...props} items={items} />
                
            </div>
        )
    }
}

export default withSearch

let style = {
    fontSize: '20px',
    width: "100%",
    borderStyle: "solid",
    borderColor: "teal",
    borderRadius: "0.3rem 0 0 0.3rem"
}
let btnStyle = {
    width: "40px",
    borderWidth: "1px 1px 1px 0",
    borderRadius: "0 0.3rem 0.3rem 0"
}

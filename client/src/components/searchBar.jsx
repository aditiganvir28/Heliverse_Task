import React, { useContext,} from 'react'
import { LoginContext } from './context'
import Axios from 'axios'

const SearchBar = () => {

    const { setUsers, domain, gender, available, limit, setPageCount, currentPage } = useContext(LoginContext)


    const handleSearch = (e) => {

        currentPage.current=1;

        Axios.post(`http://localhost:5000/api/filter?page=${currentPage.current}&limit=${limit}r`, {
            names: e.target.value,
            domain: domain,
            gender: gender,
            available: available
        }
        ).then(res => {
            setUsers(res.data.result);
            setPageCount(res.data.pageCount)
        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <form className='w-full flex justify-end'>
            <div className='w-72 md:w-[100%] lg:w-[60%]'>
                <input type='search' placeholder='Enter name' className='w-full px-4 py-2 rounded-full border-slate-800 border-2' onChange={(e) => handleSearch(e)} />
            </div>

        </form>
    )
}
export default SearchBar
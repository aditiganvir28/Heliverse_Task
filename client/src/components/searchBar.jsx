import React, { useContext, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { words } from '../data'
import { LoginContext } from './context'
import Axios from 'axios'

const SearchBar = () => {

    const { activeSearch, setActiveSearch, users, setUsers, domain, setDomain, gender, setGender, available, setAvailable } = useContext(LoginContext)


    const handleSearch = (e) => {
        if (e.target.value === '') {
            setActiveSearch([]);
            return false;
        }

        console.log(e.target.value)

        Axios.post("http://localhost:5000/api/filter", {
            names: e.target.value,
            domain: domain,
            gender: gender,
            available: available
        }
        ).then(res => {
            setUsers(res.data.users);
            console.log(res.data.users)
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
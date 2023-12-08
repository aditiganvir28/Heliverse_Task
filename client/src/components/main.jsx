import React, { useContext, } from 'react'
import SearchBar from './searchBar'
import Filters from './filters.jsx'
import UserCards from './userCards'
import Axios from 'axios'
import { LoginContext } from './context'
import { useNavigate } from "react-router-dom";



const MainPage = () => {

    const navigate = useNavigate();

    const { team, teamsCreated, setTeamsCreated, setAllTeams } = useContext(LoginContext)

    const createTeam = () => {
        Axios.post(process.env.REACT_APP_API_URL + "/api/team", {
            team: team
        }).then(res => {
            setTeamsCreated(res.data.user)
            setAllTeams([...teamsCreated, res.data.user])
            navigate('/createTeam')
        })
    }

    

    return (
        <div className='w-[100%]'>
            <div className='md:grid md:grid-cols-7 my-4 md:my-8 mx-4 lg:grid-cols-8'>
                <div className='col-span-2'>
                    <p className='font-bold text-3xl text-slate-800 mt-8 mb-2 md:my-0 md:mx-8'>Heliverse</p>
                </div>
                <div className='flex justify-end md:col-span-3 lg:col-span-4  mt-4 md:mt-0'>
                    <SearchBar />
                </div>
                {
                    team.length > 0 ?
                        <div className='flex justify-end my-4 md:my-0 md:col-span-2'>
                            <button onClick={createTeam} className='text-[100%] font-bold px-4 py-1 md:py-0 rounded-full bg-slate-400 hover:py-2 hover:bg-slate-500'>Create Team</button>
                        </div> : <></>
                }


            </div>
            <div className='grid grid-cols-5 md:grid-cols-7 lg:grid-cols-5'>
                <div className='col-span-2 md:col-span-2 lg:col-span-1'>
                    <Filters />
                </div>
                <div className='col-span-3 md:col-span-5 lg:col-span-4'>
                    <UserCards />
                </div>

            </div>
        </div>
    )
}

export default MainPage
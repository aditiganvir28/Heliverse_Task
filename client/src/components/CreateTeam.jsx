import Axios from 'axios'
import React, { useContext } from 'react'
import { LoginContext } from './context'
import TeamCard from './TeamCard'
import { useNavigate } from 'react-router-dom'

const CreateTeam = () => {

    const { allTeams, setAllTeams, teamsCreated } = useContext(LoginContext)

    const navigate = useNavigate();

    const createTeam = () => {
        setAllTeams([...allTeams, teamsCreated])
        navigate('/teams')
    }

    return (
        <div className='m-2'>
            <h1 className='my-8 mx-6 font-semibold text-xl'>Team Members :</h1>
            <div className='m-2 md:grid md:grid-cols-2 lg:grid-cols-4'>
                {
                    teamsCreated.map((item) => (
                        <TeamCard data={{ id: item.id, first_name: item.first_name, last_name: item.last_name, avatar: item.avatar, email: item.email, domain: item.domain, gender: item.gender, available: item.available }} />
                    ))
                }
            </div>
            <div className='flex justify-end mx-4 my-2'>
            <button onClick={createTeam} className='bg-slate-400 rounded-full px-2 py-1 hover:bg-slate-600'>Create Team</button>
            </div>
        </div>
    )
}

export default CreateTeam
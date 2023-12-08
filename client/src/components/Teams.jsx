import React, { useContext, useEffect } from 'react'
import { LoginContext } from './context'
import TeamCard from './TeamCard'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Teams = () => {
    const navigate = useNavigate()
    const {allTeams, setAllTeams, setTeamsCreated} = useContext(LoginContext)

    useEffect(()=>{
        Axios.get(process.env.REACT_APP_API_URL + "/api/getAllTeams").then(res=>{
            setAllTeams(res.data)
        })
    },[])

    const getTeam = (team_id) => {
        Axios.get(process.env.REACT_APP_API_URL + `/api/team/${team_id}`).then(res=>{
            setTeamsCreated(res.data.users.users)
            navigate(`/team/${team_id}`)
        })  
    }

  return (
    <div className='m-4'>
        <h1 className='font-bold mx-12 text-2xl my-12'>Teams:</h1>
        

        { allTeams!=undefined &&
            allTeams.map((index)=>(
                <div className='mb-8'>
                    <button className='ml-12 text-xl font-medium' onClick={() => getTeam(index.team_no)}>Team Number: {index.team_no}</button>
                    <div className='m-2 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4'>
                {index.users != undefined &&
                index.users.map((item)=>(
                    <TeamCard data={{id:item.id, first_name: item.first_name, last_name: item.last_name, avatar: item.avatar, email: item.email, domain: item.domain, gender: item.gender, available: item.available}}/>
                ))
                }
                </div>
                </div>
            ))
        }
    
    </div>
  )
}

export default Teams
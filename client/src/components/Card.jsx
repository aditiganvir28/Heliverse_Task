import React, { useContext, useEffect } from 'react'
import { LoginContext } from './context'

const Card = (props) => {
    const { team, setTeam } = useContext(LoginContext)
    const { id, first_name, last_name, avatar, email, domain, gender, available } = props.data

    const selectTeams = (e) => {
        if (e.target.checked === true) {
            setTeam([...team, e.target.value])
        } else {
            setTeam(team.filter((index) => index !== e.target.value))
        }
    }

    return (
        <div className='my-8 border-2 rounded-2xl px-2 w-full'>
            <div className=' my-6 flex justify-center w-full'>
                <img src={avatar} alt="profile photo">

                </img>
            </div>
            <div className='name overflow-hidden w-full'>
                <h1 className='text-[107%] font-semibold'>Name :</h1>
                <p className='mx-2'>
                    {first_name + " " + last_name}
                </p>

            </div>
            <div className='overflow-hidden w-full'>
                <h1 className='text-[107%] font-semibold'>Email :</h1>
                <p className='mx-2'>{email}</p>

            </div>
            <div className='overflow-hidden w-full'>
                <h1 className='text-[107%] font-semibold'>Domian :</h1>
                <p className='mx-2'>{domain}</p>
            </div>
            <div>
                <h1 className='text-[107%] font-semibold'>Gender :</h1>
                <p className='mx-2'>{gender}</p>
            </div>
            <div>
                <h1 className='text-[107%] font-semibold'>Availablity :</h1>
                <p className='mx-2'>{available}</p>
            </div>
            <div className='flex justify-end mb-2 mx-2'>
            <input type='checkbox' value={id} onChange={selectTeams}/>
            </div>
        </div>
    )
}

export default Card
import React from 'react'

const TeamCard = (props) => {
    const {id, first_name, last_name, avatar, email, domain, gender, available} = props.data
  return (
    <div className='mx-4 px-6 my-8 border-2 rounded-2xl'>
            <div className=' my-6 flex justify-center w-full'>
                <img src={avatar} alt="profile photo">

                </img>
            </div>
            <div className='name object-contain'>
                <h1 className='text-[107%] font-semibold'>Name :</h1>
                <p className='mx-2'>
                    {first_name + " " + last_name}
                </p>

            </div>
            <div className='overflow-hidden w-full'>
                <h1 className='text-[107%] font-semibold'>Email :</h1>
                <p className='mx-2'>{email}</p>

            </div>
            <div className='object-contain'>
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
        </div>
  )
}

export default TeamCard
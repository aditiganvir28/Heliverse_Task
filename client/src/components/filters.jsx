import { React, useState, useContext, useEffect } from 'react'
import  Axios  from 'axios'
import { LoginContext } from './context';
import filterData from './filters.json'


const Filters = () => {

  const { users, setUsers, domain, setDomain, gender, setGender, available, setAvailable, activeSearch, setActiveSearch } = useContext(LoginContext)

  const setfilter = () => {
    Axios.post("http://localhost:5000/api/filter", {
            names: activeSearch,
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

  useEffect(()=>{
    setfilter();
  },[domain, gender, available])

  const handleDomain = async (e) => {
    if (e.target.checked === true) {
      setDomain([...domain, (e.target.value)])
    } else {
      setDomain(domain.filter((index) => index !== e.target.value))
    }

    setfilter();
  }

  const handleGender = (e) => {
    if (e.target.checked === true) {
      setGender([...gender, (e.target.value)])
    } else {
      setGender(gender.filter((index) => index !== e.target.value))
    }
    setfilter();
  }

  const handleAvailable = (e) => {
    if (e.target.checked === true) {
      setAvailable([...available, (e.target.value)])
    } else {
      setAvailable(available.filter((index) => index !== e.target.value))
    }

    setfilter();
  }

  return (
    <div className='ml-4 lg:ml-12'>
    <h2 className='font-bold text-xl my-2'>Filters</h2>
    <div className='ml-2'>
      <div className='font-bold text-l block mb-2'>Domain</div>
      <div className='ml-2'>
        {filterData.domains.map((domain, index) => (
          <div key={index}>
            {console.log(domain)}
            <input type='checkbox' value={domain} onChange={handleDomain} />
            <label>{domain}</label><br></br>
          </div>
        ))}
      </div>
      <div className='font-bold text-l block my-2'>Gender</div>
      <div className='ml-2'>
        {filterData.genders.map((domain, index) => (
          <div key={index}>
            {console.log(domain)}
            <input type='checkbox' value={domain} onChange={handleGender} />
            <label>{domain}</label><br></br>
          </div>
        ))}
      </div>
      <div className='font-bold text-l block my-2'>Availability</div>
      <div className='ml-2'>
        {filterData.availability.map((domain, index) => (
          <div key={index}>
            {console.log(domain)}
            <input type='checkbox' value={domain} onChange={handleAvailable} />
            <label>{domain}</label><br></br>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Filters
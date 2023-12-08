import { React, useContext, useEffect } from 'react'
import { LoginContext } from './context'
import Axios from 'axios'
import Card from './Card';

const UserCards = () => {
  const { users, setUsers } = useContext(LoginContext);



  useEffect(() => {
    Axios.get('http://localhost:5000/api/users').then(res => {
      setUsers(res.data);
    }).catch(err => {
      console.log(err);
    })
  },[])
  return (
    <div className=''>
      <div className='md:grid md:grid-cols-2 md:gap-10 lg:grid-cols-4 mx-3'>
        {
          users.map((item, index) => (
            <Card data = {{id:item.id, first_name: item.first_name, last_name: item.last_name, avatar: item.avatar, email: item.email, domain: item.domain, gender: item.gender, available: item.available}}/>
              
          ))
        }

      
        </div>
    </div>
  )
}

export default UserCards
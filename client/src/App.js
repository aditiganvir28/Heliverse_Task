import Main from './components/main'
import { LoginContext } from './components/context'
import { useState, useRef } from 'react';
import { Route, Routes} from 'react-router-dom'
import CreateTeam from './components/CreateTeam';
import Teams from './components/Teams';
import './App.css'
import Axios from 'axios'

function App() {
  const [users, setUsers] = useState([])
  const [domain, setDomain] = useState([]);
  const [gender, setGender] = useState([]);
  const [available, setAvailable] = useState([]);
  const [activeSearch, setActiveSearch] = useState([]);
  const [team, setTeam] = useState([])
  const [allTeams, setAllTeams] = useState([])
  const [teamsCreated, setTeamsCreated] = useState([])
  const [limit,setLimit]=useState(20);
  const [pageCount,setPageCount]=useState(1);
  const currentPage=useRef();

  const setfilter = () => {
    console.log(process.env.REACT_APP_API_URL)
    Axios.post(process.env.REACT_APP_API_URL + `/api/filter?page=${currentPage.current}&limit=${limit}r`, {
            names: activeSearch,
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
    <LoginContext.Provider value={{users, setUsers, domain, setDomain, gender, setGender, available, setAvailable, activeSearch, setActiveSearch, team, setTeam, teamsCreated, setTeamsCreated, allTeams, setAllTeams, limit, setLimit, pageCount, setPageCount, currentPage, setfilter}}>
    <div>
    <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/createTeam" element={<CreateTeam/>}/>
          <Route exact path="/teams" element={<Teams/>}/>
          <Route exact path="/team/:id" element={<CreateTeam/>}/>
    </Routes>
    </div>
    </LoginContext.Provider>
  );
}

export default App;

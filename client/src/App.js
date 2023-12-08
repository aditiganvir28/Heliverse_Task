import Main from './components/main'
import { LoginContext } from './components/context'
import { useState } from 'react';
import { Route, Routes} from 'react-router-dom'
import CreateTeam from './components/CreateTeam';
import Teams from './components/Teams';
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [domain, setDomain] = useState([]);
  const [gender, setGender] = useState([]);
  const [available, setAvailable] = useState([]);
  const [activeSearch, setActiveSearch] = useState([]);
  const [team, setTeam] = useState([])
  const [allTeams, setAllTeams] = useState([])
  const [teamsCreated, setTeamsCreated] = useState([])

  return (
    <LoginContext.Provider value={{users, setUsers, domain, setDomain, gender, setGender, available, setAvailable, activeSearch, setActiveSearch, team, setTeam, teamsCreated, setTeamsCreated, allTeams, setAllTeams}}>
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

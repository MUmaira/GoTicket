import './App.css';
import SideBar from './components/SideBar';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Conductors from './pages/Conductors';
import BusRoutes from './pages/BusRoutes';
import Passengers from './pages/Passengers'
import TimeTable from './pages/TimeTable';
import Finances from './pages/Finances';
import Account from './pages/Account';

import edtConductor from './components/edtConductor';
import EditRoute from './components/EditRoute';
import EditTimeTable from './components/EditTimeTable';

import AuthManager from './auth/AuthManager';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/*<Header/>*/}
        <SideBar/>
        <Routes>
          <Route exact path='/' Component={AuthManager}/>
          <Route path='/dashboard' Component={Dashboard}/>
          <Route path='/conductors' Component={Conductors}/>
          <Route path='/routes' Component={BusRoutes}/>
          <Route path='/routes/:id' Component={EditRoute}/>
          <Route path='/passenger' Component={Passengers}/>
          <Route path='/timetable' Component={TimeTable}/>
          <Route path='/timetable/:id' Component={EditTimeTable}/>
          <Route path='/finances' Component={Finances}/>
          <Route path='/account' Component={Account}/>
          <Route path='/edtConductor' Component={edtConductor}/>
          <Route path='/edtConductor/:id' Component={edtConductor}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

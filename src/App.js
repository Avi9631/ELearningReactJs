import './App.css';
import Professor from './Professor'
import ProfPage from './ProfessorPage'
import Course from './Course'
import AdminPage  from './AdminPage'
import Profile from './Profile'
import Header from './Header'
import Home from './Home'
import Footer from './Footer'
import Login from './LoginModal'
import {BrowserRouter, Route} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Header />
        <Route exact path='/Admin' component={AdminPage} />
        <Route exact path='/' component={Home} />
        <Route exact path='/prof' component={Professor} />
        <Route exact path='/profcontrol' component={ProfPage} />
        
        <Route exact path='/course' component={Course} />
        <Route exact path='/profile' component={Profile} />

        <Login />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

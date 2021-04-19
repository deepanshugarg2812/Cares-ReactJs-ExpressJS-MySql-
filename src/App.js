import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Logout from './Pages/Logout';
import Post from './Pages/Post';
import Profile from './Pages/Profile';
import MakeFriends from './Pages/MakeFriends';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <>
    <Navbar />
    <Router>
      <Route path="/" exact render= {() => <Login />}/>
      <Route path="/signup" exact render= {() => <Signup />}/>
      <Route path="/home" exact render= {() => <Home />}/>
      <Route path="/post" exact render= {() => <Post />}/>
      <Route path="/friends" exact render= {() => <MakeFriends />}/>
      <Route path="/profile" exact render= {() => <Profile /> }/>
      <Route path="/logout" exact render= {() => <Logout />}/>
    </Router>
    </>
  );
}

export default App;
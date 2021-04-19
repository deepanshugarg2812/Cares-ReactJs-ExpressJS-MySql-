import React , {useState,useEffect} from 'react';
import './NavbarSide.css';

function NavbarSide() {
    const [loggedIn,setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(JSON.parse(sessionStorage.getItem('LoggedIn')));
    },[JSON.parse(sessionStorage.getItem('LoggedIn'))]);
    
    return (
        <>
        {!loggedIn? (<div className="navbar-menu1">
                    <a href="/" className="nav-item1">Login</a>
                    <a href="/signup" className="nav-item1">SignUp</a>
                </div>) : (
                    <div className="navbar-menu1">
                    <a href="/home" className="nav-item1">Home</a>
                    <a href="/post" className="nav-item1">Share</a>
                    <a href="/friends" className="nav-item1">Make friends</a>
                    <a href="/profile" className="nav-item1">Profile</a>
                    <a href="/logout" className="nav-item1">Logout</a>
                </div>
                )}
        </>
    )
}

export default NavbarSide

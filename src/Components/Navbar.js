import React , {useEffect, useState} from 'react';
import './Navbar.css';
import NavbarSide from './NavbarSide'

function Navbar() {
    const [click,setClick] = useState(false);
    const [loggedIn,setLoggedIn] = useState(false);

    useEffect(() => {
        function handleResize() {
          setClick(false);
        }
        window.addEventListener('resize', handleResize);
    });

    useEffect(() => {
        setLoggedIn(JSON.parse(sessionStorage.getItem('LoggedIn')));
    },[]);


    return (
        <div>
            <nav className="navbar">
                <div className="navbar-heading">
                    Cares <i className="fa fa-bandcamp"/>
                </div>
                <div className="navbar-menu-icon" onClick={() => setClick(!click)}>
                    <i className={click ? 'fa fa-times' : 'fa fa-bars'} />
                </div>

                {!loggedIn? (<div className="navbar-menu">
                    <a href="/" className="nav-item">Login</a>
                    <a href="/signup" className="nav-item">SignUp</a>
                </div>) : (
                    <div className="navbar-menu">
                    <a href="/home" className="nav-item">Home</a>
                    <a href="/post" className="nav-item">Share</a>
                    <a href="/friends" className="nav-item">Make friends</a>
                    <a href="/profile" className="nav-item">Profile</a>
                    <a href="/logout" className="nav-item">Logout</a>
                </div>
                )}

            </nav>
            <div>
                {click ? <div><NavbarSide /></div>:<div></div>}
            </div>
        </div>
    )
}

export default Navbar;
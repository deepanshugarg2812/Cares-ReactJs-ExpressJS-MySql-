import React , {useState} from 'react';
import './Login.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const history = useHistory();
    if(sessionStorage.getItem('LoggedIn')==="true"){
        history.push("/home");
    }

    const handleClick = () => {
        const params = new URLSearchParams();
        params.append('username',username);
        params.append('password',password);

        axios.post('http://localhost:9990/user/signup',params,{headers:{contentType: 'application/x-www-form-urlencoded'}})
        .then((response) => {
            if(response.data.accountMade==undefined){
                alert(response.data.message);
            }
            else{
                sessionStorage.clear();
                window.location.href = "/";
            }
        }) 
        .catch((err) => {
            alert("Server error");
        })
    }

    return (
        <div className="login-container">
            <h2>Signup</h2>
            <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} className="form" placeholder="Enter your username"/>
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className="form" placeholder="Enter your password"/>
            <button className="form" onClick={handleClick}>Sign Up</button>
        </div>
    )
}

export default Signup

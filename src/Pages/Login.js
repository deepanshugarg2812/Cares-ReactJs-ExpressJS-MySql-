import React , {useState} from 'react';
import './Login.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const history = useHistory();
    const handleClick = () => {
        const params = new URLSearchParams();
        params.append('username',username);
        params.append('password',password);

        axios.post('http://localhost:9990/user',params,{headers:{contentType: 'application/x-www-form-urlencoded'}})
        .then((response) => {
            if(response.data.userId==undefined){
                alert(response.data.message);
            }
            else{
                sessionStorage.setItem("LoggedIn",true);
                sessionStorage.setItem("userId",response.data.userId);
                sessionStorage.setItem("username",response.data.username);
                window.location.href = "/home";
            }
        }) 
        .catch((err) => {
            alert("Server error");
        })
    }
    return (
        <div className="login-container">
            <h2>Login</h2>
            <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} className="form" placeholder="Enter your username"/>
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className="form" placeholder="Enter your password"/>
            <button className="form" onClick={handleClick}>Login</button>
        </div>
    )
}

export default Login;
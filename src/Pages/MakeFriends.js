import React, { useEffect , useState } from 'react';
import {useHistory} from 'react-router-dom';
import './Common.css';
import axios from 'axios';

function MakeFriends() {
    const history = useHistory();
    if(sessionStorage.getItem('LoggedIn')==null || sessionStorage.getItem('LoggedIn')==="false"){
        history.push("/");
    }

    const [val,setVal] = useState(<div>Loading...</div>);
    const [val2,setVal2] = useState(<div>Loading...</div>);
    

    const handleClick = (e) => {
        var params = new URLSearchParams();
        params.append('username1', sessionStorage.getItem('username'));
        params.append('username2', e.target.getAttribute('data-attr'));
        axios.post("http://localhost:9990/friends/sendFriends",params,{headers : {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((response) => {
            requestFun();
        })
        .catch((err) => {alert("server error")});
    }

    const handleClickAccept = (e) => {
        var params = new URLSearchParams();
        params.append('username1', sessionStorage.getItem('username'));
        params.append('username2', e.target.getAttribute('data-attr'));
        axios.post("http://localhost:9990/friends/acceptRequest",params,{headers : {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((response) => {
            requestFun();
        })
        .catch((err) => {alert("server error")});
    }

    function requestFun(){
        var params = new URLSearchParams();
        params.append('userId',sessionStorage.getItem('userId'));
        axios.post('http://localhost:9990/friends/findFriends',params,{headers:{contentType: 'application/x-www-form-urlencoded'}})
        .then((response) => {
            if(response.data.usernames.length>0){
                let ele = [];
                response.data.usernames.map((e) => ele.push(<div className="row my-4" key={e.username}>
                    <div className="col-3 offset-3 text-center">{e.username}</div>
                    <button className="btn btn-primary" onClick={handleClick} data-attr={e.username}>Send request</button>
                </div>));
                setVal(ele);
            }
            else{
                setVal(<div>{response.data.message}</div>)
            }
        })
        .catch((err) => {
            
        });


        axios.post("http://localhost:9990/friends/pendingRequest",params,{headers : {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((response) => {
            if(response.data.requests.length>0){
                let ele = [];
                response.data.requests.map((e) => ele.push(<div className="row my-4" key={e.username}>
                    <div className="col-3 offset-3 text-center">{e.username}</div>
                    <button className="btn btn-primary" onClick={handleClickAccept} data-attr={e.username}>Accept request</button>
                </div>));
                setVal2(ele);
            }
            else{
                setVal2(<div>Loading...</div>)
            }
        })
        .catch((err) => {
            
        });
    }

    useEffect(() => {
        requestFun();
    },[val]);
    
    return (
        <div className="container my-2">
                <div className="card-friend">
                {val2}
                {val}
            </div>
        </div>
    );
}

export default MakeFriends

import React , {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { Image } from "cloudinary-react";
import './Common.css';
import axios from 'axios';

function Profile() {
    const history = useHistory();
    if(sessionStorage.getItem('LoggedIn')==null || sessionStorage.getItem('LoggedIn')==="false"){
        history.push("/");
    }

    const [val,setVal] = useState(<div>Loading...</div>);
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams();
        params.append('userId',sessionStorage.getItem('userId'));
        axios.post("http://localhost:9990/uploads/viewMyPost",params,{headers : {'Content-Type': 'application/x-www-form-urlencoded'}}).then((response) => {
            setUploads(response.data.post);
        });
      }, [uploads]);

    const handleClick = (e) => {
        var params = new URLSearchParams();
        params.append('username1', sessionStorage.getItem('username'));
        params.append('username2', e.target.getAttribute('data-attr'));
        axios.post("http://localhost:9990/friends/deleteFriend",params,{headers : {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((response) => {
            requestFun();
        })
        .catch((err) => {alert("server error")});
    }

    function requestFun(){
        var params = new URLSearchParams();
        params.append('userId',sessionStorage.getItem('userId'));
        axios.post('http://localhost:9990/friends/allFriends',params,{headers:{contentType: 'application/x-www-form-urlencoded'}})
        .then((response) => {
            if(response.data.friends.length>0){
                let ele = [];
                response.data.friends.map((e) => ele.push(<div className="row my-4" key={e.username}>
                    <div className="col-3 offset-3 text-center">{e.username}</div>
                    <button className="btn btn-primary" onClick={handleClick} data-attr={e.username}>Delete friend</button>
                </div>));
                setVal(ele);
            }
            else{
                setVal(<div>{response.data.message}</div>)
            }
        })
        .catch((err) => {
            
        });
    }

    useEffect(() => {
        requestFun();
    },[val]);

    const handleClickDelete = (e) => {
        var params = new URLSearchParams();
        params.append('userId', sessionStorage.getItem('userId'));
        params.append('postId', e.target.getAttribute('data-attr'));
        axios.post('http://localhost:9990/uploads/DeleteMyPost',params,{headers:{contentType: 'application/x-www-form-urlencoded'}})
        .then((response) => {
            if(response.data.message=="Deleted"){
                setUploads([]);
            }
        })
    }

    return (
        <div className="container card-friends">
            <h3>Friends</h3>
            {val}

            <h3 style={{marginTop : '20px'}}>Posts</h3>
            {(uploads!=undefined && uploads.length>0)?uploads.map((val) => {
                return (
                <div className="col-12 col-lg-5 card mx-2" key={val.id}>
                <div className="card-header row">
                    <h4 className="col-4 offset-4">{val.title}</h4>
                </div>
                <div className="card-image row">
                    <Image height="400px" width="100%" cloudName="deepu2812-company" publicId={val.Image} />
                </div>
                <div className="card-description row my-3">
                    <div style={{margin:'2px'}} className="col-12"><h4>By @{val.username}</h4></div>
                    <div className="col-12">{val.description}</div>
                </div>
                <div className="card-bottom row m-3">
                    <button className="col-12 col-lg-5 btn btn-primary" data-attr={val.id} onClick={handleClickDelete}>Delete</button>
                    <div className="col-0 col-lg-2"></div>
                </div>
            </div>
                );
            })
        :
        (
            <div>Loading...</div>
        )    
        }
        </div>
    )
}

export default Profile;
import React , {useState , useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Modal,Button} from 'react-bootstrap';
import { Image } from "cloudinary-react";
import './Common.css';
import axios from 'axios';

function Home() {
    const history = useHistory();
    if(sessionStorage.getItem('LoggedIn')==null || sessionStorage.getItem('LoggedIn')==="false"){
        history.push("/");
    }

    const [show,setShow] = useState(false);
    const [uploads, setUploads] = useState([]);
    
    const handleClick = () => {
        setShow(!show);
    }

    const handleClickSubmit = () => {
        setShow(!show);
    }

    useEffect(() => {
        const params = new URLSearchParams();
        params.append('userId',sessionStorage.getItem('userId'));
        axios.post("http://localhost:9990/uploads/getFriendsPost",params,{headers : {'Content-Type': 'application/x-www-form-urlencoded'}}).then((response) => {
            setUploads(response.data.post);
        });
      }, []);

    return (
        <div className="home container">
            <h2 className="text-center my-3">Your friends thoughts</h2>
            <div className="row">
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
                    <button className="col-12 col-lg-5 btn btn-primary"><i className="icon fa fa-heart" /></button>
                    <div className="col-0 col-lg-2"></div>
                    <button className="col-12 col-lg-5  btn btn-primary" onClick={() => setShow(!show)}><i className="icon fa fa-comments" /></button>
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

            <Modal show={show} onHide={handleClick}>
                <Modal.Header>Enter your comment</Modal.Header>
                <Modal.Body>
                    <input type="text" className="form-control" placeholder="Enter your comment" />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClickSubmit}>Sumbit</Button>
                    <Button onClick={handleClick}>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Home;
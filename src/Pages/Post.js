import React , {useState} from 'react';
import './Common.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function Post() {
    const [title,setTitle] = useState('');
    const [description,setDescritpion] = useState('');
    const [image,setImgage] = useState([]);

    const history = useHistory();
    const handleClick = () => {
        const formData = new FormData();
        formData.append("file", image[0]);
        formData.append("upload_preset", "ltyebzjv");
        axios.post('https://api.cloudinary.com/v1_1/deepu2812-company/image/upload',formData).then((response) => {
            const fileName = response.data.public_id;
            const params = new URLSearchParams();
            params.append('image',fileName);
            params.append('user_id',sessionStorage.getItem("userId"),);
            params.append('username',sessionStorage.getItem("username"));
            params.append('description',description);
            params.append('title',title);
            axios.post("http://localhost:9990/uploads", params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then((res) => {
                history.push("/home");
            });
        });
    }
    return (
        <div className="post">
            Create a post
            <input type="text" className="uploaditem" placeholder="Enter your post title" onChange={(event) => setTitle(event.target.value)}/>
            <input type="text" className="uploaditem" placeholder="Enter description" onChange={(event) => setDescritpion(event.target.value)} />
            <input type="file" className="uploaditem" placeholder="Enter image" onChange={(e) => setImgage(e.target.files)}/>
            <button className="uploaditem" onClick={handleClick}>Post</button>
        </div>
    )
}

export default Post;

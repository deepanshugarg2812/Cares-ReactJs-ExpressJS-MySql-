import React from 'react';
import {useHistory} from 'react-router-dom';

function Logout() {
    sessionStorage.clear();
    const history = useHistory();
    history.push("/");

    return (
        <div>
            Logout
        </div>
    )
}

export default Logout

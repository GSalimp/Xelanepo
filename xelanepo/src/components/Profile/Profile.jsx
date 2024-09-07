import React from "react";
import { useParams } from "react-router-dom";

function Profile(){
    const { id } = useParams();  
    console.log(id)

    return (
        <div>
            <h1>Profile</h1>
            <p>Profile Page</p>
        </div>
    )
}

export {Profile}
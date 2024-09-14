import React from "react";
import { useParams } from "react-router-dom";

import { ProfileHeader } from "./ProfileHeader";
import { Works } from "./Works";
import { Languages } from "./Languages";
import { CitationsGraph } from "./CitationsGraph";
import { WorksGraph } from "./WorksGraph";
import { InstitutionsMap } from "./InstitutionsMap";

import "./../styles/Profile.css";


function Profile(){
    const { id } = useParams();  
    console.log(id)

    return (
        <div className="profile-page">
            <h1>Profile</h1>
            <div className="profileItens">
                <ProfileHeader />
                <Works />
                <Languages />
                <CitationsGraph />
                <WorksGraph />
                <InstitutionsMap />
            </div>
        </div>
    )
}

export {Profile}
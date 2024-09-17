import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import { ProfileHeader } from "./ProfileHeader";
import { Works } from "./Works";
import { Languages } from "./Languages";
import { Topics } from "./Topics";
import { CitationsGraph } from "./CitationsGraph";
import { WorksGraph } from "./WorksGraph";
import { InstitutionsMap } from "./InstitutionsMap";

import "./../styles/Profile.css";

function Profile(){
    const { id } = useParams();  
    const [author, setAuthor] = useState({});
    const [works, setWorks] = useState([]);
    console.log(id)

    useEffect(() => {
        window.scrollTo(0, 0)

        async function featchAuthor() {
            try {
                const authorRequest = await fetch(`https://api.openalex.org/authors/${id}`);
                const outhorData = await authorRequest.json();
                setAuthor(outhorData);

                const workdsRequest = await fetch(`https://api.openalex.org/authors/${id}`);
                const workdsData = await workdsRequest.json();
                setWorks(workdsData);

                console.log("outhorData", outhorData)
                console.log("workdsData", workdsData)
            } 
            catch (error) {
                console.error(error);
            }
        }
        featchAuthor();
    }, [])

    return (
        <div className="profile-page">
            <h1>Profile</h1>
            <div className="profileItens">
                <ProfileHeader />
                <Works />
                <Languages />
                <Topics />
                <CitationsGraph />
                <WorksGraph />
                <InstitutionsMap />
            </div>
        </div>
    )
}

export {Profile}
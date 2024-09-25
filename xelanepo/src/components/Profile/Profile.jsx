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
    // const id = "A5058053632"; 
    const [author, setAuthor] = useState({});
    const [works, setWorks] = useState([]);
    const [personalInfo, setPersonalInfo] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0)

        async function featchAuthor() {
            try {
                const authorRequest = await fetch(`https://api.openalex.org/authors/${id}`);
                const outhorData = await authorRequest.json();
                setAuthor(outhorData);
                
                //wait 5 seconds to make another request
                await new Promise(r => setTimeout(r, 1000));
                const workdsRequest = await fetch(outhorData.works_api_url);
                const workdsData = await workdsRequest.json();
                setWorks(workdsData);

                setPersonalInfo({
                    name: outhorData.display_name,
                    location: "undefined",
                    genero: "undefined",
                    dataNascimento: "undefined",
                    nascionalidade: "undefined",
                    summary_stats: outhorData.summary_stats,
                    image: "./profilePLaceholder.svg"
                })

                // console.log(workdsData);

            } 
            catch (error) {
                console.error(error);
            }
        }
        featchAuthor();
    }, [])

    if (Object.keys(author).length === 0)
        return (
            <div className="profile-page">
                <div className="loading">
                    <span>Loading...</span>
                </div>
            </div>
        );

    return (
        <div className="profile-page">
            <h1>Profile</h1>
            <div className="profileItens">
                <ProfileHeader personalInfo={personalInfo}/>
                <Works works={works}/>
                <Languages id={id}/>
                <Topics id={id}/>
                <CitationsGraph counts_by_year={author.counts_by_year}/>
                <WorksGraph id={id}/>
                <InstitutionsMap id={id}/>
            </div>
        </div>
    )
}

export {Profile}
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
    const [worksApiUrl, setWorksApiUrl] = useState("");
    const [personalInfo, setPersonalInfo] = useState({});

    useEffect(() => {
        async function featchAuthor() {
            try {
                const authorRequest = await fetch(`https://api.openalex.org/authors/${id}`);
                const outhorData = await authorRequest.json();
                setAuthor(outhorData);
                setWorksApiUrl(outhorData.works_api_url);

                setPersonalInfo({
                    name: outhorData.display_name,
                    location: "undefined",
                    genero: "undefined",
                    dataNascimento: "undefined",
                    nascionalidade: "undefined",
                    summary_stats: outhorData.summary_stats,
                    image: "/profilePLaceholder.svg",
                    last_known_institutions: outhorData.last_known_institutions[0].display_name,
                    cited_by_count: outhorData.cited_by_count,
                    works_count: outhorData.works_count,
                })

            } 
            catch (error) {
                console.error(error);
            }
        }
        featchAuthor();
    }, [])

    if (Object.keys(author).length === 0 || worksApiUrl === "")
        return (
            <div className="profile-page">
                <h1>Profile</h1>
                <div className="profileItens">
                    <div className="loading"></div>
                </div>
            </div>
        );
    
    return (
        <div className="profile-page">
            <h1>Profile</h1>
            <div className="profileItens">
                <ProfileHeader personalInfo={personalInfo}/>
                <Works worksApiUrl={worksApiUrl}/>
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



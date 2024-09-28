import React from "react";

import "./../styles/ProfileItens/ProfileHeader.css";

function ProfileHeader({personalInfo}){
    // const { id } = useParams();  

    if(Object.keys(personalInfo).length === 0) return (
        <div className="ProfileHeader profileItem">
            <div className="loading">
                <span>Loading...</span>
            </div>
        </div>
    )


    return (
        <div className="ProfileHeader profileItem">
            <span>ProfileHeader</span>
            <div className="profile-details">
                <div className="profile-img-header">
                    <img src={personalInfo.image    } alt="profilePlaceholder" />
                </div>
                <div className="profile-details-itens">
                    <div className="profile-details-iten">
                        <span className="iten-title">Name</span>
                        <span className="iten-title">{personalInfo.name}</span>
                    </div>
                    <div className="profile-details-iten">
                        <span className="iten-title">Gender</span>
                        <span className="iten-title">{personalInfo.genero}</span>
                    </div>
                    <div className="profile-details-iten">
                        <span className="iten-title">Date of Birth</span>
                        <span className="iten-title">{personalInfo.dataNascimento}</span>
                    </div>
                    <div className="profile-details-iten">
                        <span className="iten-title">Nationality</span>
                        <span className="iten-title">{personalInfo.nascionalidade}</span>
                    </div>
                </div>

                <div className="profile-details-indicadores">
                    <p>2yr_mean_citedness = {personalInfo.summary_stats["2yr_mean_citedness"]}</p>
                    <p>h_index = {personalInfo.summary_stats["h_index"]}</p>
                    <p>i10_index = {personalInfo.summary_stats["i10_index"]}</p>
                </div>
            </div>
        </div>
    )
}

export {ProfileHeader}
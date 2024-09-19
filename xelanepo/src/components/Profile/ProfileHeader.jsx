import React from "react";
import { useParams } from "react-router-dom";

import "./../styles/ProfileItens/ProfileHeader.css";

function ProfileHeader(){
    // const { id } = useParams();  

    return (
        <div className="ProfileHeader profileItem">
            <span>ProfileHeader</span>
            <div className="profile-details">
                <div className="profile-img-header">
                    <img src="./profilePLaceholder.svg" alt="profilePlaceholder" />
                </div>
                <div className="profile-details-itens">
                    <div className="profile-details-iten">
                        <span className="iten-title">Name</span>
                        <span className="iten-title">Tomiwa Oyeledu Dolapo</span>
                    </div>
                    <div className="profile-details-iten">
                        <span className="iten-title">Gender</span>
                        <span className="iten-title">Female</span>
                    </div>
                    <div className="profile-details-iten">
                        <span className="iten-title">Date of Birth</span>
                        <span className="iten-title">August 27th, 1999</span>
                    </div>
                    <div className="profile-details-iten">
                        <span className="iten-title">Nationality</span>
                        <span className="iten-title">Nigerian</span>
                    </div>
                </div>

                <div className="profile-details-indicadores">
                    <p>H = 1</p>
                    <p>H = 1</p>
                    <p>H = 1</p>
                </div>
            </div>
        </div>
    )
}

export {ProfileHeader}
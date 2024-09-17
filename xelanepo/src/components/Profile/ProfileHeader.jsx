import React from "react";
import { useParams } from "react-router-dom";

import "./../styles/ProfileItens/ProfileHeader.css";

function ProfileHeader(){
    // const { id } = useParams();  

    return (
        <div className="ProfileHeader profileItem">
            <span>ProfileHeader</span>
            <div className="profile-details">
                <div className="profile-img">
                    <img src="./profilePLaceholder.svg" alt="profilePLaceholder" />
                </div>
                <div className="profile-details-itens">
                    <div className="profile-details-iten">
                        <span className="iten-title">Name</span>
                        <span className="iten-title">Mateus</span>
                    </div>
                    <div className="profile-details-iten">
                        <span className="iten-title">Name</span>
                        <span className="iten-title">Mateus</span>
                    </div>
                    <div className="profile-details-iten">
                        <span className="iten-title">Name</span>
                        <span className="iten-title">Mateus</span>
                    </div>
                    <div className="profile-details-iten">
                        <span className="iten-title">Name</span>
                        <span className="iten-title">Mateus</span>
                    </div>
                    <div className="profile-details-iten">
                        <span className="iten-title">Name</span>
                        <span className="iten-title">Mateus</span>
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
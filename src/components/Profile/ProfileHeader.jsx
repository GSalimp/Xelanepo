import React from "react";

import "./../styles/ProfileItens/ProfileHeader.css";

function ProfileHeader({ personalInfo }) {
    // const { id } = useParams();  

    if (Object.keys(personalInfo).length === 0) return (
        <div className="ProfileHeader profileItem">
            <span className="profileItemTitle">Detalhes</span>
            <div className="loading"></div>
        </div>
    )


    return (
        <div className="ProfileHeader profileItem">
            <span className="profileItemTitle">Detalhes</span>
            <div className="profile-details">
                <div className="profile-details-rigth-warper">
                    <div className="profile-img-header">
                        <img src={personalInfo.image} alt="profilePlaceholder" />
                    </div>
                    <div className="profile-details-itens">
                        <div className="profile-details-iten">
                            <span className="iten-title">Name</span>
                            <span className="iten-content">{personalInfo.name}</span>
                        </div>
                        <div className="profile-details-iten">
                            <span className="iten-title">Last Known Institutions</span>
                            <span className="iten-content">{personalInfo.last_known_institutions}</span>
                        </div>
                        <div className="profile-details-iten">
                            <span className="iten-title">Date of Birth</span>
                            <span className="iten-content">{personalInfo.dataNascimento}</span>
                        </div>
                        <div className="profile-details-iten">
                            <span className="iten-title">Nationality</span>
                            <span className="iten-content">{personalInfo.nascionalidade}</span>
                        </div>
                    </div>
                </div>

                <div className="stats">
                    <div className="stat-item">
                        <span className="label">2yr_mean_citedness</span>
                        <div className="line"></div>
                        <span className="value">{personalInfo.summary_stats["2yr_mean_citedness"].toFixed(8)}</span>
                    </div>
                    <div className="stat-item">
                        <span className="label">h_index</span>
                        <div className="line"></div>
                        <span className="value">{personalInfo.summary_stats["h_index"]}</span>
                    </div>
                    <div className="stat-item">
                        <span className="label">i10_index</span>
                        <div className="line"></div>
                        <span className="value">{personalInfo.summary_stats["i10_index"]}</span>
                    </div>
                    <div className="stat-item">
                        <span className="label">Citations</span>
                        <div className="line"></div>
                        <span className="value">{personalInfo.cited_by_count}</span>
                    </div>
                    <div className="stat-item">
                        <span className="label">Work Count</span>
                        <div className="line"></div>
                        <span className="value">{personalInfo.works_count}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ProfileHeader }
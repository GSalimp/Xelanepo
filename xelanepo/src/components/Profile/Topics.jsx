import React from "react";
import { useParams } from "react-router-dom";

import "./../styles/ProfileItens/Topics.css";

function TopicsCard(){
    return (
        <div className="topic-card">
            <div className="title">Protein Measurement With The Folin Phenol Reagent</div>
            <div className="number">1</div>
        </div>
    )
}

function Topics(){
    // const { id } = useParams();  

    return (
        <div className="Topics profileItem">
            <span>Topics</span>
            <div className="topics-itens">
                <TopicsCard />
                <TopicsCard />
                <TopicsCard />
                <TopicsCard />
                <TopicsCard />
                <TopicsCard />
                <TopicsCard />
                <TopicsCard />
                <TopicsCard />
                <TopicsCard />
                <TopicsCard />
                <TopicsCard />
            </div>
        </div>
    )
}

export {Topics}
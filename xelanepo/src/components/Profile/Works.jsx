import React from "react";
import { useParams } from "react-router-dom";
import "./../styles/ProfileItens/Works.css";

function workCard(){
    return (
        <div className="work-card">
            <div className="tag">Technology</div>
            <div className="title">Protein Measurement With The Folin Phenol Reagent</div>
            <div className="subtitle">article 1951 open</div>
        </div>
    )
}

function Works(){
    // const { id } = useParams();  

    return (
        <div className="works profileItem">
            <span>Works</span>
            <div className="work-itens">
                {workCard()}
                {workCard()}
                {workCard()}
                {workCard()}
                {workCard()}
            </div>

        </div>
    )
}

export {Works}
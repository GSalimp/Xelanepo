import React from "react";
import { useParams } from "react-router-dom";
import "./../styles/ProfileItens/Works.css";

function workCard(work, index) {
  return (
    <a className="work-card-a" href={work.doi} key={`${work.doi}-${index}`}>
      <div className="work-card">
        <div className="tag">{work.topics[0]?.display_name}</div>
        <div className="title">{work.title}</div>
        <div className="subtitle">
          {work.type} - {work.publication_year} - {work.open_access?.is_oa ? "Open Access" : "Closed Access"}
        </div>
      </div>
    </a>
  );
}

function Works({ works }) {
  if (works.length === 0)
    return (
      <div className="works profileItem">
        <div className="loading">
          <span>Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="works profileItem">
      <span>Works</span>
      <div className="work-itens">
        {works.results.map((work, index) => workCard(work, index))}
      </div>
    </div>
  );
}

export { Works };

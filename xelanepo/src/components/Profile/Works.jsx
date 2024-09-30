import React, {useEffect, useState} from "react";
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
        <div className="citation">Cited by: {work.cited_by_count}</div> {/* Added citation count */}
      </div>
    </a>
  );
}

function Works({ worksApiUrl }) {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    async function fetchWorks() {
      try {
        console.log("worksApiUrl", worksApiUrl)
        const worksRequest = await fetch(worksApiUrl);
        const worksData = await worksRequest.json();
        setWorks(worksData);
        console.log("worksData", worksData)
      } 
      catch (error) {
        console.error(error);
      }
    }
    fetchWorks();
  },[])

  if (works.length === 0 || worksApiUrl === "")
    return (
      <div className="works profileItem">
        <span className="profileItemTitle">Works</span>
        <div className="loading"></div>
      </div>
    );
  
  works.results.sort((a, b) => b.cited_by_count - a.cited_by_count);

  return (
    <div className="works profileItem">
      <span className="profileItemTitle">Works</span>
      <div className="work-itens">
        {works.results.map((work, index) => workCard(work, index))}
      </div>
    </div>
  );
}

export { Works };

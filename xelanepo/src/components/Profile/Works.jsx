import React, { useEffect, useState, useRef  } from "react";
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
        <div className="citation">Cited by: {work.cited_by_count}</div>
      </div>
    </a>
  );
}

function Works({ worksApiUrl }) {
  const [works, setWorks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const worksDivRef = useRef(null);

  useEffect(() => {
    async function fetchWorks() {
      try {
        setLoading(true);
        const worksRequest = await fetch(worksApiUrl + `&per_page=10&page=${page}&sort=cited_by_count:desc`);
        const worksData = await worksRequest.json();
        setWorks((prevWorks) => [...prevWorks, ...worksData.results]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchWorks();
  }, [page, worksApiUrl]);

  useEffect(() => {
    const worksDiv = worksDivRef.current;
  
    function handleScroll() {
      if (worksDiv) {
        const bottom = worksDiv.scrollHeight - worksDiv.scrollTop <= worksDiv.clientHeight + 50;
        if (bottom && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    }
  
    if (worksDiv) {
      worksDiv.addEventListener("scroll", handleScroll);
    }
  
    return () => {
      if (worksDiv) {
        worksDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading]);

  if (works.length === 0 || worksApiUrl === "")
    return (
      <div className="works profileItem">
        <span className="profileItemTitle">Works</span>
        <div className="loading"></div>
      </div>
    );

  works.sort((a, b) => b.cited_by_count - a.cited_by_count);

  return (
    <div className="works profileItem">
      <span className="profileItemTitle">Works</span>
      <div className="work-itens" ref={worksDivRef}>
        {works.map((work, index) => workCard(work, index))}
      </div>
      {loading && <div className="loading"></div>}
    </div>
  );
}

export { Works };
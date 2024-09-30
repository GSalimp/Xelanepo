import React, { useEffect, useState } from "react";
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
    function handleScroll() {
      const worksDiv = document.querySelector(".works");
      const bottom = worksDiv && window.innerHeight + window.scrollY >= worksDiv.offsetTop + worksDiv.scrollHeight - 50;
      if (bottom && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      <div className="work-itens">
        {works.map((work, index) => workCard(work, index))}
      </div>
      {loading && <div className="loading"></div>}
    </div>
  );
}

export { Works };
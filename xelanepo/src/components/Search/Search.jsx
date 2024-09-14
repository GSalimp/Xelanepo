import React, { useState, useEffect } from "react";

import { ResultCard } from "./ResultCard";
import { RangeSlider } from './RangeSlider';
import { MultiSelect } from "./MultiSelect";

import './../styles/Search.css';

async function fetchAuthors(searchInput = "", page = 1, per_page = 10) {
    try {
      let queryString = "";
      if (searchInput !== "") {
        queryString = `q=${searchInput.trim()}&`;
      }
  
      const response = await fetch(
        `https://api.openalex.org/autocomplete/authors?${queryString}`
      );
      const data = await response.json();
      return data.results;      ;
    } 
    catch (error) {
      console.error(error);
      return [];
    }
}

// async function getAuthorsInstiution() {
//     try {
//       const response = await fetch(
//         `https://api.openalex.org/autocomplete/institutions`
//       );
//       const data = await response.json();
//       return data.results;
//     } 
//     catch (error) {
//       console.error(error);
//       return [];
//     }
// }

function Search() {
    const [searchName, setsearchName] = useState("");

    const [minValueWorks, setMinValueWorks] = useState(2500);
    const [maxValueWorks, setMaxValueWorks] = useState(7500);

    const [minValueCites, setMinValueCites] = useState(2500);
    const [maxValueCites, setMaxValueCites] = useState(7500);

    const [selectedOptions, setSelectedOptions] = useState([]);
    
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        searchFunction();
    }, []);

    const searchFunction = async () => {
        let data = await fetchAuthors(searchName);
        
        let tmp = []
        data.forEach((author) => {
            // if (author.works_count >= minValueWorks && author.works_count <= maxValueWorks &&
            //     author.cited_by_count >= minValueCites && author.cited_by_count <= maxValueCites &&
            //     (selectedOptions.length === 0 || selectedOptions.includes(author.hint))) {
                
                tmp.push({
                        name: author.display_name,
                        last_known_institutions: author.hint,
                        profileImg: "./profilePLaceholder.svg",
                        cited_by_count: author.cited_by_count,
                        works_count: author.works_count,
                        id: author.short_id.split("/").pop()
                    })
            // }
        });
        setAuthors(tmp);
    }

    const handleChange = async (e) => {
        const value = e.target.value;
        setsearchName(value);
        e.preventDefault();
        searchFunction();
    };

    const clearFilters = async (e) => {
        setMinValueWorks(2500);
        setMaxValueWorks(7500);
        setMinValueCites(2500);
        setMaxValueCites(7500);
        setSelectedOptions([]);
        e.preventDefault();
        searchFunction();
    }

    return (
        <div className="search-page">
            <h1>Search</h1>
            <div className="search-box">
                <input type="text" placeholder="Search a name" onChange={handleChange} />
                <span className="search-icon">
                    <img src="./search.svg" alt="Search Icon" />
                </span>
                <span className="filter-icon">
                    <img src="./filter.svg" alt="Filter Icon" />
                </span>
            </div>

            <div className="search-result-filter">
                <form className="filter">
                    <h2 className="filter-title">Filter</h2>

                    <div className="filter-item">
                        <span className="filter-item-title">Works</span>
                        <RangeSlider
                            minValue={minValueWorks}
                            maxValue={maxValueWorks}
                            setMinValue={setMinValueWorks}
                            setMaxValue={setMaxValueWorks}
                            valueGap={1000}
                        />
                    </div>

                    <div className="filter-item">
                        <span className="filter-item-title">Institutions</span>
                        <MultiSelect
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}
                        />
                    </div>

                    <div className="filter-item">
                        <span className="filter-item-title">Cites Count</span>
                        <RangeSlider
                            minValue={minValueCites}
                            maxValue={maxValueCites}
                            setMinValue={setMinValueCites}
                            setMaxValue={setMaxValueCites}
                            valueGap={1000}
                        />
                    </div>

                    <div className="filter-item form-buttons">
                        <button className="apply-btn" type="submit" onClick={handleChange}>Apply</button>
                        <button className="apply-btn" type="submit" onClick={clearFilters}>Clean</button>
                    </div>
                </form>

                <div className="results">
                    {authors.map((data) => {
                        return <ResultCard data={data} key={data.id} />
                    })}
                </div>
            </div>
        </div>
    );
}

export { Search };

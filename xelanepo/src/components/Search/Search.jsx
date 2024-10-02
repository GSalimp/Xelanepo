import React, { useState, useEffect } from "react";
import axios from 'axios';

import { ResultCard } from "./ResultCard";
import { RangeSlider } from './RangeSlider';
import { MultiSelect } from "./MultiSelect";

import './../styles/Search.css';

async function fetchAuthors(searchInput = "", minWorks = 0, maxWorks = 10000000, minCites = 0, maxCites = 10000000, selectedInstitutions = [], page = 1, per_page = 10) {
    try {
        let filterQuery = `filter=works_count:>${minWorks},works_count:<${maxWorks},cited_by_count:>${minCites},cited_by_count:<${maxCites}`;

        if (selectedInstitutions.length > 0) {
            const institutionsQuery = selectedInstitutions.map(id => `last_known_institutions.id:${id}`).join(',');
            filterQuery += `,${institutionsQuery}`;
        }

        if (searchInput.trim() !== "") {
            filterQuery += `&q=${searchInput}`;
            // filterQuery += `&q=${searchInput}&search=${searchInput}`;
        }
        
        // console.log(`https://api.openalex.org/autocomplete/authors?${filterQuery}`)
        const response = await axios.get(`https://api.openalex.org/autocomplete/authors?${filterQuery}`);

        return response.data.results;

    } catch (error) {
        console.error("Error fetching authors:", error);
        return [];
    }
}

function Search() {
    const [loading, setLoading] = useState(true);
    const [isFilterVisible, setIsFilterVisible] = useState(true);
    const [searchName, setsearchName] = useState("");
    const [minValueWorks, setMinValueWorks] = useState(0);
    const [maxValueWorks, setMaxValueWorks] = useState(1000000);
    const [minValueCites, setMinValueCites] = useState(0);
    const [maxValueCites, setMaxValueCites] = useState(1000000);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        searchFunction();
    }, [searchName]);

    const searchFunction = async () => {
        // console.log("Clearing filters", minValueWorks, maxValueWorks, minValueCites, maxValueCites, selectedOptions);
        setLoading(true);
        let data = await fetchAuthors(searchName, minValueWorks, maxValueWorks, minValueCites, maxValueCites, selectedOptions.map(option => option.value));

        let tmp = []
        data.forEach((author) => {
            tmp.push({
                name: author.display_name,
                last_known_institutions: author.hint,
                profileImg: "./profilePLaceholder.svg",
                cited_by_count: author.cited_by_count,
                works_count: author.works_count,
                id: author.id.split("/").pop()
            })
        });
        setAuthors(tmp);
        setLoading(false);
    }

    const handleChange = async (e) => {
        const value = e.target.value;
        setsearchName(value);
        e.preventDefault();
        await searchFunction();
    };

    const clearFilters = async (e) => {
        e.preventDefault();
        setMinValueWorks(0);
        setMaxValueWorks(1000000);
        setMinValueCites(0);
        setMaxValueCites(1000000);
        setSelectedOptions([]);
        await searchFunction();
    };

    const toggleFilter = () => {
        setIsFilterVisible(prev => !prev); // Toggle the visibility
    };

    return (
        <div className="search-page">
            <h1>Search</h1>
            <div className="search-box">
                <span className="search-icon">
                    <img src="/search.svg" alt="Search Icon" />
                </span>
                <input type="text" placeholder="Search a name" onChange={handleChange} />
                <span className="filter-icon" onClick={toggleFilter}>
                    <img src="/filter.svg" alt="Filter Icon" />
                </span>
            </div>

            <div className="search-result-filter">
                <form className={`filter ${isFilterVisible ? '' : 'hidden'}`}>
                    <h2 className="filter-title">Filter</h2>

                    <div className="filter-item">
                        <span className="filter-item-title">Works</span>
                        <RangeSlider
                            minValue={minValueWorks}
                            maxValue={maxValueWorks}
                            setMinValue={setMinValueWorks}
                            setMaxValue={setMaxValueWorks}
                            valueGap={1}
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
                            valueGap={1}
                        />
                    </div>

                    <div className="filter-item form-buttons">
                        <button className="apply-btn" type="button" onClick={searchFunction}>Apply</button>
                        <button className="apply-btn" type="button" onClick={clearFilters}>Clean</button>
                    </div>
                </form>

                {loading ? (
                    <div className="results results-loading">
                        <div className="loading"></div>
                    </div>
                ) : (
                    <div className="results">
                        {authors.map((data) => (
                            <ResultCard data={data} key={data.id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export { Search };

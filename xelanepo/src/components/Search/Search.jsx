import React, { useState, useEffect } from "react";

import { ResultCard } from "./ResultCard";
import { RangeSlider } from './RangeSlider';
import { MultiSelect } from "./MultiSelect";

import './../styles/Search.css';



function Search() {
    const [minValueWorks, setMinValueWorks] = useState(2500);
    const [maxValueWorks, setMaxValueWorks] = useState(7500);

    const [minValueCites, setMinValueCites] = useState(2500);
    const [maxValueCites, setMaxValueCites] = useState(7500);

    const [selectedOptions, setSelectedOptions] = useState([]);
    

    const MOCKDATA = [
        {
            name: "Name",
            last_known_institutions: "Last Institution",
            profileImg: "./profilePLaceholder.svg",
            cited_by_count: 90,
            works_count: 1,
            id: 1
        },
        {
            name: "Name",
            last_known_institutions: "Last Institution",
            profileImg: "./profilePLaceholder.svg",
            cited_by_count: 90,
            works_count: 10,
            id: 2
        }
    ];

    const handleChange = (e) => {
        e.preventDefault();
        console.log({
            minValueWorks,
            maxValueWorks,
            minValueCites,
            maxValueCites,
            selectedOptions
        });
    };

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

                    <div className="filter-item">
                        <button className="apply-btn" type="submit" onClick={handleChange}>Apply</button>
                    </div>
                </form>

                <div className="results">
                    {MOCKDATA.map((data) => {
                        return <ResultCard data={data} key={data.id} />
                    })}
                </div>
            </div>
        </div>
    );
}

export { Search };

import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import { LineChart } from "./LineChart";

// https://api.openalex.org/works?group_by=publication_year&per_page=200&filter=authorships.author.id:a5106322486 = WORKs Per Year
// https://api.openalex.org/works?filter=is_oa:true,authorships.author.id:a5106322486&group_by=publication_year = WORKs Per Year Open Access

function WorksGraph({id}) {
    // const { id } = useParams();  
    const [worksPerYear, setWorksPerYear] = useState({});
    const [worksPerYearOpen, setWorksPerYearOpen] = useState({});
    const [yearLabels, setYearLabels] = useState([]);

    const [flag, setFlag] = useState(false);

    useEffect(() => {
        async function fetchWorksCount() {
            try {
                await new Promise(r => setTimeout(r, 1000));
                
                const requestWorksPerYear = await fetch(`https://api.openalex.org/works?group_by=publication_year&per_page=200&filter=authorships.author.id:${id}&sort=key`);
                const requestWorksPerYearData = await requestWorksPerYear.json();

                await new Promise(r => setTimeout(r, 1000));

                const requestWorksPerYearOpen = await fetch(`https://api.openalex.org/works?filter=is_oa:true,authorships.author.id:${id}&group_by=publication_year&sort=key`);
                const requestWorksPerYearOpenData = await requestWorksPerYearOpen.json();

                // check if the code of the request is 200
                if (requestWorksPerYear.status !== 200 || requestWorksPerYearOpen.status !== 200) {
                    console.error("Error fetching data");
                    return;
                }

                // Merge keys
                const allYears = new Set([
                    ...requestWorksPerYearData.group_by.map(entry => entry.key),
                    ...requestWorksPerYearOpenData.group_by.map(entry => entry.key)
                ]);

                // Create two lists, initializing them with 0
                let list1 = [];
                let list2 = [];
                
                // Iterate through all years and build the lists
                allYears.forEach(year => {
                    const entry1 = requestWorksPerYearData.group_by.find(entry => entry.key === year);
                    const entry2 = requestWorksPerYearOpenData.group_by.find(entry => entry.key === year);
                    
                    // Add the count if year exists, else add 0
                    list1.push(entry1 ? entry1.count : 0);
                    list2.push(entry2 ? entry2.count : 0);
                });

                setWorksPerYear({data: list1, name: "Total"});
                setWorksPerYearOpen({data: list2, name: "Open"});
                setYearLabels(Array.from(allYears));

                setFlag(true);
                // console.log(worksPerYear)
                // console.log(worksPerYearOpen)
            

            } catch (error) {
                console.error(error);
            }
        }
        fetchWorksCount();
    }, [id]);

    const yAxisLabel = 'Numero de Trabalhos';
    const xAxisLabel = 'Anos';

    if (flag === false)
        return (
            <div className="WorksGraph profileItem">
                <div className="loading">
                    <span>Loading...</span>
                </div>
            </div>
        );

    return (
        <div className="WorksGraph profileItem">
            <span>WorksGraph</span>
            <LineChart
                series={[worksPerYear, worksPerYearOpen]}
                categories={yearLabels}
                xAxisLabel={xAxisLabel}
                yAxisLabel={yAxisLabel}
            />
        </div>
    )
}

export { WorksGraph }
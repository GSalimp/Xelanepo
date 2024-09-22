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

    useEffect(() => {
        async function fetchWorksCount() {
            try {

                const requestWorksPerYear = await fetch(`https://api.openalex.org/works?group_by=publication_year&per_page=200&filter=authorships.author.id:${id}`);
                const requestWorksPerYearData = await requestWorksPerYear.json();

                const requestWorksPerYearOpen = await fetch(`https://api.openalex.org/works?filter=is_oa:true,authorships.author.id:a5106322486&group_by=publication_year:${id}`);
                const requestWorksPerYearOpenData = await requestWorksPerYearOpen.json();
                
                // check if the code of the request is 200
                if (requestWorksPerYear.status !== 200 || requestWorksPerYearOpen.status !== 200) {
                    console.error("Error fetching data");
                    return;
                }


                let tmpCountList = [];
                requestWorksPerYearData.group_by.forEach(element => {
                    tmpCountList.push(element.count);
                });
                setWorksPerYear({count: tmpCountList, name: "Total"});

                tmpCountList = [];
                requestWorksPerYearOpenData.group_by.forEach(element => {
                    tmpCountList.push(element.count);
                });
                setWorksPerYearOpen({count: tmpCountList, name: "Open"});

                let tmpYearLabels = [];
                requestWorksPerYearData.group_by.forEach(element => {
                    tmpYearLabels.push(element.key);
                });
                setYearLabels(tmpYearLabels);

            } catch (error) {
                console.error(error);
            }
        }
        fetchWorksCount();
    }, [id]);

    // const seriesData = [
    //     {
    //         name: "Abertos",
    //         data: [28, 29, 33, 36, 32, 32, 33]
    //     },
    //     {
    //         name: "Total",
    //         data: [12, 11, 14, 18, 17, 13, 13]
    //     }
    // ];

    // const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    const xAxisLabel = 'Numero de Trabalhos';
    const yAxisLabel = 'Anos';

    if ((worksPerYear.length === 0  || worksPerYearOpen.length === 0) && !(worksPerYear || worksPerYearOpen))
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
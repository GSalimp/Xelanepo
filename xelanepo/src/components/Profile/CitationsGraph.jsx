import React, { useState, useEffect } from "react";

import { LineChart } from "./LineChart";

// https://api.openalex.org/works?group_by=publication_year&per_page=200&filter=authorships.author.id:a5106322486 = WORKs Per Year
// https://api.openalex.org/works?filter=is_oa:true,authorships.author.id:a5106322486&group_by=publication_year = WORKs Per Year Open Access

function CitationsGraph({ counts_by_year }) {
    // const { id } = useParams();  
    const [citationsPerYear, setCitationsPerYear] = useState({});
    const [yearLabels, setYearLabels] = useState([]);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        let tmpYear = []
        let tmpCitations = []
        counts_by_year.forEach(element => {
            tmpYear.push(element.year)
            tmpCitations.push(element.cited_by_count)
        });
        setYearLabels(tmpYear)
        setCitationsPerYear({data: tmpCitations, name: "Citações"})
        setFlag(true)
    },[counts_by_year])

    if (!flag) {
        return (
            <div className="WorksGraph profileItem">
                <span>WorksGraph</span>
                <p>Loading...</p>
            </div>
        )
    }

    const yAxisLabel = 'Numero de Citações';
    const xAxisLabel = 'Anos';

    return (
        <div className="WorksGraph profileItem">
            <span>WorksGraph</span>
            <LineChart
                series={[{ ...citationsPerYear, data: citationsPerYear.data.slice().reverse() }]}
                categories={yearLabels.slice().reverse()}
                xAxisLabel={xAxisLabel}
                yAxisLabel={yAxisLabel}
            />
        </div>
    )
}

export { CitationsGraph }
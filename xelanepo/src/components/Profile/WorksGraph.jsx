import React from "react";
import { useParams } from "react-router-dom";

import { LineChart } from "./LineChart";

function WorksGraph() {
    // const { id } = useParams();  
    const seriesData = [
        {
            name: "Abertos",
            data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
            name: "Total",
            data: [12, 11, 14, 18, 17, 13, 13]
        }
    ];

    const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const xAxisLabel = 'Numero de Trabalhos';
    const yAxisLabel = 'Anos';

    return (
        <div className="WorksGraph profileItem">
            <span>WorksGraph</span>
            <LineChart
                series={seriesData}
                categories={categories}
                xAxisLabel={xAxisLabel}
                yAxisLabel={yAxisLabel}
            />
        </div>
    )
}

export { WorksGraph }
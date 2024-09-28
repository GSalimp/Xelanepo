import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

import "./../styles/ProfileItens/Languages.css";

const SunburstChart = ({ data, width = 400, radius = 200, color = d3.scaleOrdinal(d3.schemeCategory10) }) => {
    const ref = useRef();

    useEffect(() => {
        d3.select(ref.current).select("svg").remove();

        if (!data || data.length === 0) return;

        const rootData = {
            name: "Languages",
            children: data
        };

        const partition = (data) => d3.partition()
            .size([2 * Math.PI, radius * radius])
            (d3.hierarchy(data)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value));

        const root = partition(rootData);

        const svg = d3.select(ref.current).append("svg")
            .attr("viewBox", `${-radius} ${-radius} ${width} ${width}`)
            .style("max-width", `${width}px`)
            .style("font", "12px sans-serif");

        const label = svg.append("text")
            .attr("text-anchor", "middle")
            .attr("fill", "#888")
            .style("visibility", "hidden");

        label.append("tspan")
            .attr("class", "percentage")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", "-0.1em")
            .attr("font-size", "3em")
            .text("");

        label.append("tspan")
            .attr("class", "language-name")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", "1.5em")
            .text("");

        const arc = d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .padAngle(1 / radius)
            .padRadius(radius)
            .innerRadius(d => Math.sqrt(d.y0))
            .outerRadius(d => Math.sqrt(d.y1));

        const path = svg.append("g")
            .selectAll("path")
            .data(root.descendants().filter(d => d.depth && d.x1 - d.x0 > 0.001))
            .join("path")
            .attr("fill", d => color(d.data.name))
            .attr("d", arc);

        svg.append("g")
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .on("mouseleave", () => {
                path.attr("fill-opacity", 1);
                label.style("visibility", "hidden");
            })
            .selectAll("path")
            .data(root.descendants().filter(d => d.depth && d.x1 - d.x0 > 0.001))
            .join("path")
            .attr("d", arc)
            .on("mouseenter", (event, d) => {
                const sequence = d.ancestors().reverse().slice(1);
                path.attr("fill-opacity", node => (sequence.indexOf(node) >= 0 ? 1.0 : 0.3));
                const percentage = ((100 * d.value) / root.value).toPrecision(3);
                label.style("visibility", null)
                    .select(".percentage").text(percentage + "%");
                label.select(".language-name").text(d.data.name);
            });

    }, [data, radius, width, color]);

    return <div ref={ref}></div>;
};

const Legend = ({ languages }) => {
    if (languages.length === 0) return null;

    const total = languages.reduce((sum, lang) => sum + lang.value, 0);
    const reducedLanguages = languages.filter(lang => lang.value > 0);

    return (
        <div className="legend">
            {reducedLanguages.map((lang, index) => {
                const percentage = ((lang.value / total) * 100).toFixed(2);
                return (
                    <div key={index} className="legend-item">
                        <span
                            className="legend-color"
                            style={{ backgroundColor: lang.color }}
                        ></span>
                        <span className="legend-name">{lang.name}</span>
                        <span className="legend-count">{lang.value} articles</span>
                        <span className="legend-percentage">({percentage}%)</span>
                    </div>
                );
            })}
        </div>
    );
};

function Languages({ id }) {
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        async function fetchLanguages() {
            try {
                const request = await fetch(`https://api.openalex.org/works?group_by=language&per_page=200&filter=authorships.author.id:${id}`);
                const requestData = await request.json();

                let tmpList = [];
                requestData.group_by.forEach((element, index) => {
                    tmpList.push({ 
                        name: element.key_display_name, 
                        value: element.count, 
                        color: d3.schemeCategory10[index % 10]  // Assign colors dynamically
                    });
                });
                setLanguages(tmpList);
            } catch (error) {
                console.error(error);
            }
        }

        fetchLanguages();
    }, [id]);

    if (languages.length === 0 || languages.every(lang => lang.value === 0))
        return (
            <div className="Languages profileItem">
                <div className="loading">
                    <span>Loading...</span>
                </div>
            </div>
        );

    return (
        <div className="Languages profileItem">
            <span>Languages</span>
            <div className="languageChart">
                <SunburstChart data={languages} />
                <Legend languages={languages} />
            </div>
        </div>
    );
}

export { Languages };

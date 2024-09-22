import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import "./../styles/ProfileItens/Topics.css";

function TopicsCard(topic){
    return (
        <div className="topic-card" key={topic.key_display_name}>
            <div className="title">{topic.key_display_name}</div>
            <div className="number">{topic.count}</div>
        </div>
    )
}


// https://api.openalex.org/works?group_by=primary_topic.id&per_page=200&filter=authorships.author.id:a5010062957

function Topics({id}){
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        async function fetchTopics() {
            try {
                const request = await fetch(`https://api.openalex.org/works?group_by=primary_topic.id&per_page=200&filter=authorships.author.id:${id}`);
                const requestData = await request.json();
                setTopics(requestData.group_by);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTopics();
    }, [id]);

    // const { id } = useParams();  
    if (topics.length === 0)
        return (
          <div className="Topics profileItem">
            <div className="loading">
              <span>Loading...</span>
            </div>
          </div>
        );

    return (
        <div className="Topics profileItem">
            <span>Topics</span>
            <div className="topics-itens">
                {topics.map((topic) => TopicsCard(topic))}
            </div>
        </div>
    )
}

export {Topics}
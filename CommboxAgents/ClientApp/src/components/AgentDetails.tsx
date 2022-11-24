import * as React from 'react';
import { IAgent } from '../interfaces/IAgent';
import {  useAppSelector } from '../store/dataStore';


interface AgentDetailsProps {
    agent: IAgent;
}

const AgentDetails: React.FC<{ props: AgentDetailsProps }> = ({ props }) => {

    const MarkedAgentID = useAppSelector(dataStore => dataStore.MarkedAgentID);
    
    return (
        <div className={`w-68 relative bottom-24 right-6 ${props.agent.agentID === MarkedAgentID ? "border-rose-600 border-4" : ""}`}>
            <div className="rounded bg-white p-2">
                <div className="text-xl font-bold">{props.agent.name}</div>
                <div className="text-lg">Skills : {props.agent.skills.map((skill, index) => { return <span key={index}>{skill.name} {props.agent.skills.length === index + 1 ? "" : ","}</span> })}</div>
            </div>

            <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f575-1f3fd.svg" alt="Girl in a jacket" width="40" height="60"/>
        </div>

    );
};

export default AgentDetails;

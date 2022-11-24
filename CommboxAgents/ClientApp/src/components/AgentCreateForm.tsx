import * as React from 'react';
import { useEffect, useState } from "react";
import { CreateAgent } from '../services/dataService';
import { useAppDispatch } from '../store/dataStore';


interface AgentCreateFormProps {
    locationLat: number;
    locationLng: number;
    close: () => void;
}

const AgentCreateForm: React.FC<{ props: AgentCreateFormProps }> = ({ props }) => {

    const [agentName, setAgentName] = useState("");
    const [agentSkills, setAgentSkills] = useState("");
    const dispatch = useAppDispatch();

    const onClickPost = () => {
        CreateAgent(agentName, agentSkills, props.locationLat, props.locationLng, dispatch, props.close);
    };

    useEffect(() => {
        //empty agent name & skills when location is changed
        setAgentName("");
        setAgentSkills("");
    }, [props.locationLat, props.locationLng])

    return (
        <div className="text-lg w-64 p-2 bg-white rounded"  ref={ref => ref && google.maps.OverlayView.preventMapHitsFrom(ref)} >
            <div className="flex items-center justify-between text-2xl font-bold">
                <h1>Create Agent</h1>
                <div onClick={props.close}>X</div>
            </div>
                <input className="w-full border border-gray-400 rounded p-2 mt-2" type="text" value={agentName} placeholder="Agent Name" onChange={(evt) => setAgentName(evt.target.value)} />
                <input className="w-full border border-gray-400 rounded p-2 mt-2" type="text" value={agentSkills} placeholder="Agent Skills" onChange={(evt) => setAgentSkills(evt.target.value)} />
                <div className="w-full flex items-center mt-2">
                    <button type="button"
                    className="w-full btn btn-lg border border-blue-400 bg-blue-400 font-bold text-white"
                        onClick={onClickPost}>
                        Create
                    </button>
                </div>

            </div>
    );
};

export default AgentCreateForm;

import * as React from 'react';
import { useEffect, useState } from "react";
import { GetSkilledAgents, SetClosestAgent } from '../services/logicService';
import { useAppDispatch, useAppSelector, rootActions } from '../store/dataStore';


interface AgentSearchFormProps {
    locationLat: number;
    locationLng: number;
    close: () => void
}

const AgentSearchForm: React.FC<{ props: AgentSearchFormProps }> = ({ props }) => {

    const [agentSkills, setAgentSkills] = useState("");

    const Agents = useAppSelector(dataStore => dataStore.Agents);
    const dispatch = useAppDispatch();

    const onClickSearch = () => {
        let skilledAgents = GetSkilledAgents(agentSkills, Agents);
        if (skilledAgents.length === 0) {
            alert("not found");
            dispatch(
                rootActions.main({ MarkedAgentID: 0 })
            );
        } else {
            SetClosestAgent(props.locationLat, props.locationLng, skilledAgents, dispatch);
        }
    };

    useEffect(() => {
        //empty agent skills when location is changed
        setAgentSkills("");
    }, [props.locationLat, props.locationLng])

    return (
        <div className="text-lg w-64 p-2 bg-white rounded" ref={ref => ref && google.maps.OverlayView.preventMapHitsFrom(ref)} >
            <div className="flex items-center justify-between text-2xl font-bold">
                <h1>Search Agent</h1>
                <div onClick={props.close}>X</div>
            </div>
            <input className="w-full border border-gray-400 rounded p-2 mt-2" type="text" value={agentSkills} placeholder="Agent Skills" onChange={(evt) => setAgentSkills(evt.target.value)} />
            <div className="w-full flex items-center mt-2">
                <button type="button"
                    className="w-full btn btn-lg border border-blue-400 bg-blue-400 font-bold text-white"
                    onClick={onClickSearch}>
                    Search
                </button>
            </div>

            </div>
    );
};

export default AgentSearchForm;

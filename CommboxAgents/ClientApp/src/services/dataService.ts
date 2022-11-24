import { IAgent } from "../interfaces/IAgent";
import { rootActions } from "../store/dataStore";

export const SetAllAgentsData = (dispatch:any) => {

    fetch("/api/agents")
        .then(response => response.json() as Promise<IAgent[]>)
        .then(data => {

            dispatch(
                rootActions.main({ Agents: data as IAgent[] }) 
            );
    });
}
export const CreateAgent = (agentName: string, agentSkills: string, locationLat: number, locationLng: number, dispatch: any, close :() => void) => {
    fetch('/api/agents/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": agentName,
            "skills": agentSkills,
            "locationLat": locationLat,
            "locationLng": locationLng
        }),
    })
        .then(response => response.json())
        .then(data => {
            SetAllAgentsData(dispatch);
            close();
        });
};
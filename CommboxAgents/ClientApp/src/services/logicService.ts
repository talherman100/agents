import { IAgent } from "../interfaces/IAgent";
import { rootActions } from "../store/dataStore";

//Helper function for getDistance
const rad =  (x : any) =>  {
    return x * Math.PI / 180;
};
//Input : two positions.
//Output : distance in meters.
const getDistance =  (p1lat: number, p1lng: number, p2lat: number, p2lng: number) => {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2lat - p1lat);
    var dLong = rad(p2lng - p1lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1lat)) * Math.cos(rad(p2lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};

///Input :  position & agent array.
///Sets MarkedAgentID for the closest agent on the map.
export const SetClosestAgent = (positionlat: number, positionlng: number, Agents: IAgent[], dispatch:any) => {
    let currentAgentIndex = -1;
    let shortestHaversineDistance = Number.MAX_VALUE;
    for (var index = 0; index < Agents.length; index++) {
        let currentDistance = getDistance(Agents[index].location.lat, Agents[index].location.lng, positionlat,positionlng);

        if (currentDistance < shortestHaversineDistance) {
            shortestHaversineDistance = currentDistance;
            currentAgentIndex = index;
        }
    }

    dispatch(
        rootActions.main({ MarkedAgentID: Agents[currentAgentIndex].agentID })
    );
}
///Input :  skills string & agent array.
///Output : agent array  --> all agents with needed skills.
export const GetSkilledAgents = (skills:string, Agents: IAgent[]) => {
    let skilledAgents = [] as IAgent[];
    let skillsArray = skills.split(',');
    skillsArray = skillsArray.map(skill => skill.trim());
    
    Agents.forEach(agent => {
        let isSkilled = true;
        skillsArray.forEach(neededSkill => {
            isSkilled = isSkilled && agent.skills.filter(skill => neededSkill === skill.name).length > 0;
        });
        if (isSkilled) {
            skilledAgents.push(agent);
        }
    });
    return skilledAgents;
}

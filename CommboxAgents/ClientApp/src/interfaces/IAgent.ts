import { IAgentSkill } from "./IAgentSkill";
import { ILocation } from "./ILocation";

export interface IAgent {
    agentID: number;
    name: string;
    skills: IAgentSkill[];
    location: ILocation;
}

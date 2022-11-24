import { createSlice, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IAgent } from '../interfaces/IAgent';

export interface IIndexable<T = any> { [key: string]: T }

export interface StateInterface extends IIndexable {
    Agents: IAgent[];
    MarkedAgentID: number;
}

const initialState: StateInterface = {
    Agents: [] as IAgent[],
    MarkedAgentID:0
}

const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        main(state: any, action : any) {
            return {
                ...state,
                ...action.payload,
            };
        }
    }
});

const dataStore = configureStore({
    reducer: rootSlice.reducer,
});

export const rootActions = rootSlice.actions;
export default dataStore;

export type RootState = ReturnType<typeof dataStore.getState>;
export type AppDispatch = typeof dataStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

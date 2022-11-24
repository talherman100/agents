import { Data, GoogleMap, OverlayViewF, OVERLAY_MOUSE_TARGET, useJsApiLoader } from '@react-google-maps/api';
import * as React from 'react';
import {  useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IAgent } from '../interfaces/IAgent';
import { SetAllAgentsData } from '../services/dataService';
import { useAppDispatch, useAppSelector } from '../store/dataStore';
import AgentCreateForm from './AgentCreateForm';
import AgentDetails from './AgentDetails';
import AgentSearchForm from './AgentSearchForm';


const center: google.maps.LatLngLiteral = {
    lat: 38.805470223177466,
    lng: -118.76220703125,
}

const Home = () => {

    const Agents = useAppSelector(dataStore => dataStore.Agents);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDah3_SsWrO4YgRY3X0m_b277tvzTjLX9Y" ///Move the key to appsettings
    })
    const [latValue, setLatValue] = useState<number>(42.169692904298415);
    const [lngValue, setLngValue] = useState<number>(-117.0454257677287);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const [showSearchForm, setShowSearchForm] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const onClickFunc = (...args: any[]) => {
        //set current position
        setLatValue(args[0].latLng.lat());
        setLngValue(args[0].latLng.lng());

        setShowCreateForm(true);
        setShowSearchForm(false);
    }
    const onRightClickFunc = (...args: any[]) => {
        //set current position
        setLatValue(args[0].latLng.lat());
        setLngValue(args[0].latLng.lng());

        setShowSearchForm(true);
        setShowCreateForm(false);
    }
    useEffect(() => {
        ///On Page Load : Get all agents data
        SetAllAgentsData(dispatch);
    }, []);
    return isLoaded ? (
        <div className='h-screen w-full'>
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                zoom={5}
                center={center}
                onClick={onClickFunc}
                onRightClick={onRightClickFunc}
            >
                   {showCreateForm &&
                        <OverlayViewF
                            position={{
                                lat: latValue,
                                lng: lngValue,
                            }}
                            zIndex={1}
                            mapPaneName={OVERLAY_MOUSE_TARGET}
                        >
                            <AgentCreateForm props={{ locationLat: latValue, locationLng: lngValue, close: () => setShowCreateForm(false) }} />
                        </OverlayViewF>
                }
                {showSearchForm &&
                    <OverlayViewF
                        position={{
                            lat: latValue,
                            lng: lngValue,
                        }}
                        zIndex={1}
                        mapPaneName={OVERLAY_MOUSE_TARGET}
                    >
                        <AgentSearchForm props={{ locationLat: latValue, locationLng: lngValue, close: () => setShowSearchForm(false) }} />
                    </OverlayViewF>
                }
                {Agents.map((agent : IAgent, index : number) => {
                    return <div key={index}>
                        <OverlayViewF
                            position={{
                                lat: agent.location.lat,
                                lng: agent.location.lng,
                            }}
                            mapPaneName={OVERLAY_MOUSE_TARGET}
                        >
                            <AgentDetails props={{ agent: agent }} />

                        </OverlayViewF>
                    </div>

                })}


            </GoogleMap>

        </div>
    ):<></>
};

export default connect()(Home);

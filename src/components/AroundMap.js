import React from 'react';
import {POS_KEY} from "../constants";
import { AroundMarker } from "./AroundMarker";

import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

class AroundMap extends React.Component {


    render() {
        const pos = JSON.parse(localStorage.getItem(POS_KEY));

        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: pos.lat, lng: pos.lon }}
            >
                <AroundMarker position={{lat: pos.lat, lng: pos.lon}}/>
                <AroundMarker position={{lat: pos.lat - 0.1, lng: pos.lon - 0.1}}/>
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
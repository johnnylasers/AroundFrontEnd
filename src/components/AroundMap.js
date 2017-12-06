import React from 'react';
import {POS_KEY} from "../constants";
import { AroundMarker } from "./AroundMarker";

import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

class AroundMap extends React.Component {
    onDragEnd = () => {
        const center = this.map.getCenter();
        const position = { lat: center.lat(), lon: center.lng() };
        localStorage.setItem(POS_KEY, JSON.stringify(position));
        this.props.loadNearbyPosts();
    }
    getMapRef = (map) => {
        this.map = map;
    }
    render() {
        const pos = JSON.parse(localStorage.getItem(POS_KEY));

        return (
            <GoogleMap
                ref = {this.getMapRef}
                onDragEnd = {this.onDragEnd}
                defaultZoom={10}
                defaultCenter={{ lat: pos.lat, lng: pos.lon }}
            >
                {this.props.posts ? this.props.posts.map((post, index) =>
                    <AroundMarker
                        key={`${index}-${post.user}-${post.url}`}
                        post={post}/>) : null}
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
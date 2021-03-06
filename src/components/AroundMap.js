import React from 'react';
import {POS_KEY} from "../constants";
import { AroundMarker } from "./AroundMarker";

import {withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps';

class AroundMap extends React.Component {
    reloadMarkers = () => {
        const center = this.map.getCenter();
        const position = { lat: center.lat(), lon: center.lng() };
        localStorage.setItem(POS_KEY, JSON.stringify(position));
        this.props.loadNearbyPosts(position, this.getRange());
    }

    getRange = () => {
        const google = window.google;
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        if (center && bounds) {
            const ne = bounds.getNorthEast();
            const right = new google.maps.LatLng(center.lat(), ne.lng());
            return 0.000621371192 * google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
    }

    //等GoogleMap object生成之后传进来；然后这map可以为onDragEnd所用
    getMapRef = (map) => {
        this.map = map;
    }

    render() {
        const pos = JSON.parse(localStorage.getItem(POS_KEY));

        return (
            <GoogleMap
                ref = {this.getMapRef}
                onDragEnd = {this.reloadMarkers}
                onZoomChanged = {this.reloadMarkers}
                defaultZoom={12}
                defaultCenter={{ lat: pos.lat, lng: pos.lon }}
            >
                {this.props.posts ? this.props.posts.map((post, index) =>
                    <AroundMarker
                        //
                        key={`${index}-${post.user}-${post.url}`}
                        post={post}/>) : null}
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));
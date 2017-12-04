import React from 'react';
import $ from 'jquery';

import {API_ROOT, GEO_OPTIONS, POS_KEY, AUTH_PREFIX, TOKEN_KEY} from "../constants";
import { Tabs, Button, Spin } from 'antd';
import { Gallery } from "./Gallery";


const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {
    state = {
        posts: [],
        error: '',
        loadingGeolocation: false,
    }

    componentDidMount() {
        if ("geolocation" in navigator) {
            /* geolocation is available */
            this.setState({loadingGeolocation: true, error: ''});
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeolocation,
                this.onFailLoadGeolocation,
                GEO_OPTIONS,
            );
        } else {
            /* geolocation IS NOT available */
            this.setState({error: "Your browser does not support Geolocation"});

        }
    }

    onSuccessLoadGeolocation = (position) => {
        console.log(position);
        this.setState({loadingGeolocation: false, error:''});
        const {latitude : lat, longitude : lon} = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({lat : lat, lon : lon}));
        this.loadNearbyPosts();
    }

    onFailLoadGeolocation = () => {
        this.setState({loadingGeolocation: false, error: "Failed to load Geolocation"});
    }

    getGalleryPanelContent = () =>  {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        } else if (this.state.loadingGeolocation) {
            return <Spin tip="Loading geo location ..."/>
        } else if (this.state.loadingPosts) {
            return <Spin tip="Loading posts ..."/>
        } else if (this.state.posts) {
            const images = this.state.posts.map((post) => {
                return {
                    user: post.user,
                    src: post.url,
                    thumbnail: post.url,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300,
                    caption: post.message,
                };
            });
            console.log(images);
            return <Gallery images={images}/>
        }
        return null;
    }

    loadNearbyPosts = () => {
        //const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        const {lat, lon} = {"lat":37.5629917,"lon":-122.32552539999998};
        this.setState({ loadingPosts: true });
        return $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
            },
        }).then((response) => {
            this.setState({ posts: response, error: '' });
            console.log(response);
        }, (error) => {
            this.setState({ error: error.responseText });
        }).then(() => {
            this.setState({ loadingPosts: false });
        }).catch((error) => {
            console.log(error);
        });
    }



    render() {

        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Posts" key="1">
                    {this.getGalleryPanelContent()}
                </TabPane>
                <TabPane tab="Maps" key="2">Content of tab2</TabPane>
            </Tabs>
        );
    }
}

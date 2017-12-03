import React from 'react';

import {GEO_OPTIONS, POS_KEY} from "../constants";
import { Tabs, Button, Spin } from 'antd';

const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {
    state = {
        loadingGeolocation: false
    }

    componentDidMount() {
        if ("geolocation" in navigator) {
            /* geolocation is available */
            this.setState({loadingGeolocation: true});
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeolocation,
                this.onFailLoadGeolocation,
                GEO_OPTIONS,
            );
        } else {
            /* geolocation IS NOT available */
            console.log("");
        }
    }

    onSuccessLoadGeolocation = (position) => {
        console.log(position);
        this.setState({loadingGeolocation: false});
        const {latitude : lat, longitude : lon} = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({lat : lat, lon : lon}));
    }

    onFailLoadGeolocation = () => {
        this.setState({loadingGeolocation: false});
    }

    getGalleryPanelContent = () =>  {
        if (this.state.loadingGeolocation) {
            //show spin
            return <Spin tip="Loading Geolocation...."/>
        }
        return null;
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

import React from 'react';

import {GEO_OPTIONS} from "../constants";
import { Tabs, Button } from 'antd';

const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {

    componentDidMount() {
        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeolocation,
                this.onFailLoadGeolocation,
                GEO_OPTIONS,
            );
        } else {
            /* geolocation IS NOT available */
        }
    }

    onSuccessLoadGeolocation = (position) => {
        console.log(position);
    }

    onFailLoadGeolocation = () => {

    }

    render() {

        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Posts" key="1">Content of tab1</TabPane>
                <TabPane tab="Maps" key="2">Content of tab2</TabPane>
            </Tabs>
        );
    }
}

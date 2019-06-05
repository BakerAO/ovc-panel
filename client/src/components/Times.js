import React from 'react';
import axios from '../apis/db';

export default class Times extends React.Component {
    componentDidMount() {
        let times = axios.get('/times');
        console.log(times);
    }

    render() {
        return (
            <div>
                Times
            </div>
        );
    }
}

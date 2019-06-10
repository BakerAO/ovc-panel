import React from 'react';
import axios from '../apis/db';

export default class Times extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            times1: [],
            times2: []
        }
    }

    getTimes = async () => {
        const response1 = await axios.get('/times1');
        this.setState({ times1: response1.data });
        const response2 = await axios.get('/times2');
        this.setState({ times2: response2.data });
    }

    renderTimes1 = () => {
        return this.state.times1.map((time) => {
            return (
                <div className="p-2"
                    key={time}
                    style={{ border: "1px solid black" }}
                >
                    {time}
                </div>
            );
        });
    }

    renderTimes2 = () => {
        return this.state.times2.map((time) => {
            return (
                <div className="p-2"
                    key={time}
                    style={{ border: "1px solid black" }}
                >
                    {time}
                </div>
            );
        });
    }

    componentDidMount() {
        this.getTimes();
    }

    render() {
        let times = this.renderTimes1();
        if (this.props.period === 2) {
            times = this.renderTimes2();
        }

        return (
            <div className="d-flex flex-column">
                {times}
            </div>
        );
    }
}

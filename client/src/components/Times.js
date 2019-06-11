import React from 'react';
import axios from '../apis/db';

export default class Times extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            times: []
        }
    }

    getTimes = async () => {
        const response = await axios.get('/times');
        this.setState({ times: response.data });
    }

    renderTimes = () => {
        return this.state.times.map((time) => {
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
        let times = this.renderTimes();
        return (
            <div className="d-flex flex-column">
                <div className="p-2"
                    style={{ border: "1px solid black" }}
                >
                    Appointment
                </div>
                {times}
            </div>
        );
    }
}

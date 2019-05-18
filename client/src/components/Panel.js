import React from 'react';
import axios from 'axios';
import Grid from './Grid';
import ActiveDoctors from './ActiveDoctors';

export default class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: []
        }
    }

    getDoctors = async () => {
        const response = await axios.get('http://localhost:3001/doctors');
        return response.data;
    }

    setDoctors = async () => {
        const doctors = await this.getDoctors();
        this.setState( { doctors: doctors });
    }

    checkChanges = async () => {
        const doctors1 = await this.getDoctors();
        const doctors2 = this.state.doctors;

        for (let i = 0; i < doctors1.length; i++) {
            for (let j = 0; j < doctors1[i].times.length; j++) {
                if (doctors1[i].times[j] !== doctors2[i].times[j]) {
                    window.location.reload();
                    alert('reload');
                }
            }
        }
    }

    updateActive = async (doctor) => {
        const response = await axios.patch(
            `http://localhost:3001/doctors/${doctor.id}`,
            {active: !doctor.active}
        );
        console.log(response);
        window.location.reload();
    }

    componentDidMount() {
        this.setDoctors();
        this.interval = setInterval(() => this.checkChanges(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                Panel
                <Grid doctors={this.state.doctors} />
                <ActiveDoctors doctors={this.state.doctors} handleClick={this.updateActive} />
            </div>
        );
    };
}

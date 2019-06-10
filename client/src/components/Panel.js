import React from 'react';
import axios from '../apis/db';
import Grid from './Grid';
import ActiveDoctors from './ActiveDoctors';
import Period from './Period';

export default class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            period: 1,
            refresh: false
        }
    }

    getDoctors = async () => {
        const response = await axios.get('/doctors');
        return response.data;
    }

    setDoctors = async () => {
        const doctors = await this.getDoctors();
        this.setState({ doctors: doctors });
    }

    checkChanges = async () => {
        const doctors1 = await this.getDoctors();
        const doctors2 = this.state.doctors;

        for (let i = 0; i < doctors1.length; i++) {
            if (doctors1[i].active !== doctors2[i].active) {
                window.location.reload();
            }

            for (let j = 0; j < doctors1[i].times.length; j++) {
                if (doctors1[i].times[j] !== doctors2[i].times[j]) {
                    window.location.reload();
                }
            }
        }
    }

    updateActive = async (doctor) => {
        await axios.patch(`/doctors/${doctor.id}`,
            { active: !doctor.active }
        );
        this.setState({ refresh: !this.state.refresh });
    }

    updateStatus = async (doctor, time) => {
        if (doctor.times[time] > 4) {
            doctor.times[time] = 0;
        } else {
            doctor.times[time]++;
        }

        await axios.patch(`/doctors/${doctor.id}`,
            { times: doctor.times }
        );

        this.setState({ refresh: !this.state.refresh });
    }

    updatePeriod = () => {
        if (this.state.period === 1) {
            this.setState({ period: 2 });
        } else {
            this.setState({ period: 1 });
        }
    }

    componentDidMount() {
        this.setDoctors();
        this.interval = setInterval(() => this.checkChanges(), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <Grid doctors={this.state.doctors} updateStatus={this.updateStatus} period={this.state.period} />
                <Period handleClick={this.updatePeriod} />
                <ActiveDoctors doctors={this.state.doctors} handleClick={this.updateActive} />
            </div>
        );
    };
}

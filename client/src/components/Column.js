import React from 'react';

export default class Column extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: {
                times: [],
                id: null,
                name: ''
            }
        }
    }

    renderCells = () => {
        const cells = [];
        const doctor = this.state.doctor;
        for (let i = 0; i < doctor.times.length; i++) {
            let color = () => {
                switch (doctor.times[i]) {
                case 0:
                    return 'white';
                case 1:
                    return 'blue';
                case 2:
                    return 'yellow';
                case 3:
                    return 'green';
                case 4:
                    return 'red';
                case 5:
                    return 'grey';
                default:
                    return 'white';
                }
            }

            cells.push(
                <div className="p-2"
                    key={doctor.id + i}
                    style={{
                        border: "1px solid black",
                        backgroundColor: color()
                    }}
                    onClick={() => this.props.updateStatus(doctor, i)}
                >
                    {doctor.times[i]}
                </div>
            );
        }
        return cells;
    }

    componentDidMount() {
        this.setState({ doctor: this.props.doctor });
    }

    render() {
        return (
            <div className="d-flex flex-column" style={{ border: "1px solid black" }}>
                <div className="p-2"
                    style={{ border: "1px solid black" }}
                >
                    {this.state.doctor.name}
                </div>
                {this.renderCells()}
            </div>
        );
    }
}

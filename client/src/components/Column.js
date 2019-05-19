import React from 'react';

export default class Column extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    renderCells = () => {
        const cells = [];
        for (let i = 0; i < this.props.doctor.times.length; i++) {
            cells.push(
                <div className="p-2"
                    key={this.props.doctor.id + i}
                    style={{ border: "1px solid black" }}
                    onClick={() => this.props.updateStatus(this.props.doctor, i)}
                >
                    {this.props.doctor.times[i]}
                </div>
            );
        }
        return cells;
    }

    render() {
        return (
            <div className="d-flex flex-column" style={{ border: "1px solid black" }}>
                <div className="p-2"
                    style={{ border: "1px solid black" }}
                >
                    {this.props.doctor.name}
                </div>
                {this.renderCells()}
            </div>
        );
    }
}

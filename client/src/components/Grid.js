import React from 'react';
import Column from './Column';
import Times from './Times';

export default class Grid extends React.Component {
    renderGrid = () => {
        const grid = [];
        for (let i = 0; i < this.props.doctors.length; i++) {
            if (this.props.doctors[i].active) {
                grid.push(
                    <div className="col" key={this.props.doctors[i].id}>
                        <Column doctor={this.props.doctors[i]} updateStatus={this.props.updateStatus} />
                    </div>
                );
            }
        }

        return grid;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Times />
                    {this.renderGrid()}
                </div>
            </div>
        );
    }
}

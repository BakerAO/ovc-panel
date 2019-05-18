import React from 'react';
import Column from './Column';

export default class Grid extends React.Component {
    renderColumns = () => {
        const grid = [];
        for (let i = 1; i <= this.props.numColumns; i++) {
            grid.push(
                <div className="col">
                    <Column num={i} />
                </div>
            );
        }
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    {this.renderColumns()}
                </div>
            </div>
        );
    }
}

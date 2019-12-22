import React from 'react'
import Column from './Column'
import Times from './Times'

export default class Grid extends React.Component {
  renderGrid = () => {
    const grid = []
    for (let i = 0; i < this.props.doctors.length; i++) {
      if (this.props.doctors[i].active) {
        grid.push(
          <div className="col" key={this.props.doctors[i].id}>
            <Column
              doctor={this.props.doctors[i]}
              updateTimes={this.props.updateTimes}
            />
          </div>
        )
      }
    }
    return grid
  }

  render() {
    return (
      <div className="grid">
        <div className="row">
          <div className="col">
            <Times />
          </div>
          {this.renderGrid()}
        </div>
      </div>
    )
  }
}

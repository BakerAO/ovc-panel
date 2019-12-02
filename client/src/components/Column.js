import React from 'react';

export default class Column extends React.Component {
  renderCells = () => {
    const cells = [];
    const doctor = this.props.doctor;

    for (let i = 0; i < doctor.times.length; i++) {
      let color = () => {
        switch (doctor.times[i]) {
          case 0:
            return 'white'
          case 1:
            return 'red'
          case 2:
            return 'yellow'
          case 3:
            return 'green'
          case 4:
            return 'blue'
          case 5:
            return 'grey'
          default:
            return ''
        }
      }

      cells.push(
        <div className="row"
          key={doctor.id + i}
          style={{
            border: "1px solid black",
            backgroundColor: color(),
            height: '50px'
          }}
          onClick={() => this.props.updateStatus(doctor, i)}
        />
      )
    }
    return cells
  }

  render() {
    return (
      <div className="col">
        <div
          className="row center middle"
          style={{
            border: '1px solid black',
            height: '50px'
          }}
        >
          {this.props.doctor.name}
        </div>
        {this.renderCells()}
      </div>
    )
  }
}

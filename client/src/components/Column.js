import React from 'react'

export default class Column extends React.Component {
  renderCells = () => {
    const cells = []
    const doctor = this.props.doctor

    for (let i = 0; i < doctor?.times?.length; i++) {
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
          case 6:
            return 'orange'
          default:
            return ''
        }
      }

      cells.push(
        <div
          className="row border"
          key={doctor.id + i}
          style={{
            backgroundColor: color(),
            height: '48px'
          }}
          onClick={() => this.props.updateTimes(doctor, i)}
        />
      )
    }
    return cells
  }

  render() {
    return (
        <div className="col">
          <div
            className="row center middle border"
            style={{
              height: '48px',
              textAlign: 'center',
              position: 'sticky',
              top: 0,
              backgroundColor: 'white'
            }}
          >
            {this.props.doctor.name}
          </div>
          {this.renderCells()}
        </div>
    )
  }
}

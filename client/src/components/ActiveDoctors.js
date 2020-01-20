import React from 'react'

export default class ActiveDoctors extends React.Component {
  renderDoctors = () => {
    return this.props.doctors.map(doctor => {
      const color = doctor.active ? 'green' : 'red';
      return (
        <div className="col" key={doctor.id}>
          <button
            className=''
            style={{ backgroundColor: color }}
            type="button"
            onClick={() => this.props.handleClick(doctor)}
          >
            {doctor.name}
          </button>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="grid flex">
        <div className='row'>
          {this.renderDoctors()}
        </div>
      </div>
    )
  }
}

import React from 'react'

export default class ActiveDoctors extends React.Component {
  renderDoctors = () => {
    return this.props.doctors.map(doctor => {
      const color = doctor.active ? '#28a745' : 'red';
      return (
        <div className="col" key={doctor.id}>
          <div className="middle center"
            style={{
              margin: '10px',
              width: '80%',
              height: '50px'
            }}
          >
            <button
              style={{
                backgroundColor: color,
                borderColor: color,
                height: '100%',
                width: '100%',
                fontSize: 25,
                color: '#fff',
                borderRadius: '.25rem',
              }}
              onClick={() => this.props.handleClick(doctor)}
            >
              {doctor.name}
            </button>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="grid flex h-5">
        <div className='row'>
          {this.renderDoctors()}
        </div>
      </div>
    )
  }
}

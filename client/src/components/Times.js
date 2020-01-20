import React from 'react'
import timesJSON from '../times.json'

export default class Times extends React.Component {
  state = {
    times: []
  }

  getTimes = () => {
    const times = timesJSON.times
    this.setState({ times: times })
  }

  renderTimes = () => {
    return this.state.times.map((time) => {
      return (
        <div
          className="row center middle border"
          key={time}
          id={time}
          style={{
            height: '48px'
          }}
        >
          {time}
        </div>
      )
    })
  }

  componentDidMount() {
      this.getTimes()
  }

  render() {
    let times = this.renderTimes()
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
          Appointment
        </div>
        {times}
      </div>
    )
  }
}

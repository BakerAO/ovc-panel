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
          className="row center middle"
          key={time}
          id={time}
          style={{
            border: "1px solid black",
            height: '50px'
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
          className="row center middle"
          style={{
            border: "1px solid black",
            height: '50px'
          }}
        >
          Appointment
        </div>
        {times}
      </div>
    )
  }
}

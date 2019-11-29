import React from 'react'
import api from '../api'

export default class Times extends React.Component {
  state = {
    times: []
  }

  getTimes = async () => {
    const response = await api.get('/times')
    this.setState({ times: response.data })
  }

  renderTimes = () => {
    return this.state.times.map((time) => {
      return (
        <div
          className="p-2"
          key={time}
          id={time}
          style={{ border: "1px solid black", height: '50px' }}
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
      <div className="d-flex flex-column">
        <div
          className="p-2"
          style={{ border: "1px solid black", height: '50px' }}
        >
          Appointment
        </div>
        {times}
      </div>
    )
  }
}

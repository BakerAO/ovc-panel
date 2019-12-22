import React from 'react'
import equal from 'deep-equal'
import api from '../api'
import Grid from './Grid'
import ActiveDoctors from './ActiveDoctors'

export default class Panel extends React.Component {
  state = {
    doctors: [],
    refresh: false
  }

  getDoctors = async () => {
    const response = await api.get('/doctors')
    return response.data
  }

  setDoctors = async () => {
    const doctors = await this.getDoctors()
    for (let i = 0; i < doctors.length; i++) {
      if (doctors[i].times) {
        doctors[i].times = JSON.parse(doctors[i].times)
      }
    }
    if (!equal(doctors, this.state.doctors)) {
      this.setState({ doctors: doctors })
    }
  }

  updateActive = async (doctor) => {
    await api.post('/active', { id: doctor.id, active: !doctor.active })
    let doctors = this.state.doctors.map((doc) => {
      if (doc.id === doctor.id) {
        doc.active = !doc.active
      }
      return doc
    })
    this.setState({ doctors })
  }

  updateTimes = async (doctor, time) => {
    if (doctor.times[time] > 4) doctor.times[time] = 0
    else doctor.times[time]++
    await api.post('/times', { id: doctor.id, times: JSON.stringify(doctor.times) })
    this.setState({ refresh: !this.state.refresh })
  }

  componentDidMount() {
    this.setDoctors()
    this.interval = setInterval(() => this.setDoctors(), 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div>
        <Grid
          doctors={this.state.doctors}
          updateTimes={this.updateTimes}
        />
        <hr />
        <ActiveDoctors
          doctors={this.state.doctors}
          handleClick={this.updateActive}
        />
      </div>
    )
  }
}

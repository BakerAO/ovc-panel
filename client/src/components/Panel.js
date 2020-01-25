import React from 'react'
import equal from 'deep-equal'
import api from '../api'
import Grid from './Grid'
import ActiveDoctors from './ActiveDoctors'
import ResetAll from './ResetAll'

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
        doctors[i].defaultTimes = JSON.parse(doctors[i].default_times)
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
    if (doctor.times[time] > 5) doctor.times[time] = 0
    else doctor.times[time]++
    await api.post('/times', { id: doctor.id, times: JSON.stringify(doctor.times) })
    this.setState({ refresh: !this.state.refresh })
  }

  handleResetAll = async () => {
    const { doctors, refresh } = this.state
    for (let i = 0; i < doctors.length; i++) {
      await api.post('/times', { id: doctors[i].id, times: JSON.stringify(doctors[i].defaultTimes) })
    }
    this.setState({ refresh: !refresh })
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
      <div style={{ width: '100vw', height: '200vh' }}>
        <Grid
          doctors={this.state.doctors}
          updateTimes={this.updateTimes}
        />
        <ActiveDoctors
          doctors={this.state.doctors}
          handleClick={this.updateActive}
        />
        <ResetAll
          handleResetAll={this.handleResetAll}
        />
      </div>
    )
  }
}

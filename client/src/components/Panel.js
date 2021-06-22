import React from 'react'
import clone from 'clone'
import api from '../api'
import socket from '../socket'
import Grid from './Grid'
import ActiveDoctors from './ActiveDoctors'
import ResetAll from './ResetAll'

export default class Panel extends React.Component {
  state = { doctors: [] }

  setDoctors = async () => {
    const response = await api.get('/doctors')
    const doctors = response.data
    for (let i = 0; i < doctors.length; i++) {
      if (doctors[i].times) {
        doctors[i].times = JSON.parse(doctors[i].times)
        doctors[i].default_times = JSON.parse(doctors[i].default_times)
        doctors[i].active = !!doctors[i].active
      }
    }
    this.setState({ doctors })
  }

  updateActive = async (doctor) => {
    await api.post('/active', { id: doctor.id, active: !doctor.active })
  }

  updateTimes = async (doctor, time) => {
    if (doctor.times[time] > 5) doctor.times[time] = 0
    else doctor.times[time]++
    await api.post('/times', { id: doctor.id, times: JSON.stringify(doctor.times) })
  }

  handleResetAll = async () => {
    const { doctors } = this.state
    for (let i = 0; i < doctors.length; i++) {
      await api.post('/times', { id: doctors[i].id, times: JSON.stringify(doctors[i].default_times) })
    }
  }

  componentDidMount() {
    this.setDoctors()
    socket.on('update', (ioDoc) => {
      try {
        const doctors = clone(this.state.doctors)
        for (const i in doctors) {
          if (ioDoc.id === doctors[i].id) {
            if (ioDoc.times) ioDoc.times = JSON.parse(ioDoc.times)
            doctors[i] = { ...doctors[i], ...ioDoc }
          }
        }
        this.setState({ doctors })
      } catch (err) {
        console.log(err)
      }
    })
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

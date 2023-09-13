import React, { useEffect, useState } from 'react'
import api from '../data/api'
import socket from '../data/socket'
import DayChooser from './DayChooser'
import DoctorSelection from './DoctorSelection'
import SaveDefaults from './SaveDefaults'
import ResetAll from './ResetAll'
import Grid from './Grid'

const styles = {
  container: {
    width: '100vw'
  },
  bottomRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0 0 0',
  },
}

export default function App() {
  const [weekday, setWeekday] = useState('monday')
  const [dayValues, setDayValues] = useState([])
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    const getDoctors = async () => {
      const doctorsRes = await api.get('/doctors')
      setDoctors(doctorsRes.data)
    }

    getDoctors()
    socket.on('updateDoctors', (ioDocs) => {
      setDoctors(ioDocs)
    })
    socket.on('activeDay', (ioDay) => {
      setWeekday(ioDay)
    })
    socket.on('updateAllTimes', (ioAllTimes) => {
      setDayValues(ioAllTimes)
    })
    socket.on('updateTime', (ioTime) => {
      const { timeId, doctorId, status } = ioTime
      setDayValues((prev) => {
        return prev.map(dv => {
          if (dv.id === timeId && dv.doctorId === doctorId) {
            return {
              ...dv,
              status
            }
          }
          return dv
        })
      })
    })
  }, [])

  useEffect(() => {
    const getDayValues = async () => {
      const values = await api.get(`/times/${weekday}`)
      setDayValues(values.data)
    }

    getDayValues()
  }, [weekday])

  const activeDoctors = () => {
    return doctors.filter(d => {
      if (d[weekday]) return d[weekday]
      else return false
    })
  }

  return (
    <div style={styles.container}>
      <Grid
        dayValues={dayValues}
        doctors={activeDoctors()}
        weekday={weekday}
      />
      <DoctorSelection
        doctors={doctors}
        weekday={weekday}
      />
      <DayChooser weekday={weekday} />
      <div style={styles.bottomRow}>
        <SaveDefaults weekday={weekday} />
        <ResetAll weekday={weekday} />
      </div>
    </div>
  )
}

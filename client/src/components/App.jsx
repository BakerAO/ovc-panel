import { useEffect, useState } from 'react'
import api from '../data/api'
import socket from '../data/socket'
import DayChooser from './DayChooser'
import DoctorSelection from './DoctorSelection'
import SaveDefaults from './SaveDefaults'
import ResetDay from './ResetDay'
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
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    const getDoctors = async () => {
      const doctorsRes = await api.get('/doctors')
      setDoctors(doctorsRes.data)
    }
    const getActiveDay = async () => {
      const dbDay = await api.get('/active-day')
      setWeekday(dbDay.data)
    }

    getDoctors()
    getActiveDay()

    socket.on('updateDoctors', (ioDocs) => {
      setDoctors(ioDocs)
    })
    socket.on('activeDay', (ioDay) => {
      setWeekday(ioDay)
    })
  }, [])

  const activeDoctors = () => {
    return doctors.filter(d => {
      if (d[weekday]) return d[weekday]
      else return false
    })
  }

  return (
    <div style={styles.container}>
      <Grid
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
        <ResetDay weekday={weekday} />
      </div>
    </div>
  )
}

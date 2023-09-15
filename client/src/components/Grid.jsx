import { useEffect, useState } from 'react'
import api from '../data/api'
import socket from '../data/socket'
import Column from './Column'
import Times from './Times'

const styles = {
  grid: {
    boxSizing: 'border-box',
    height: '80%',
    width: '100%',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
}

export default function Grid(props) {
  const { doctors, weekday } = props
  const [dayValues, setDayValues] = useState([])

  useEffect(() => {
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

  const renderGrid = () => {
    const items = []
    for (const d of doctors) {
      const timeValues = dayValues.filter(dv => dv.doctorId === d.id)
      items.push(
        <div style={styles.column} key={d.id}>
          <Column
            doctor={d}
            timeValues={timeValues}
            weekday={weekday}
          />
        </div>
      )
    }

    return items
  }
  

  return (
    <div style={styles.grid}>
      <div style={styles.container}>
        <div style={styles.column}>
          <Times />
        </div>
        {renderGrid()}
      </div>
    </div>
  )
}

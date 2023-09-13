import React from 'react'
import Button from './common/Button'
import api from '../data/api'

const styles = {
  main: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0 0 0',
  },
  row: {
    width: '90%',
    display: 'flex',
  },
  day: {
    height: '50px',
    width: '100%',
    margin: '0 10px 0 0',
  },
}

export default function DayChooser(props) {
  const { weekday } = props

  const handleClick = (activeDay) => {
    api.post('active-day/', { weekday: activeDay })
  }

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  
  const renderDays = () => {
    const result = [];
    for (const day of days) {
      let color = 'gray'
      if (weekday === day) color = 'blue'
      result.push(
        <div style={styles.day} key={day}>
          <Button
            color={color}
            label={day[0].toUpperCase() + day.slice(1)}
            handleClick={() => handleClick(day)}
            fontSize={17}
          />
        </div>
      )
    }

    return result;
  }

  return (
    <div style={styles.main}>
      <div style={styles.row}>
        {renderDays()}
      </div>
    </div>
  )
}

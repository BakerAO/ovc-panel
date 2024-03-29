import timesJSON from '../data/times.json'

const styles = {
  column: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: '60px',
    width: '100%',
    fontSize: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    border: '1px solid black',
  },
  cell: {
    width: '100%',
    height: '48px',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

export default function Times() {
  const times = timesJSON.times

  const renderTime = (time) => {
    return (
      <div
        key={time}
        id={time}
        style={styles.cell}
      >
        {time}
      </div>
    )
  }

  return (
    <div style={styles.column}>
      <div style={styles.header}>
        Appointment
        <div style={{ height: '10px' }} />
      </div>
      {times.map(t => renderTime(t))}
    </div>
  )
}


import api from '../data/api'

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  header: {
    height: '48px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
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
  },
}

const getColor = (status) => {
  switch (status) {
    case 0:
      return 'white'
    case 1:
      return 'red'
    case 2:
      return 'yellow'
    case 3:
      return 'green'
    case 4:
      return 'blue'
    case 5:
      return 'orange'
    case 6:
      return 'gray'
    default:
      return ''
  }
}

export default function Column(props) {
  const { doctor, timeValues, weekday } = props

  const updateTime = async (timeId, doctorId, status) => {
    await api.post(`/times/${weekday}`, { timeId, doctorId, status})
  }

  const renderCells = () => {
    const cells = []
    for (const tv of timeValues) {
      cells.push(
        <div
          key={`${doctor.id}-${tv.id}`}
          style={{
            ...styles.cell,
            backgroundColor: getColor(tv.status),
          }}
          onClick={() => updateTime(tv.id, doctor.id, tv.status + 1)}
        />
      )
    }
    return cells
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {doctor.name}
      </div>
      {renderCells()}
    </div>
  )
}

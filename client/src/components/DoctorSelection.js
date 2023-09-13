import api from '../data/api'
import Button from './common/Button'

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0 0 0',
  },
  button: {
    height: '50px',
    width: '100%',
    margin: '0 10px 0 0',
  },
  doctorRows: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row'
  }
}

export default function DoctorSelection(props) {
  const { doctors, weekday } = props

  const updateActive = async (doctor) => {
    await api.post('/active', { id: doctor.id, active: !doctor[weekday], weekday })
  }

  const renderDoctors = () => {
    return doctors.map(doctor => {
      const color = doctor[weekday] ? '#28a745' : 'red';
      return (
        <div style={styles.button} key={doctor.id}>
          <Button
            color={color}
            label={doctor.name}
            handleClick={() => updateActive(doctor)}
          />
        </div>
      )
    })
  }

  return (
    <div style={styles.container}>
      <div style={styles.doctorRows}>
        {renderDoctors()}
      </div>
    </div>
  )
}

import Button from './Button'
import api from '../data/api'

const styles = {
  button: {
    height: '50px',
    width: '200px',
    margin: '0 10px 0 0',
  },
}

export default function ResetDay(props) {
  const { weekday } = props

  const handleClick = () => {
    api.post(`reset/${weekday}`)
  }

  return (
    <div style={styles.button}>
      <Button
        color="red"
        label="Reset Day"
        handleClick={handleClick}
      />
    </div>
  )
}

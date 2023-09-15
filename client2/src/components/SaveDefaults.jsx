import Button from './Button'
import api from '../data/api'

const styles = {
  button: {
    height: '50px',
    width: '200px',
    margin: '0 10px 0 0',
  },
}

export default function SaveDefaults(props) {
  const { weekday } = props

  const handleClick = () => {
    api.post(`defaults/${weekday}`)
  }

  return (
    <div style={styles.button}>
      <Button
        color="orange"
        label="Save Defaults"
        handleClick={handleClick}
      />
    </div>
  )
}

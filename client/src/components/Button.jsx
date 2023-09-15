export default function Button(props) {
  let { color, label, handleClick, fontSize } = props

  fontSize = fontSize ?? 25

  return (
    <button
      style={{
        backgroundColor: color,
        borderColor: color,
        height: '100%',
        width: '100%',
        fontSize,
        color: '#fff',
        borderRadius: '.25rem',
      }}
      onClick={() => handleClick()}
    >
      {label}
    </button>
  )
}

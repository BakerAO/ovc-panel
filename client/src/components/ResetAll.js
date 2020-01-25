import React from 'react'

export default class ResetAll extends React.Component {
  render() {
    return (
      <div className="grid flex h-5">
        <div className='row'>
          <div className="col-25" />
          <div className="col-50">
            <div className=""
              style={{
                height: '50px'
              }}
            >
              <button
                style={{
                  backgroundColor: 'red',
                  borderColor: 'red',
                  height: '100%',
                  width: '100%',
                  fontSize: 25,
                  color: '#fff',
                  borderRadius: '.25rem',
                }}
                onClick={() => this.props.handleResetAll()}
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

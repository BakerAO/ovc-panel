import React from 'react';

export default class Period extends React.Component {
    render() {
        return (
            <div className="d-flex justify-content-center">
                <button className="btn btn-warning"
                    type="button"
                    onClick={() => this.props.handleClick()}
                >
                    Change Time Period
                </button>
            </div>
        );
    }
}

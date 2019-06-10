import React from 'react';

export default class Period extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => this.props.handleClick()}>
                    Change Time Period
                </button>
            </div>
        );
    }
}

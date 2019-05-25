import React from 'react';

export default class ActiveDoctors extends React.Component {
    renderDoctors = () => {
        return this.props.doctors.map(doctor => {
            const color = doctor.active ? 'btn btn-success' : 'btn btn-danger';
            return (
                <div className="p-2" key={doctor.id}>
                    <button className={color}
                        type="button"
                        onClick={() => this.props.handleClick(doctor)}
                    >
                        {doctor.name}
                    </button>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="d-flex justify-content-start">
                {this.renderDoctors()}
            </div>
        );
    }
}
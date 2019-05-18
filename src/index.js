import React from 'react';
import ReactDOM from 'react-dom';
import Panel from './components/Panel';

const App = () => {
    return (
        <div>
            <Panel />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);

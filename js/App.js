const React =require('react');
const ReactDOM = require('react-dom');

class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h1>todos</h1>
            </div>
        )
    }
}

ReactDOM.render(React.createElement(App, null, null), document.getElementById("app"));
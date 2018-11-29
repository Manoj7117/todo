const React =require('react');
const ReactDOM = require('react-dom');
import {Header} from "./Header";
import {Input} from "./Input";

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tasks:[]
        }
    }

    addTask(newTask){
        this.setState(prevState=>({
            tasks:prevState.tasks.concat(newTask)
        }));
    }

    render(){
        let e = React.createElement;
        return(
            e('div',null,
                e(Header,null,null),
                e(Input,{change:this.addTask.bind(this)},null),
            )
        )
    }
}

ReactDOM.render(React.createElement(App, null, null), document.getElementById("app"));
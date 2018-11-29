const React =require('react');
const ReactDOM = require('react-dom');
import {Header} from "./Header";
import {Input} from "./Input";
import {TodoTask} from "./TodoTask";

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            nowShowing:'All',
            tasks:[]
        }
    }

    addTask(newTask){
        this.setState(prevState=>({
            tasks:prevState.tasks.concat(newTask)
        }));
    }

    update(currentTask){
        currentTask.isCompleted=!currentTask.isCompleted;
        this.setState({})
    }


    delete(task){
        const index = this.state.tasks.indexOf(task);
        const newTasks = this.state.tasks;
        newTasks.splice(index, 1);
        this.setState({tasks:newTasks})
    }


    render(){
        let e = React.createElement;
        let tasksList;
        let taskList;
        if(this.state.tasks.length) {
            taskList = this.state.tasks.filter(task => {
                switch (this.state.nowShowing) {
                    case 'Active':return !task.isCompleted;
                    case 'Completed':return task.isCompleted;
                    case 'All':return true
                }
            });

            tasksList = taskList.map((task) =>
                e(TodoTask, {
                    key: task.tid, task: task, update: this.update.bind(this, task),
                    delete: this.delete.bind(this, task)}, null)
            );
        }

         return(
            e('div',null,
                e(Header,null,null),
                e(Input,{change:this.addTask.bind(this)},null),
                e('section',{className:"main"},
                    e('ul',{className:"todo-list"},tasksList),
                )
            )
        )
    }
}

ReactDOM.render(React.createElement(App, null, null), document.getElementById("app"));
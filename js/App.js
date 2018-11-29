const React =require('react');
const ReactDOM = require('react-dom');
import {Header} from "./Header";
import {Input} from "./Input";
import {TodoTask} from "./TodoTask";
import {TodoActions} from "./TodoActions";

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

    show(action){
        this.setState({nowShowing:action.target.text})
    }

    clearCompleted(){
        const activeTasks = this.state.tasks.filter(task => {
            return !task.isCompleted;
        });
        this.setState({tasks:activeTasks})
    }

    toggleAll(event){
        const allTasks = this.state.tasks.map((task) => {
            task.isCompleted = event.target.checked;
            return task
        });
        this.setState({tasks:allTasks})
    }


    render(){
        let e = React.createElement;
        let tasksList;
        let taskList;
        let todoActions;
        let count=0;
        let toggleAll;
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

            this.state.tasks.map(task=>{
                if(task.isCompleted){
                    count=count+1;
                }
            });

            let activeTasks=this.state.tasks.length-count;

            todoActions = e(TodoActions,{completedTasks:count,activeTasks:activeTasks,show:this.show.bind(this),
                clearCompleted:this.clearCompleted.bind(this),nowShowing:this.state.nowShowing,},null);

            toggleAll=e('input',{id:"toggle-all",className:"toggle-all",checked:count===this.state.tasks.length,
                onChange:this.toggleAll.bind(this),type:"checkbox"},null);
        }

         return(
            e('div',null,
                e(Header,null,null),
                e(Input,{change:this.addTask.bind(this)},null),
                e('section',{className:"main"},
                    toggleAll,
                    e('label',{htmlFor:"toggle-all"},null),
                    e('ul',{className:"todo-list"},tasksList),),
                e('div',null,todoActions)
            )
        )
    }
}

ReactDOM.render(React.createElement(App, null, null), document.getElementById("app"));
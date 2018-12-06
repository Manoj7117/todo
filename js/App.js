const React =require('react');
const ReactDOM = require('react-dom');
import {Header} from "./Header";
import {Input} from "./Input";
import {TodoTask} from "./TodoTask";
import {TodoActions} from "./TodoActions";
import firebase from './firebase.js';

const db = firebase.database();
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            nowShowing:'All',
            tasks:[]
        }
    }

    componentDidMount(){
        const taskRef=db.ref('tasks');
        taskRef.on('value', (data) => {
            let taskData = data.val();
            let tempTasks=[];
            for (let taskID in taskData) {
                tempTasks.push({
                    tid:taskID,
                    taskName: taskData[taskID].taskName,
                    isCompleted: taskData[taskID].isCompleted
                });
            }
            this.setState({tasks:tempTasks})
        });
    }

    addTask(newTask){
        db.ref('tasks').push(newTask);
    }

    update(currentTask){
        currentTask.isCompleted=!currentTask.isCompleted;
        db.ref('tasks').child(currentTask.tid).update(currentTask)
    }


    delete(task){
        const tasksRef = db.ref(`tasks/${task.tid}`);
        tasksRef.remove();
    }

    show(action){
        this.setState({nowShowing:action.target.text})
    }

    clearCompleted(){
        this.state.tasks.filter(task => {
            if(task.isCompleted) {
                db.ref(`tasks/${task.tid}`).remove();
            }
        });
    }

    toggleAll(event){
        this.state.tasks.map((task) => {
            task.isCompleted = event.target.checked;
            db.ref('tasks').child(task.tid).update(task);
        });
    }

    showingTasks(){
       let tasks= this.state.tasks.filter(task => {
            switch (this.state.nowShowing) {
                case 'Active':return !task.isCompleted;
                case 'Completed':return task.isCompleted;
                case 'All':return true
            }
        });
       return tasks;
    }

    completedTaskCount(){
        let count=0;
        this.state.tasks.map(task=>{
            if(task.isCompleted){
                count=count+1;
            }
        });
        return count;
    }

    render(){
        let e = React.createElement;
        let taskList,todoActions,toggleAll;
        if(this.state.tasks.length) {
            let tasks = this.showingTasks();
            let completedTaskCount=this.completedTaskCount();
            let activeTaskCount=this.state.tasks.length-completedTaskCount;

            taskList = tasks.map((task) => e(TodoTask, {
                key:task.tid, task:task, update:this.update.bind(this,task), delete:this.delete.bind(this,task)}, null));

            todoActions = e(TodoActions,{completedTaskCount:completedTaskCount, activeTaskCount:activeTaskCount,
                show:this.show.bind(this), clearCompleted:this.clearCompleted.bind(this),
                nowShowing:this.state.nowShowing,},null);

            toggleAll=e('input',{id:"toggle-all",className:"toggle-all",onChange:this.toggleAll.bind(this),
                type:"checkbox", checked:completedTaskCount===this.state.tasks.length},null);
        }
        return(
            e('div',null,
                e(Header,null,null),
                e(Input,{addTask:this.addTask.bind(this)},null),
                e('section',{className:"main"},
                    toggleAll,
                    e('label',{htmlFor:"toggle-all"},null),
                    e('ul',{className:"todo-list"},taskList),),
                e('div',null,todoActions)
            )
        )
    }
}

ReactDOM.render(React.createElement(App, null, null), document.getElementById("app"));
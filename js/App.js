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
            let tasks = data.val();
            let newState=[];
            for (let taskID in tasks) {
                newState.push({
                    tid:taskID,
                    taskName: tasks[taskID].taskName,
                    isCompleted: tasks[taskID].isCompleted
                });
            }
            this.setState({tasks:newState})
        });
    }

    addTask(newTask){
        this.setState(prevState=>({
            tasks:prevState.tasks.concat(newTask)
        }));
        db.ref('tasks').push(newTask);
    }

    update(currentTask){
        currentTask.isCompleted=!currentTask.isCompleted;
        this.setState({});
        db.ref('tasks').child(currentTask.tid).update(currentTask)
    }


    delete(task){
        const index = this.state.tasks.indexOf(task);
        const newTasks = this.state.tasks;
        newTasks.splice(index, 1);
        this.setState({tasks:newTasks});
        const tasksRef = db.ref(`tasks/${task.tid}`);
        tasksRef.remove();
    }

    show(action){
        this.setState({nowShowing:action.target.text})
    }

    clearCompleted(){
        const activeTasks = this.state.tasks.filter(task => {
            if(task.isCompleted){
                const tasksRef = db.ref(`tasks/${task.tid}`);
                tasksRef.remove();
            }
            return !task.isCompleted;
        });
        this.setState({tasks:activeTasks})
    }

    toggleAll(event){
        const allTasks = this.state.tasks.map((task) => {
            task.isCompleted = event.target.checked;
            db.ref('tasks').child(task.tid).update(task);
            return task
        });
        this.setState({tasks:allTasks})
    }

    changeName(task,event){
        task.taskName=event.target.value;
        this.setState({})
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
                    key: task.tid, task: task, update: this.update.bind(this, task)
                    ,changeName:this.changeName.bind(this,task),delete: this.delete.bind(this, task)}, null)
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
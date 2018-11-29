const React = require('react');

export class TodoTask extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            taskName:this.props.task.taskName,
            isEditing:false,
        };
        this.editTask=this.editTask.bind(this);
        this.changeData=this.changeData.bind(this);
        this.keyPress=this.keyPress.bind(this);
        this.update=this.update.bind(this);
    }

    editTask(){
        this.setState({isEditing:true})
    }

    changeData(event){
        this.setState({taskName:event.target.value})
    }

    keyPress(event){
        console.log(event.which)
        if (event.which === 27) {
            this.setState({taskName: this.props.task.taskName});
            console.log(event.which)
            this.setState({isEditing:false})
        } else if (event.which === 13) {
            this.update();
        }
    }

    update() {
        if (this.state.taskName) {
            this.changeName(this.props.task);
        } else {
            this.props.delete();
        }
        console.log("manoj")
        this.setState({isEditing:false})
    }

    changeName(task){
        task.taskName=this.state.taskName;
        this.setState({isEditing:false});
    }

    render(){
        let e = React.createElement;
        let editing=(this.state.isEditing===true?"editing":"");
        let completed=(this.props.task.isCompleted===true?"completed":"");

        return(
            e('li',{className:`${editing} ${completed}`},
                e('div',{className:"view"},
                    e('input',{id:'checkbox',className:"toggle",type:"checkbox",
                        checked:this.props.task.isCompleted, onChange:this.props.update},null),
                    e('label',{onDoubleClick:this.editTask}, this.props.task.taskName),
                    e('button',{className:"destroy",onClick:this.props.delete},null)
                ),
                e('input',{ref:"editField",className:"edit",value:this.state.taskName,onBlur:this.update,
                    onChange:this.changeData,onKeyDown:this.keyPress},null)
            )
        )
    }
}
const React = require('react');

export class TodoTask extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        let e = React.createElement;
        let completed=(this.props.task.isCompleted===true?"completed":"");
        return(
            e('li',{className:`${completed}`},
                e('div',{className:"view"},
                    e('input',{id:'checkbox',className:"toggle",type:"checkbox",
                        checked:this.props.task.isCompleted, onChange:this.props.update},null),
                    e('label',null, this.props.task.taskName),
                    e('button',{className:"destroy",onClick:this.props.delete},null)
                )
            )
        )
    }
}
const React = require('react')

export class TodoActions extends React.Component {

    render(){
        let e=React.createElement;
        let clearCompleted;
        let tasks=this.props.activeTasks===1? " item" :" items";
        if(this.props.completedTasks) {
            clearCompleted = e('button',{ value:"clear-completed",className:"clear-completed",
                onClick:this.props.clearCompleted},'ClearCompleted')
        }
        return (
            e('footer',{className:"footer"},
                e('span',{className:"todo-count"},e('strong',null,this.props.activeTasks+tasks+" left"),),
                e('ul',{className:"filters"},
                    e('li',null,e('a',{onClick:this.props.show},"All")),
                    e('li',null,e('a',{onClick:this.props.show},"Active")),
                    e('li',null,e('a',{onClick:this.props.show},"Completed"))
                ),
                clearCompleted
            )
        )
    }
}
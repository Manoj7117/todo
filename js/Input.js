const React =require('react');

export class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {taskName:''};

        this.handleChange = this.handleChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }

    handleChange(event) {
        this.setState({taskName: event.target.value});
    }

    keyPress(pressedKey) {
        if (pressedKey.keyCode === 13) {
            const task = {
                taskName: this.state.taskName,
                isCompleted: false
            };

            if(task.taskName) {
                this.props.change(task);
            }
            this.setState({taskName:''})
        }
    }

    render() {
        const inputProps = {
            className: "new-todo",
            autoFocus: true,
            value: this.state.taskName,
            onKeyDown: this.keyPress,
            onChange: this.handleChange,
            placeholder: "Enter new task"
        };
        return (
            React.createElement('input',inputProps,null)
        )
    }
}
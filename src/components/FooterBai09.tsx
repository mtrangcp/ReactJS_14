import { Component } from "react";

interface Todo {
  id: number;
  content: string;
  isDone: boolean;
}

type PropsType = {
  todos: Todo[];
};

export default class FooterBai09 extends Component<PropsType> {
  render() {
    return (
      <div className="footer">
        <div className="task-counter">
          Công việc đã hoàn thành:{" "}
          <span className="counter-number">
            {this.props.todos.filter((el) => el.isDone).length}
          </span>{" "}
          /<span className="counter-number">{this.props.todos.length}</span>{" "}
        </div>
      </div>
    );
  }
}

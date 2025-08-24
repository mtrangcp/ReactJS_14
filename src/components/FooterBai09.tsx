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
    const check = this.props.todos.find((el) => !el.isDone);
    return (
      <div className="footer">
        {check ? (
          <div className="task-counter">
            Công việc đã hoàn thành:{" "}
            <span className="counter-number">
              {this.props.todos.filter((el) => el.isDone).length}
            </span>{" "}
            /<span className="counter-number">{this.props.todos.length}</span>{" "}
          </div>
        ) : (
          <div className="all-completed">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr6WsCGy-o3brXcj2cmXGkHM_fE_p0gy4X8w&s"
              alt=""
            />
            <span>Hoàn thành công việc</span>
          </div>
        )}
      </div>
    );
  }
}

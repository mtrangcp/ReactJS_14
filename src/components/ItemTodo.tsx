import { Component } from "react";

interface PropsType {
  content: string;
  isDone: boolean;
  id: number;
  onToggle: (id: number, checked: boolean) => void;
  onDelete: (id: number) => void;
}

export default class ItemTodo extends Component<PropsType> {
  handleClickChB = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(this.props.id);

    this.props.onToggle(this.props.id, event.target.checked);
  };

  handleDelete = (): void => {
    this.props.onDelete(this.props.id);
  };
  render() {
    return (
      <div className="todo-item">
        <input
          type="checkbox"
          className="todo-checkbox"
          onChange={this.handleClickChB}
          checked={this.props.isDone}
        />
        {this.props.isDone ? (
          <span className="todo-text completed">{this.props.content}</span>
        ) : (
          <span className="todo-text ">{this.props.content}</span>
        )}

        <div className="todo-actions">
          <button className="edit-btn" onClick={this.handleDelete}>
            ✎
          </button>
          <button className="delete-btn" onClick={this.handleDelete}>
            🗑️
          </button>
        </div>
      </div>
    );
  }
}

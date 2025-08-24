import React, { Component } from "react";
import ItemTodo from "./ItemTodo";
import "../styles/Bai09.css";
import FooterBai09 from "./FooterBai09";

interface Todo {
  id: number;
  content: string;
  isDone: boolean;
}

interface StateType {
  todos: Todo[];
  inputTodo: string;
  msg: string;
  showModal: boolean;
  deleteId: number | null;
}

export default class Bai09 extends Component<Record<string, never>, StateType> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      todos: JSON.parse(localStorage.getItem("todos") || "[]"),
      inputTodo: "",
      msg: "",
      showModal: false,
      deleteId: null,
    };
  }

  openDeleteModal = (id: number) => {
    this.setState({ showModal: true, deleteId: id });
  };

  cancelDelete = () => {
    this.setState({ showModal: false, deleteId: null });
  };

  confirmDelete = () => {
    if (this.state.deleteId) {
      this.setState(
        {
          todos: this.state.todos.filter((el) => el.id !== this.state.deleteId),
          showModal: false,
          deleteId: null,
        },
        () => localStorage.setItem("todos", JSON.stringify(this.state.todos))
      );
    }
  };

  render() {
    const { todos } = this.state;

    const handleInputTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        inputTodo: event.target.value,
      });
    };

    const addTodo = () => {
      if (!this.state.inputTodo) {
        this.setState({ msg: "Ten cong viec khong duoc de trong" });
        return;
      } else if (
        this.state.todos.length > 0 &&
        this.state.todos.some((el) => el.content === this.state.inputTodo)
      ) {
        this.setState({ msg: "Ten cong viec khong duoc trung" });
        return;
      } else {
        this.setState({ msg: "" });
      }
      const newTodo: Todo = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        content: this.state.inputTodo,
        isDone: false,
      };
      this.setState(
        {
          todos: [...todos, newTodo],
        },
        () => localStorage.setItem("todos", JSON.stringify(this.state.todos))
      );

      this.setState({ inputTodo: "" });
    };

    return (
      <div className="container">
        <div className="header">
          <h1>Danh sach cong viec</h1>
        </div>

        <div className="input-section">
          <div className="input-group">
            <input
              name="content"
              type="text"
              className="task-input"
              placeholder="Nhập công việc cần làm..."
              value={this.state.inputTodo}
              maxLength={100}
              onChange={handleInputTodo}
            />
            <button className="add-btn" onClick={addTodo}>
              Thêm
            </button>
          </div>
          <div className="error-message">{this.state.msg}</div>
        </div>

        {this.state.todos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <div className="empty-state-text">Chưa có công việc nào</div>
            <div className="empty-state-subtext">
              Hãy thêm công việc đầu tiên của bạn!
            </div>
          </div>
        ) : (
          <div className="todo-list">
            {todos.map((todo) => {
              return (
                <ItemTodo
                  key={todo.id}
                  content={todo.content}
                  isDone={todo.isDone}
                  id={todo.id}
                  onToggle={(id, checked) => {
                    this.setState(
                      {
                        todos: this.state.todos.map((el) =>
                          el.id === id ? { ...el, isDone: checked } : el
                        ),
                      },
                      () =>
                        localStorage.setItem(
                          "todos",
                          JSON.stringify(this.state.todos)
                        )
                    );
                  }}
                  onDelete={(id) => {
                    this.openDeleteModal(id);
                  }}
                ></ItemTodo>
              );
            })}
          </div>
        )}

        <FooterBai09 todos={this.state.todos}></FooterBai09>

        {this.state.showModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Xác nhận</h3>
              <h6>
                Bạn có chắc muốn xóa:{" "}
                {
                  this.state.todos.find((el) => el.id === this.state.deleteId)
                    ?.content
                }
              </h6>
              <div className="modal-actions">
                <button onClick={this.confirmDelete} className="confirm-btn">
                  Đồng ý
                </button>
                <button onClick={this.cancelDelete} className="cancel-btn">
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

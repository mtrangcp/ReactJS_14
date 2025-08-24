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
  showModalDelete: boolean;
  showModalEdit: boolean;
  deleteId: number | null;
  editId: number | null;
  editValue: string;
  editMsg: string;
}

export default class Bai09 extends Component<Record<string, never>, StateType> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      todos: JSON.parse(localStorage.getItem("todos") || "[]"),
      inputTodo: "",
      msg: "",
      showModalDelete: false,
      showModalEdit: false,
      deleteId: null,
      editId: null,
      editValue: "",
      editMsg: "",
    };
  }

  // delete
  openDeleteModal = (id: number) => {
    this.setState({ showModalDelete: true, deleteId: id });
  };

  cancelDelete = () => {
    this.setState({ showModalDelete: false, deleteId: null });
  };

  confirmDelete = () => {
    if (this.state.deleteId) {
      this.setState(
        {
          todos: this.state.todos.filter((el) => el.id !== this.state.deleteId),
          showModalDelete: false,
          deleteId: null,
        },
        () => localStorage.setItem("todos", JSON.stringify(this.state.todos))
      );
    }
  };

  // edit
  openEditModal = (id: number) => {
    const todo = this.state.todos.find((el) => el.id === id);
    this.setState({
      showModalEdit: true,
      editId: id,
      editValue: todo ? todo.content : "",
      editMsg: "",
    });
  };

  cancelEdit = () => {
    this.setState({
      showModalEdit: false,
      editId: null,
      editValue: "",
      editMsg: "",
    });
  };

  confirmEdit = () => {
    const { editId, editValue, todos } = this.state;

    if (!editValue.trim()) {
      this.setState({ editMsg: "Tên công việc không được để trống" });
      return;
    }
    if (todos.some((el) => el.content === editValue && el.id !== editId)) {
      this.setState({ editMsg: "Tên công việc không được trùng" });
      return;
    }

    this.setState(
      {
        todos: todos.map((el) =>
          el.id === editId ? { ...el, content: editValue } : el
        ),
        showModalEdit: false,
        editId: null,
        editValue: "",
        editMsg: "",
      },
      () => localStorage.setItem("todos", JSON.stringify(this.state.todos))
    );
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
                  onEdit={(id) => {
                    this.openEditModal(id);
                  }}
                ></ItemTodo>
              );
            })}
          </div>
        )}

        <FooterBai09 todos={this.state.todos}></FooterBai09>

        {/* Modal Xóa */}
        {this.state.showModalDelete && (
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

        {this.state.showModalEdit && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Cập nhật công việc</h3>
              <input
                className="inputEdit"
                type="text"
                value={this.state.editValue}
                onChange={(e) => this.setState({ editValue: e.target.value })}
                maxLength={100}
              />
              <div className="error-message">{this.state.editMsg}</div>
              <div className="modal-actions">
                <button onClick={this.confirmEdit} className="confirm-btn">
                  Đồng ý
                </button>
                <button onClick={this.cancelEdit} className="cancel-btn">
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

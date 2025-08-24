import React, { Component } from "react";
import "../styles/Bai05.css";

interface User {
  userName: string;
  email: string;
  pass: string;
  phone: string;
}

interface StateType {
  users: User[];
  form: User;
  message: string;
}

export default class Bai07 extends Component<Record<string, never>, StateType> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      users: JSON.parse(localStorage.getItem("users") || "[]"),
      form: {
        userName: "",
        email: "",
        pass: "",
        phone: "",
      },
      message: "",
    };
  }

  hadleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      form: { ...this.state.form, [name]: value },
    });
  };

  submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    const { userName, email, pass } = this.state.form;
    const { users } = this.state;

    if (!userName || !email || !pass) {
      this.setState({
        message: "Tên, Email và Mật khẩu không được để trống!",
      });
      return;
    }
    if (users.some((el) => el.email === email)) {
      this.setState({ message: "Email đã tồn tại!" });
      return;
    }

    const newUsers = [...users, this.state.form];
    localStorage.setItem("users", JSON.stringify(newUsers));

    this.setState({
      users: newUsers,
      form: { userName: "", email: "", pass: "", phone: "" },
      message: "Đăng ký tài khoản thành công",
    });
  };
  render() {
    const { form, message } = this.state;
    return (
      <form onSubmit={this.submitForm}>
        <h1>Dang ky tai khoan</h1>
        <div className="item">
          <label htmlFor="name">Ten tai khoan</label>
          <br />
          <input
            type="text"
            id="name"
            onChange={this.hadleInput}
            name="userName"
            value={form.userName}
          />
        </div>
        <div className="item">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            onChange={this.hadleInput}
            name="email"
            value={form.email}
          />
        </div>
        <div className="item">
          <label htmlFor="pass">Mat khau</label>
          <br />
          <input
            type="password"
            id="pass"
            onChange={this.hadleInput}
            name="pass"
            value={form.pass}
          />
        </div>
        <div className="item">
          <label htmlFor="phone">So dien thoai</label>
          <br />
          <input
            type="text"
            max={10}
            id="phone"
            onChange={this.hadleInput}
            name="phone"
            value={form.phone}
          />
        </div>
        {message && <p>{message}</p>}
        <button type="submit">Dang ky</button>
      </form>
    );
  }
}

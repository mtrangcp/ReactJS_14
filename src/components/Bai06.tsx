import React, { Component } from "react";

interface StateType {
  id: string;
}

export default class Bai06 extends Component<Record<string, never>, StateType> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      id: "nu",
    };
  }
  handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    this.setState({
      id: id,
    });
  };
  handleSunmit = (event: React.FormEvent) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <form onSubmit={this.handleSunmit}>
        <h3>Gioi tinh: </h3>
        <input
          type="radio"
          id="nam"
          onChange={this.handleRadio}
          name="gender"
          checked={this.state.id === "nam" ? true : false}
        />
        <label htmlFor="nam">Nam</label>
        <br />
        <input
          type="radio"
          id="nu"
          onChange={this.handleRadio}
          name="gender"
          checked={this.state.id === "nu" ? true : false}
        />
        <label htmlFor="nu">Nu</label>
        <br />
        <input
          type="radio"
          id="khac"
          onChange={this.handleRadio}
          name="gender"
          checked={this.state.id === "khac" ? true : false}
        />
        <label htmlFor="khac">Khac</label>
        <br />

        <button style={{ margin: "10px" }}>Submit</button>
      </form>
    );
  }
}

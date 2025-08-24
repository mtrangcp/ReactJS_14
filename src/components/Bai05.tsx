import React, { Component } from "react";
import "../styles/Bai05.css";

interface StateType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class Bai05 extends Component<Record<string, never>, StateType> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      id: "SP000",
      name: "San Pham",
      price: 0,
      quantity: 0,
    };
  }

  hadleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  submitForm = (event: React.FormEvent) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <h1>Them moi san pham</h1>
        <div className="item">
          <label htmlFor="id">Ma san pham</label>
          <br />
          <input type="text" id="id" onChange={this.hadleInput} name="id" />
        </div>
        <div className="item">
          <label htmlFor="name">Ten san pham</label>
          <br />
          <input type="text" id="name" onChange={this.hadleInput} name="name" />
        </div>
        <div className="item">
          <label htmlFor="price">Gia san pham</label>
          <br />
          <input
            type="number"
            min={1000}
            step={1000}
            id="price"
            onChange={this.hadleInput}
            name="price"
          />
        </div>
        <div className="item">
          <label htmlFor="quantity">So luong</label>
          <br />
          <input
            type="number"
            id="quantity"
            onChange={this.hadleInput}
            name="quantity"
          />
        </div>
        <button type="submit">Dang ky</button>
      </form>
    );
  }
}

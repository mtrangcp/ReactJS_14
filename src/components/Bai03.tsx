import { Component } from "react";

type Statetype = {
  name: string;
};

export default class Bai03 extends Component<Record<string, never>, Statetype> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      name: "Rikkei Academy",
    };
  }
  handleClickBtn = () => {
    this.setState((prevValue) => ({
      name:
        prevValue.name === "Rikkei Academy" ? "Rikkei Soft" : "Rikkei Academy",
    }));
  };
  render() {
    return (
      <>
        <div>
          Company: <span>{this.state.name}</span>
          <br />
          <button onClick={this.handleClickBtn}>Change state</button>
        </div>
      </>
    );
  }
}

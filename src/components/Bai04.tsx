import { Component } from "react";

type Statetype = {
  msg: string;
};

export default class Bai04 extends Component<Record<string, never>, Statetype> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      msg: "Học code để đi làm",
    };
  }
  handleClickBtn = () => {
    this.setState(
      {
        msg: "Học code sẽ thành công. Cố lên!!!",
      },
      () => console.log(this.state.msg)
    );
  };

  shouldComponentUpdate(): boolean {
    return false;
  }
  render() {
    return (
      <>
        <div>
          Company: <span>{this.state.msg}</span>
          <br />
          <button onClick={this.handleClickBtn}>Change state</button>
        </div>
      </>
    );
  }
}

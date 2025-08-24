import { Component } from "react";

type Statetype = {
  userName: string;
};

export default class Bai01 extends Component<Record<string, never>, Statetype> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      userName: "Nguyen Van A",
    };
  }
  render() {
    return <div>{this.state.userName}</div>;
  }
}

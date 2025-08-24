import { Component } from "react";

export default class Bai02 extends Component {
  componentDidMount(): void {
    console.log("Component đã được mount!");
  }
  render() {
    return <div>Notification Component</div>;
  }
}

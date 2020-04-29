import React, { Component } from "react";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import io from "socket.io-client";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          name: "username",
          label: "User name",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "email",
          label: "EMail",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "age",
          label: "Age",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "country",
          label: "Country",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "btn_action",
          label: "Action",
          options: {
            filter: false,
            sort: false,
          },
        },
      ],
      data: [],
    };
  }
  clickme(id) {
    alert(id);
  }
  async componentDidMount() {
    // let server = "http://localhost:3001";

    // this.socket = io(server);

    // this.socket.on("/get_Employee", messageFromBackEnd => {
    //   console.log(messageFromBackEnd)
    // })
    const res = await fetch(`http://localhost:3001/get_Employee`);
    const users = await res.json();
    const userss = await users.map((single_rec) => {
      return {
        ...single_rec,
        btn_action: (
          <Link to={{ pathname: `/userDetail/${single_rec.id}` }}>
            User Detail
          </Link>
        ),
      };
    });
    this.setState({
      data: userss,
    });
  }

  render() {
    const options = {
      filterType: "dropdown",
      rowsPerPageOptions: [5, 10, 15, 100],
    };

    return (
      <MUIDataTable
        title={"Employees list"}
        data={this.state.data}
        columns={this.state.columns}
        options={options}
      />
    );
  }
}

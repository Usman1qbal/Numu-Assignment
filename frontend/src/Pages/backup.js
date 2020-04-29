import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import io from "socket.io-client";
import { _ } from "ag-grid-community";
import Button from '@material-ui/core/Button';
// import 'ag-grid-enterprise';

class userDetail extends Component {
  constructor(props) {
    super(props);
    // console.log(props);debugger
    this.state = {
      columnDefs: [
        {
          headerName: "User Detail",
          children: [
            {
              headerName: "id",
              field: "id",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
            },
            {
              headerName: "username",
              field: "username",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
            },
            {
              headerName: "email",
              field: "email",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
              columnGroupShow: "open",
            },
            {
              headerName: "age",
              field: "age",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
              columnGroupShow: "open",
            },
            {
              headerName: "country",
              field: "country",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
              columnGroupShow: "open",
            },
            {
              headerName: "city",
              field: "city",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
              columnGroupShow: "open",
            },
            {
              headerName: "active",
              field: "active",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
              columnGroupShow: "open",
            },
            {
              headerName: "created_at",
              field: "created_at",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
              columnGroupShow: "open",
            },
            {
              headerName: "updated_at",
              field: "updated_at",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
              columnGroupShow: "open",
            },
          ],
        },
        {
          headerName: "Score Detail",
          children: [
            {
              headerName: "posts",
              field: "posts",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
              columnGroupShow: "open",
            },
            {
              headerName: "friends",
              field: "friends",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
            },
            {
              headerName: "points",
              field: "points",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
              columnGroupShow: "open",
            },
            {
              headerName: "refresh",
              field: "refresh",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
            },
          ],
        },
        {
          headerName: "battery Level Detail",
          children: [
            {
              headerName: "os",
              field: "os",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
              columnGroupShow: "open",
            },
            {
              headerName: "appVersion",
              field: "appVersion",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
              columnGroupShow: "open",
            },
            {
              headerName: "netSpeed",
              field: "netSpeed",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
              columnGroupShow: "open",
            },
            {
              headerName: "battery",
              field: "battery",
              sortable: true,
              filter: true, 
              pivot: true,
              aggFunc: 'sum',
              enableValue: true,
              allowedAggFuncs: ['sum', 'min', 'max'],
            },
          ],
        },
      ],
      rowData: [
        {
          // id: "No Record",
          // username: "No Record",
          // email: "No Record",
          // age: "No Record",
          // country: "No Record",
          // city: "No Record",
          // active: "No Record",
          // created_at: "No Record",
          // updated_at: "No Record",
          // post: "No Record",
          // friends: "No Record",
          // points: "No Record",
          // refresh: "No Record",
          // os: "No Record",
          // appVersion: "No Records",
          // netSpeed: "No Record",
          // battery: "No Record",
        },
      ],
    };
  }
  async componentDidMount() {
    console.log("==data===>",this.props.match.params.id,typeof(this.props.match.params.id),typeof('404'),this.props.match.params.id === '404');
    let query="";
    if(this.props.match.params.id === "404")
    {
      query = `http://localhost:3001/get_employee_detail`;
    }
    else{
      query = `http://localhost:3001/get_employee_detail/${this.props.match.params.id}`;
    }
    
    console.log("==data===>",this.props.match.params.id,query);
    const res  = await fetch(query).then((res) => {
          return res.json();
        })
        .then((users) =>{
          console.log("here comes data ==> ",users);
          this.setState({
            rowData:users
          })
        });

     
  }

  render() {
    {
      var gridOptions = {
        columnDefs: this.state.columnDefs,
        defaultColDef: {
          flex: 1,
          minWidth: 150,
          filter: true,
          sortable: true,
          resizable: true,
        },
        autoGroupColumnDef: {
          headerName: 'Athlete',
          field: 'athlete',
          minWidth: 250,
          cellRenderer: 'agGroupCellRenderer',
          cellRendererParams: {
            footerValueGetter: '"Total (" + x + ")"',
          },
        },
        groupIncludeFooter: true,
        sideBar: true,
      };
    }
    return (
      <div
        className="ag-theme-balham-dark"
        style={{
          height: "370px",
          width: "92%",
        }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          masterDetail={true}
          pagination={true}
          gridOptions={this.gridOptions}
          enableCharts= {true}
          enableRangeSelection= {true}
          paginationPageSize={9}
          suppressSizeToFit={true}
        ></AgGridReact>
      </div>
    );
  }
}

export default userDetail;

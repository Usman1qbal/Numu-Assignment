import React, { useState, useEffect } from "react";
// import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Dropdown from "./DropDown/Dropdown";
import UserDetail from "./UserDetail";

import BarCharts from "../Charts/triangleBarCharts";
import SimpleBarChart from "../Charts/simpleBarChart";
import PieChart from "../Charts/PieChartWithLabel";
import LineChartDiagram from "../Charts/LineChartDiagram";
import AreaResponsiveChart from "../Charts/areaResponsiveChart";

const data = [
  {
    name: "Page 4",
    age: 4000,
    country: 2400,
  },
  {
    name: "Page B",
    age: 3000,
    country: 1398,
  },
  {
    name: "Page C",
    age: 2000,
    country: 9800,
  },
  {
    name: "Page D",
    age: 2780,
    country: 3908,
  },
  {
    name: "Page E",
    age: 1890,
    country: 4800,
  },
  {
    name: "Page F",
    age: 2390,
    country: 3800,
  },
  {
    name: "Page G",
    age: 3490,
    country: 4300,
  },
  {
    name: "Page E",
    age: 1890,
    country: 4800,
  },
  {
    name: "Page F",
    age: 2390,
    country: 3800,
  },
  {
    name: "Page G",
    age: 3490,
    country: 4300,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Dashboard() {
  const [spacing, setSpacing] = React.useState(1);
  const classes = useStyles();
  const userDropDown = [
    "age",
    "country",
    "city",
    "active",
    `posts`,
    `friends`,
    `points`,
  ];

  const [userData1, setUserData1] = React.useState(data);
  const [userData2, setUserData2] = React.useState(data);
  const [userOption1, setUserOption1] = React.useState("age");
  const [userOption2, setUserOption2] = React.useState("None");

  const [UserList, setUserList] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(1);
  const [selectedOption, setSelectedOption] = React.useState(`posts`);
  const [batteryPointSection, setBatteryPointSection] = React.useState([]);
  const batteryDropDown = [`posts`, `battery`];

  const dataExtract = (key, userDetail) => {
    let list = [{}];
    if (key === "city") {
      userDetail.map((item1) => {
        let numUser = 0;
        userDetail.map((item2) => {
          if (item1.city === item2.city) {
            numUser++;
          }
        });
        let object = {
          name: item1.city,
          city: numUser,
        };
        if (!list.some((item) => item.name === object.name)) {
          list.push(object);
        }
      });
    } else if (key === "country") {
      userDetail.map((item1) => {
        let numUser = 0;
        userDetail.map((item2) => {
          if (item1.country === item2.country) {
            numUser++;
          }
        });
        let object = {
          name: item1.country,
          country: numUser,
        };
        if (!list.some((item) => item.name === object.name)) {
          list.push(object);
        }
      });
    } else if (key === "active") {
      userDetail.map((item1) => {
        let numUser = 0;
        userDetail.map((item2) => {
          if (item1.active === item2.active) {
            numUser++;
          }
        });
        let object = {
          name: item1.active,
          active: numUser,
        };
        if (!list.some((item) => item.name === object.name)) {
          list.push(object);
        }
      });
    } else if (key === "posts") {
      const maxValueOfY = Math.max(...userDetail.map((o) => o.posts));
      const difference = Math.round(maxValueOfY / 8);
      let lowerLimit = 0;
      let upperLimit = difference;
      while (lowerLimit < maxValueOfY) {
        let numUser = 0;
        userDetail.map((item) => {
          if ((item.posts >= lowerLimit) & (item.posts <= upperLimit)) {
            numUser++;
          }
        });
        let object = {
          name: `${lowerLimit} - ${upperLimit}`,
          posts: numUser,
        };
        list.push(object);
        lowerLimit = upperLimit + 1;
        upperLimit = upperLimit + difference;
      }
    } else if (key === "friends") {
      const maxValueOfY = Math.max(...userDetail.map((o) => o.friends));
      const difference = Math.round(maxValueOfY / 8);
      let lowerLimit = 0;
      let upperLimit = difference;
      while (lowerLimit < maxValueOfY) {
        let numUser = 0;
        userDetail.map((item) => {
          if ((item.friends >= lowerLimit) & (item.friends <= upperLimit)) {
            numUser++;
          }
        });
        let object = {
          name: `${lowerLimit} - ${upperLimit}`,
          friends: numUser,
        };
        list.push(object);
        lowerLimit = upperLimit + 1;
        upperLimit = upperLimit + difference;
      }
    } else if (key === "points") {
      const maxValueOfY = Math.max(...userDetail.map((o) => o.points));
      const difference = Math.round(maxValueOfY / 8);
      let lowerLimit = 0;
      let upperLimit = difference;
      while (lowerLimit < maxValueOfY) {
        let numUser = 0;
        userDetail.map((item) => {
          if ((item.points >= lowerLimit) & (item.points <= upperLimit)) {
            numUser++;
          }
        });
        let object = {
          name: `${lowerLimit} - ${upperLimit}`,
          points: numUser,
        };
        list.push(object);
        lowerLimit = upperLimit + 1;
        upperLimit = upperLimit + difference;
      }
    } else if (key === "age") {
      const maxValueOfY = Math.max(...userDetail.map((o) => o.age));
      const difference = Math.round(maxValueOfY / 8);
      let lowerLimit = 0;
      let upperLimit = difference;
      while (lowerLimit < maxValueOfY) {
        let numUser = 0;
        userDetail.map((item) => {
          if ((item.age >= lowerLimit) & (item.age <= upperLimit)) {
            numUser++;
          }
        });
        let object = {
          name: `${lowerLimit} - ${upperLimit}`,
          age: numUser,
        };
        list.push(object);
        lowerLimit = upperLimit + 1;
        upperLimit = upperLimit + difference;
      }
    }
    return list;
  };

  const UserchartSection = (userData1, userOption1, userData2, userOption2) => {
    return (
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {userOption1 !== "None" ? (
            <Grid>
              <LineChartDiagram graphData={userData1} graph1={userOption1} />
            </Grid>
          ) : null}
          {userOption2 !== "None" ? (
            <Grid>
              <LineChartDiagram graphData={userData2} graph2={userOption2} />
            </Grid>
          ) : null}

          {userOption1 !== "None" ? (
            <Grid>
              <SimpleBarChart graphData={userData1} graph1={userOption1} />
            </Grid>
          ) : null}
          {userOption2 !== "None" ? (
            <Grid>
              <BarCharts graphData={userData2} graph2={userOption2} />
            </Grid>
          ) : null}

          {userOption1 !== "None" ? (
            <Grid>
              <PieChart graphData={userData1} graph={userOption1} />
            </Grid>
          ) : null}
          {userOption2 !== "None" ? (
            <Grid>
              <PieChart graphData={userData2} graph={userOption2} />
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    );
  };

  const BatteryPointSection = () => {
    return (
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          <Grid>
            <SimpleBarChart
              graphData={batteryPointSection}
              graph2={selectedOption}
              width={900}
            />
          </Grid>
          <Grid>
            <AreaResponsiveChart
              graphData={batteryPointSection}
              graph2={selectedOption}
              width={900}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const getApiCustomizeData = async () => {
    let query = `http://localhost:3001/get_employee_detail`;
    const res = await fetch(query)
      .then((res) => {
        return res.json();
      })
      .then((users) => {
        setUserData1(dataExtract(userOption1, users));
        setUserData2(dataExtract(userOption2, users));
      });
  };

  const getApiUserList = async () => {
    let query = `http://localhost:3001/get_Employee`;
    const res = await fetch(query)
      .then((res) => {
        return res.json();
      })
      .then((users) => {
        setUserList(users);
      });
  };

  const getApiUserData = async () => {
    let query = `http://localhost:3001/get_employee_detail/${selectedUser}`;
    const res = await fetch(query)
      .then((res) => {
        return res.json();
      })
      .then((users) => {
        let list = [];
        {
          selectedOption === "posts"
            ? users.map((item) => {
                let object = {
                  name: item.created_at,
                  posts: item.posts,
                };
                list.push(object);
              })
            : users.map((item) => {
                let object = {
                  name: item.created_at,
                  battery: item.battery,
                };
                list.push(object);
              });
        }
        setBatteryPointSection(list);
      });
  };

  useEffect(() => {
    getApiCustomizeData();
  }, [userOption1, userOption2]);

  useEffect(() => {
    getApiUserList();
    getApiUserData();
  }, [selectedUser, selectedOption]);

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12} justify="center">
        <h1>Number of User Detail</h1>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          <Grid>
            <Dropdown
              optionList={userDropDown}
              option={userOption1}
              setOption={setUserOption1}
              label="Graph-1 option"
            />
          </Grid>
          <Grid>
            <Dropdown
              optionList={userDropDown}
              option={userOption2}
              setOption={setUserOption2}
              label="Graph-2 option"
            />
          </Grid>
        </Grid>
      </Grid>
      {UserchartSection(userData1, userOption1, userData2, userOption2)}

      <Grid item xs={12} justify="center">
        <h1>Battery Level And Points</h1>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          <Grid>
            <Dropdown
              optionList={batteryDropDown}
              option={selectedOption}
              setOption={setSelectedOption}
              label="Graph option"
            />
          </Grid>
          <Grid>
            <Dropdown
              optionList={UserList}
              option={selectedUser}
              setOption={setSelectedUser}
              label="User"
            />
          </Grid>
        </Grid>
      </Grid>

      {BatteryPointSection()}

      <Grid item xs={12} justify="center">
        <h1>Transformation</h1>
        <UserDetail url={true} />
      </Grid>
    </Grid>
  );
}

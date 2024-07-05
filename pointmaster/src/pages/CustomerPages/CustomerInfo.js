import {DeleteTwoTone } from "@ant-design/icons";
import { Layout,Button } from "antd";
const { Header } = Layout;

const CustomerInfo = ({customerId}) => {

const customer = {
    id: 1,
    image : "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    name: "Jack",
    mail: "jack@abd.com",
    points: 100,
    bills: [
        {
            id: 1,
            date: "2021-09-01",
            amount: 100,
        },
        {
            id: 2,
            date: "2021-09-02",
            amount: 200,
        },
        {
            id: 3,
            date: "2021-09-03",
            amount: 300,
        },
        {
            id: 4,
            date: "2021-09-04",
            amount: 400,
        },
        {
            id: 5,
            date: "2021-09-05",
            amount: 500,
        },
    ],
    birthday: "2021-09-01",
    phone: "123456789",
    address: "1234, 5th Street, 6th",
    gender: 'male',
}

  return (
    <>
       <Header style={headerStyle}>
          <h1 style={logoStyle}>PointMaster</h1>
          <h1 style={topicStyle}>Customers</h1>
          <Button type="primary" icon={<DeleteTwoTone twoToneColor={"red"}  />} style = {deleteCustomer}>
Remove Customer
          </Button>
        </Header>
      <div style={container}>
        <div style={mainInfoContainerStyle}>
          <div style={infotmationContainerStyle}>
            <div style={interactiveInfotmationContainerStyle}>
                <InfoCard /> 
            </div>
            <div style={pointsCardContainerStyle}>

            </div>
          </div>
          <div style={nameCardContainerStyle}></div>
        </div>
        <div style={billListContainerStyle}></div>
      </div>
    </>
  );
};

const deleteCustomer = {
    backgroundColor: "#ed7e9b",
}
const container = {
  psotion: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "90vh",
  width: "100%",
  backgroundColor: "#d0ebf5",
};

const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: "10vh",
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };
  
  const topicStyle = {
    color: "black",
    fontSize: 30,
    fontWeight: 800,
    margin: 0,
  };
  
  const logoStyle = {
    color: "black",
    fontSize: 24,
    fontWeight: 600,
    margin: 0,
  };
  

const mainInfoContainerStyle = {
  position: "relative",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "50%",
  width: "100%",
  backgroundColor: "purple",
};

const billListContainerStyle = {
  position: "relative",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "50%",
  width: "100%",
  backgroundColor: "black",
};

const interactiveInfotmationContainerStyle = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "50%",
  backgroundColor: "red",
};

const infotmationContainerStyle = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "50%",
  height: "100%",
  backgroundColor: "green",
};

const pointsCardContainerStyle = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "50%",
  backgroundColor: "yellow",
};

const nameCardContainerStyle = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "50%",
  height: "100%",
  backgroundColor: "blue",
};
export default CustomerInfo;

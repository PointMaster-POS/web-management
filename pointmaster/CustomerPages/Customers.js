import { Button, Flex, Layout, Col, Row, Divider } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import CustomerCard from "../../components/CustomerComponetns/CustomerCard";
import PickerBar from "../../components/CustomerComponetns/PickerBar";
const { Header, Content } = Layout;

const customers = [
  {
    id: 1,
    image : "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    name: "Jack",
    mail: "jack@124.com",
    points: 100,
  },
  {
    id: 2,
    image : "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    name: "John",
    mail: "jack@124.com",
    points: 200,
  },
  {
    id: 3,
    image : "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    name: "Jane",
    mail: "jack@124.com",  
    points: 300,
  },
  {
    id: 4,
    image : "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    name: "Jill",
    mail: "jack@124.com",
    points: 400,

  },
  {
    id: 5,
    image : "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    name: "Jill",
    points: 400,

  }
];


const Customers = () => {
  return (
    <Flex>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <h1 style={logoStyle}>PointMaster</h1>
          <h1 style={topicStyle}>Customers</h1>
          <Button type="primary" icon={<PlusCircleOutlined />} style = {addCustomerButton}>
            Add New Customer
          </Button>
        </Header>
        <Content style={contentStyle}>
          <PickerBar  />
         
          <div style={{ padding: 24 , backgroundColor : "#d0ebf5"}}>
          <Row gutter={[16, 24]}>
            {customers.map((customer) => (
              <Col span={6} key={customer.id}>
                <CustomerCard customer={customer} />
              </Col>
            ))}
          </Row>
            </div>
        </Content>
      </Layout>
    </Flex>
  );
};

// example change



const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  height: "100vh",
  maxWidth: "100%",
};

const addCustomerButton = {
    
};
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
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

const contentStyle = {
  height: "100%",
  lineHeight: "120px",
  color: "#fff",
alignItems : "center",
justifyContent : "center",
};

export default Customers;

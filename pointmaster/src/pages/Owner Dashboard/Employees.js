import React, { useState } from "react";
import {
  Button,
  Card,
  Modal,
  Table,
  Space,
  Typography,
  Tooltip,
  Input,
  Form,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import AddNewEmployee from "./AddNewEmployee";
import { employeesData } from "./Data";
//import { useNavigate } from "react-router-dom"; // Import useNavigate

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;

const Employees = () => {
  const [data, setData] = useState(employeesData);
  const [filteredData, setFilteredData] = useState(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();
  //const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleViewEmployee = (employee_id) => {
    // navigate(`/phistory/${supplier_id}`);
  };

  const handleAddEmployee = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      setIsModalVisible(false);
      const newEmployee = {
        ...values,
        /* supplier_id: `SUP${data.length + 123}`, // Simulate auto-increment
        key: `${data.length + 1}`, */
      };
      const newData = [...data, newEmployee];
      setData(newData);
      setFilteredData(newData);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };


  const handleEdit = (values) => {
    /* const newData = data.map((item) =>
      item.supplier_id === values.supplier_id ? { ...item, ...values } : item
    );
    setData(newData);
    setFilteredData(newData); */
  };

  const handleDelete = (EmployeeName) => {
    confirm({
      title: `Are you sure you want to delete "${EmployeeName}"?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
    });
  };

  const handleSearch = (value, exactMatch = false) => {
    const filtered = data.filter((item) => {
      const employee_name = item.employee_name.toLowerCase();
      const employee_id = item.employee_id.toString().toLowerCase();
      const searchValue = value.toLowerCase();

      if (exactMatch) {
        return employee_name === searchValue || employee_id === searchValue;
      } else {
        return employee_name.includes(searchValue) || employee_id.includes(searchValue);
      }
    });
    setFilteredData(filtered);
    setSearchText(value);
  };

  // Table columns definition
  const columns = [
    /* {
      title: "",
      dataIndex: "photo_url",
      key: "photo_url",
      render: (image) => <Avatar src={image} size={50} />,
    }, */
    {
      title: "Employee ID",
      dataIndex: "employee_id",
      key: "employee_id",
    },
    {
      title: "Employee Name",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Branch ID",
      dataIndex: "branch_id",
      key: "branch_id",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Telephone",
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Edit Employee">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              style={{
                borderColor: "#1890ff",
                color: "#1890ff",
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Employee">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.employee_name)}
              danger
            />
          </Tooltip>
          {/* <Tooltip title="View Store">
            <Button
              icon={<ShopOutlined />}
              onClick={() => handleViewStore(record)}
              style={{
                borderColor: "rgb(0,0,0,0.88)",
                color: "rgb(0,0,0,0.88)",
              }}
            />
          </Tooltip> */}
        </Space>
      ),
    },

    {
      title: "",
      key: "",
      render: (record) => (
        <Button
          onClick={() => handleViewEmployee(record.employee_id)}
        >
          View Employee
        </Button>
      ),
    },
  ];

  return (
    <Card
      style={{
        margin: 30,
        padding: 30,
        borderRadius: "10px",
      }}
      bodyStyle={{ padding: "20px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={3} style={{ marginBottom: 10 }}>
          Employees Data
        </Title>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Search
            placeholder="Search by Employee ID or Employee Name"
            onSearch={(value) => handleSearch(value, true)} 
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            style={{ marginRight: 16, width: 300 }}
          />
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Add New Employee
          </Button>
        </div>
      </div>
      <hr color="#1890ff" />

      <Modal
        title="Add New Employee"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <AddNewEmployee form={form} onAddEmployee={handleAddEmployee} onCancel={handleCancel} />
      </Modal>

      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 7 }}
        locale={{
          emptyText: "No employees available.",
        }}
        style={{ marginTop: 20 }}
      />
    </Card>
  );
};

export default Employees;

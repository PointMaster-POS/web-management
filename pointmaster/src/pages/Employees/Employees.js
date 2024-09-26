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
import AddNewEmployee from "../../components/Popups/AddNewEmployee";

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;

const Employees = () => {
  const [data, setData] = useState(employeesData);
  const [filteredData, setFilteredData] = useState(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  const fetchEmplyoees = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/branch", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
      message.error("Failed to fetch branches.");
    }
  };

  useEffect(() => {
    fetchEmplyoees();
  }, []);


  const handleAddEmplyoee = async (values) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/branch/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const newBranch = await response.json();
        console.log("New Branch:", newBranch); // Check the structure of newBranch
        message.success("Branch added successfully");
        setIsModalVisible(false);
        form.resetFields();
        fetchBranches();
      } else {
        message.error("Failed to add branch");
      }
    } catch (error) {
      console.error(error);
      message.error("Error occurred while adding branch");
    }
  };

  const handleUpdateEmplyoee = async (values) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/branch/${editingStore.branch_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        message.success("Branch updated successfully");
        setIsModalVisible(false);
        form.resetFields();
        setEditingStore(null);

        // Update the specific branch in local state
        // setData((prevData) =>
        //   prevData.map((item) =>
        //     item.branch_id === editingStore.branch_id
        //       ? { ...item, ...values }
        //       : item
        //   )
        // );
        // setFilteredData((prevData) =>
        //   prevData.map((item) =>
        //     item.branch_id === editingStore.branch_id
        //       ? { ...item, ...values }
        //       : item
        //   )
        // );
        fetchBranches();
      } else {
        message.error("Failed to update branch");
      }
    } catch (error) {
      console.error(error);
      message.error("Error occurred while updating branch");
    }
  };

  const handleEdit = (record) => {
    setEditingStore(record); // Set the store to be edited
    form.setFieldsValue(record); // Pre-fill the form with the selected store's data
    setIsModalVisible(true); // Open the modal for editing
  };


  const handleDelete = (branch_id, branch_name) => {
    confirm({
      title: "Are you sure you want to delete this store?",
      icon: <ExclamationCircleOutlined />,
      content: `This action will delete the store "${branch_name}".`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            message.error(
              "Authorization token is missing. Please log in again."
            );
            return;
          }

          await fetch(`http://localhost:3001/branch/${branch_id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // const newData = data.filter(
          //   (branch) => branch.branch_id !== branch_id
          // );
          // setData(newData);
          // setFilteredData(newData);
          fetchBranches();
          message.success("Store deleted successfully.");
        } catch (error) {
          console.error("Error deleting branch:", error);
          message.error("Failed to delete store.");
        }
      },
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingStore(null); // Reset editing state
  };


  const handleSearch = (value, exactMatch = false) => {
    const filtered = data.filter((item) => {
      const employee_name = item.employee_name.toLowerCase();
      const employee_id = item.employee_id.toString().toLowerCase();
      const searchValue = value.toLowerCase();

      if (exactMatch) {
        return employee_name === searchValue || employee_id === searchValue;
      } else {
        return (
          employee_name.includes(searchValue) ||
          employee_id.includes(searchValue)
        );
      }
    });
    setFilteredData(filtered);
    setSearchText(value);
  };

  
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
      title: "Contact Number",
      dataIndex: "contact_number",
      key: "contact_number",
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
        <Button onClick={() => handleViewEmployee(record.employee_id)}>
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
        <AddNewEmployee
          form={form}
          onAddEmployee={handleAddEmployee}
          onCancel={handleCancel}
        />
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

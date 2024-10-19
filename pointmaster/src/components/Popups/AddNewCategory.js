import React from "react";
import { Form, Input, Button, Select } from "antd";
import { useMenu } from "../../context/MenuContext";
import "./Styles.css"

const { Option } = Select;

const AddNewCategory = ({ form, onAddCategory, onCancel }) => {
  // const [branches, setBranches] = useState([]);
  const { branchID } = useMenu();

  // useEffect(() => {
  //   const fetchBranches = async () => {
  //     const token = localStorage.getItem("accessToken");
  //     if (!token) {
  //       message.error("Authorization token is missing. Please log in again.");
  //       return;
  //     }

  //     try {
  //       const response = await fetch("http://209.97.173.123:3001/branch", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setBranches(data);
  //     } catch (error) {
  //       console.error("Error fetching branches:", error);
  //       message.error("Failed to fetch branches.");
  //     }
  //   };

  //   fetchBranches();
  // }, []);

  const handleFinish = (values) => {
    const updatedValues = { ...values, branch_id: branchID };
    onAddCategory(updatedValues);
  };
  
  return (
    <Form
      className="large-font-form"
      form={form}
      name="add_category"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={handleFinish}
      style={{
        padding: "30px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      labelAlign="left"
    >
      <Form.Item
        label="Category Name"
        name="category_name"
        rules={[{ required: true, message: "Please input the category name!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Location"
        name="category_location"
        rules={[
          { required: true, message: "Please input the category location!" },
        ]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>
      {/* {role === "owner" && (
        <Form.Item
          label="Select Branch"
          name="branch_id"
          rules={[{ required: true, message: "Please select a branch!" }]}
          style={{ marginBottom: "20px" }}
        >
          <Select placeholder="Select a branch">
            {branches.map((branch) => (
              <Option key={branch.branch_id} value={branch.branch_id}>
                {branch.branch_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )} */}

      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
        style={{ textAlign: "right" }}
      >
        <Button
          type="default"
          onClick={() => {
            onCancel();
          }}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
        >
          Add Category
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewCategory;

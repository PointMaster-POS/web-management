import React, { useState } from "react";
import { Form, Input, Select, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useMenu } from "../../context/MenuContext";
import "./Styles.css"

const { Option } = Select;

const Roles = [{ name: "cashier" }, { name: "branch manager" }];

const AddNewEmployee = ({ form, onAddEmployee, onCancel }) => {
  // const [branches, setBranches] = useState([]);
  // const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
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
  //       setBranches(data); // Store fetched branches
  //     } catch (error) {
  //       console.error("Error fetching branches:", error);
  //       message.error("Failed to fetch branches.");
  //     }
  //   };

  //   fetchBranches();
  // }, []);

  const handleImageChange = ({ file }) => {
    setImageFile(file);
  };

  const uploadImageToFirebase = async () => {
    if (!imageFile) return null;

    const storageRef = ref(storage, `employee_images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          message.error("Image upload failed!");
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleFinish = async (values) => {
    setUploading(true);
    try {
      const imageUrl = await uploadImageToFirebase();
      const employeeData = { ...values, photo_url: imageUrl, branch_id: branchID };
      onAddEmployee(employeeData);
    } catch (error) {
      message.error("Failed to add employee with image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form
      className="large-font-form"
      form={form}
      name="add_employee"
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
        label="Employee Name"
        name="employee_name"
        rules={[{ required: true, message: "Please input the employee name!" }]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="employee_email"
        label="Email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please enter a valid email",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contact Number"
        name="phone"
        rules={[
          { required: true, message: "Please input the contact number!" },
        ]}
        style={{ marginBottom: "20px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="employee_address"
        label="Address"
        rules={[{ required: true, message: "Please enter an address" }]}
      >
        <Input />
      </Form.Item>
      {/*birth day - date picker */}
      <Form.Item
        name="birthday"
        label="Birth Day"
        rules={[{ required: true, message: "Please enter the birth day" }]}
      >
        <Input type="date" />
      </Form.Item>



      {/* Image Upload */}
      <Form.Item
        label="Image"
        name="photo_url"
        rules={[{ required: true, message: "Please upload an image!" }]}
      >
        <Upload
          listType="picture"
          beforeUpload={() => false}
          onChange={handleImageChange}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Select Role"
        name="role"
        rules={[{ required: true, message: "Please select a role" }]}
        style={{ marginBottom: "20px" }}
      >
        <Select>
          {Roles.map((role) => (
            <Option key={role.name} value={role.name}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="salary"
        label="Salary"
        rules={[{ required: true, message: "Please enter the salary" }]}
      >
        <Input min={0} />
      </Form.Item>

      {/* <Form.Item
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
      </Form.Item> */}

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
          loading={uploading}
        >
          {uploading ? "Uploading..." : "Add Employee"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewEmployee;

import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Descriptions,
  message,
  Spin,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Switch,
  Alert,
} from "antd";
import moment from "moment";

const Loyalty = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false); // For creating new loyalty program
  const [form] = Form.useForm();

  const getLoyaltyProgram = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/loyalty/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 404) {
        // If no loyalty program exists
        setData(null);
        
        return;
      }

      if (!response.ok) {
        message.error("Failed to fetch loyalty program data.");
        return;
      }

      const data = await response.json();
      setData(data);
      form.setFieldsValue({
        loyalty_program_name: data.loyalty_program_name,
        minimum_eligibility_value: data.minimum_eligibility_value,
        points_per_hundred: data.points_per_hundred,
        redeem_value: data.redeem_value,
        start_date: moment(data.start_date),
        by_sales: data.by_sales,
      });
      console.log("Loyalty Program Data: ", data);
    } catch (error) {
      console.error("Error fetching loyalty program data: ", error);
      message.error("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const updateLoyaltyProgram = async (values) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    console.log("Updating loyalty program with values: ", values);
    try {
      const response = await fetch(`http://localhost:3001/loyalty`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...values,
          start_date: values.start_date.format("YYYY-MM-DD HH:mm:ss"),
        }),
      });

      if (!response.ok) {
        message.error("Failed to update loyalty program.");
        return;
      }

      const updatedData = await response.json();
      setData(updatedData);
      message.success("Loyalty program updated successfully.");
      getLoyaltyProgram(); // Refresh data after update
      setEditing(false); // Close modal after successful update
    } catch (error) {
      console.error("Error updating loyalty program: ", error);
      message.error("Error updating program.");
    }
  };

  const createLoyaltyProgram = async (values) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      message.error("Authorization token is missing. Please log in again.");
      return;
    }

    console.log("Creating new loyalty program with values: ", values);
    try {
      const response = await fetch(`http://localhost:3001/loyalty`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...values,
          start_date: values.start_date.format("YYYY-MM-DD HH:mm:ss"),
        }),
      });

      if (!response.ok) {
        message.error("Failed to create loyalty program.");
        return;
      }

      const newData = await response.json();
      setData(newData);
      message.success("Loyalty program created successfully.");
      setCreating(false); // Exit creating mode after successful creation
    } catch (error) {
      console.error("Error creating loyalty program: ", error);
      message.error("Error creating program.");
    }
  };

  // Fetch loyalty program data when component loads
  useEffect(() => {
    getLoyaltyProgram();
  }, []);

  const onFinish = (values) => {
    if (creating) {
      createLoyaltyProgram(values);
    } else {
      updateLoyaltyProgram(values);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Loyalty Program</h1>

      {loading && <Spin size="large" style={{ margin: "20px 0" }} />}

      {data ? (
        <>
          <Card title={data.loyalty_program_name} style={{ marginTop: 20 }}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Loyalty Program ID">
                {data.loyalty_program_id}
              </Descriptions.Item>
              <Descriptions.Item label="Loyalty Program Name">
                {data.loyalty_program_name}
              </Descriptions.Item>
              <Descriptions.Item label="Minimum Eligibility Value">
                {data.minimum_eligibility_value}
              </Descriptions.Item>
              <Descriptions.Item label="Points Per Hundred">
                {data.points_per_hundred}
              </Descriptions.Item>
              <Descriptions.Item label="Redeem Value">
                {data.redeem_value}
              </Descriptions.Item>
              <Descriptions.Item label="Start Date">
                {new Date(data.start_date).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="By Sales">
                {data.by_sales ? "Yes" : "No"}
              </Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              style={{ marginTop: 20 }}
              onClick={() => setEditing(true)}
            >
              Edit Loyalty Program
            </Button>
          </Card>
        </>
      ) : (
        <>
          
            <>
              <Alert
                message="No Loyalty Program Found"
                description="You haven't set up a loyalty program yet. Here's how loyalty programs can benefit your business!"
                type="info"
                showIcon
              />
              <Card style={{ marginTop: 20 }}>
                <h3>Benefits of a Loyalty Program:</h3>
                <ul>
                  <li>Encourages repeat purchases from loyal customers.</li>
                  <li>Increases customer retention and satisfaction.</li>
                  <li>Provides data insights on customer spending habits.</li>
                  <li>Improves brand loyalty and customer relationships.</li>
                </ul>
                <Button
                  type="primary"
                  style={{ marginTop: 20 }}
                  onClick={() => setCreating(true)}
                >
                  Create New Loyalty Program
                </Button>
              </Card>

              {/* Modal for creating a new loyalty program */}
              <Modal
                title="Create New Loyalty Program"
                visible={creating}
                onCancel={() => setCreating(false)}
                footer={null}
              >
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={{
                    start_date: moment(),
                    by_sales: false,
                  }}
                >
                  <Form.Item
                    name="loyalty_program_name"
                    label="Loyalty Program Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input the program name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="minimum_eligibility_value"
                    label="Minimum Eligibility Value"
                    rules={[
                      {
                        required: true,
                        message: "Please input the minimum value!",
                      },
                    ]}
                  >
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    name="points_per_hundred"
                    label="Points Per Hundred"
                    rules={[
                      {
                        required: true,
                        message: "Please input the points!",
                      },
                    ]}
                  >
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    name="redeem_value"
                    label="Redeem Value"
                    rules={[
                      {
                        required: true,
                        message: "Please input the redeem value!",
                      },
                    ]}
                  >
                    <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    name="start_date"
                    label="Start Date"
                    rules={[
                      {
                        required: true,
                        message: "Please select the start date!",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    name="by_sales"
                    label="By Sales?"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    Create Program
                  </Button>
                </Form>
              </Modal>
            </>
          
        </>
      )}

      {/* Modal for editing an existing loyalty program */}
      <Modal
        title="Edit Loyalty Program"
        visible={editing}
        onCancel={() => setEditing(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            start_date: moment(data?.start_date),
            by_sales: data?.by_sales,
          }}
        >
          <Form.Item
            name="loyalty_program_name"
            label="Loyalty Program Name"
            rules={[
              {
                required: true,
                message: "Please input the program name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="minimum_eligibility_value"
            label="Minimum Eligibility Value"
            rules={[
              {
                required: true,
                message: "Please input the minimum value!",
              },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="points_per_hundred"
            label="Points Per Hundred"
            rules={[
              {
                required: true,
                message: "Please input the points!",
              },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="redeem_value"
            label="Redeem Value"
            rules={[
              {
                required: true,
                message: "Please input the redeem value!",
              },
            ]}
          >
            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="start_date"
            label="Start Date"
            rules={[
              {
                required: true,
                message: "Please select the start date!",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="by_sales"
            label="By Sales?"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Update Program
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Loyalty;

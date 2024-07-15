import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import NewStore from './NewStore';

const Stores = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Handle form submission here
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values) => {
    console.log('Form submitted with values: ', values);
    handleOk();
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add New Branch
      </Button>
      <Modal
        title="Add New Branch"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" form="add_branch" htmlType="submit">
            Add
          </Button>,
        ]}
      >
        <NewStore onFinish={handleFormSubmit} />
      </Modal>
    </div>
  );
};

export default Stores;

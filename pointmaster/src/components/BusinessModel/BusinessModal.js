import React from "react";
import { Modal } from "antd";
import RegisterNewBusiness from "../../components/Popups/RegisterNewBusiness/RegisterNewBusiness";

const BusinessModal = ({ visible, form, onCancel, onRegister }) => {
  return (
    <Modal
      title={<div className="custom-modal-title">Register New Business</div>}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={750}
      centered
    >
      <RegisterNewBusiness
        form={form}
        onCancel={onCancel}
        isEditMode={false}
        onRegisterOrUpdateBusiness={onRegister}
      />
    </Modal>
  );
};

export default BusinessModal;

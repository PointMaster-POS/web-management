import React from "react";
import { Modal } from "antd";
import RegisterOwner from "../../components/Popups/RegisterOwner/RegisterOwner";

const OwnerModal = ({ visible, form, onCancel, onRegister }) => {
  return (
    <Modal
      title={<div className="custom-modal-title">Register Owner</div>}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <RegisterOwner
        form={form}
        onCancel={onCancel}
        isEditMode={false}
        onRegisterOrUpdateOwner={onRegister}
      />
    </Modal>
  );
};

export default OwnerModal;

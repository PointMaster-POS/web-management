import React, { useState } from "react";
import { Steps, Button, Modal } from "antd";
import "./HeroSection.css";

const { Step } = Steps;

const HeroSection = ({ onShowBusinessModal }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Function to handle modal visibility
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to handle next step
  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  // Function to handle previous step
  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  // Step descriptions with images
  const stepsContent = [
    {
      title: "Step 1: Register Business",
      content: (
        <>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/pointmaster-79d9a.appspot.com/o/utils%2F2.png?alt=media&token=551300da-4309-4d84-87a4-1e247e8ee39c"
            alt="Step 1"
            className="step-image"
          />
          <p>
            To start, visit the registration page and enter your business
            details, such as business name and email address. Ensure the
            information is accurate as it will be used for communication and
            future verification.
          </p>
        </>
      ),
    },
    {
      title: "Step 2: Verify Email",
      content: (
        <>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/pointmaster-79d9a.appspot.com/o/utils%2F3.png?alt=media&token=b6cae6bc-b937-4967-a599-6ae035c48735"
            alt="Step 2"
            className="step-image"
          />
          <p>
            After registration, you'll receive an email with a verification
            code. Check your inbox and enter the verification code on the
            provided page to confirm your email address.
          </p>
        </>
      ),
    },
    {
      title: "Step 3: Enter Business Owner Details",
      content: (
        <>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/pointmaster-79d9a.appspot.com/o/utils%2F4.png?alt=media&token=edded173-cf34-4fe1-85e8-79a9447ee58a"
            alt="Step 3"
            className="step-image"
          />
          <p>
            After verifying your email, you will be prompted to enter the
            business owner's details. Provide the owner's full name, contact
            number, and any other relevant information to complete the setup.
          </p>
        </>
      ),
    },
  ];

  return (
    <section className="hero-section">
      <div className="overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          Revolutionize Your Sales Experience with
          <br />
          <span>PointMaster</span>
        </h1>
        <p className="hero-subtitle">
          Streamline Transactions, Enhance Efficiency,
          <br />
          Grow Your Business Improve Customer Experience,
          <br/ >
          Manage Inventory, and More 
          <br />
          With Ease
        </p>
        <button className="cta-button" onClick={showModal}>
          JOIN POINTMASTER NOW
        </button>
      </div>

      {/* Ant Design Steps Modal */}
      <Modal
        title="How to Register Your Business"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800} 
      >
        <Steps current={currentStep}>
          {stepsContent.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>

        <div className="steps-content" style={{ marginTop: "20px" }}>
          {stepsContent[currentStep].content}
        </div>

        <div className="steps-action" style={{ marginTop: "20px" }}>
          {currentStep < stepsContent.length - 1 && (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          )}
          {currentStep === stepsContent.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                onShowBusinessModal();
                handleCancel();
                setCurrentStep(0);
              }}
            >
              Register Business
            </Button>
          )}
          {currentStep > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={prev}>
              Previous
            </Button>
          )}
        </div>
      </Modal>
    </section>
  );
};

export default HeroSection;

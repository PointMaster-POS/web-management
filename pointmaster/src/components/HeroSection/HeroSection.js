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
            src="https://via.placeholder.com/400x200"
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
            src="https://via.placeholder.com/400x200"
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
            src="https://via.placeholder.com/400x200"
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
          Streamline Transactions, Enhance Efficiency, and Grow Your Business
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

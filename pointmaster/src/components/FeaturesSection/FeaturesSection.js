import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingCartOutlined, GiftOutlined, LockOutlined, AppstoreOutlined } from "@ant-design/icons";
import "./FeaturesSection.css";
//apple android web 
import { AppleOutlined, AndroidOutlined , WindowsOutlined} from "@ant-design/icons";

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const featureCardsRef = useRef([]);

  useEffect(() => {
    gsap.from(featureCardsRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".features-section",
        start: "top 50%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const features = [
    {
      title: "E-commerce Integration",
      description: "Seamless connection between your online store and various e-commerce platforms.",
      icon: <ShoppingCartOutlined />,
    },
    {
      title: "Loyalty Programs",
      description: "Customizable loyalty programs to incentivize customer loyalty and enhance experiences.",
      icon: <GiftOutlined />,
    },
    {
      title: "Security",
      description: "Advanced security measures to protect transactions and customer data.",
      icon: <LockOutlined />,
    },
    {
      title: "Inventory Management",
      description: "Robust systems to track and optimize inventory throughout your supply chain.",
      icon: <AppstoreOutlined />,
    },
  ];

  const applications = [
    {
      name: "For Business Owners and Managers",
      description: "Manage your business operations, track sales, and analyze customer data.",
      platform : ["Web"],
    },
    {
        name: "For Cashiers and Sales Associates",  
        description: "Process transactions, view customer profiles, and manage inventory. Scan barcodes and accept payments.",
        platform : ["Web", "IOS", "Android"],
    },
    {
        name: "For Customers",
        description: "View promotions, earn rewards, and make purchases. Access your loyalty points and redeem rewards.",
        platform : ["IOS", "Android"],
    },
    
  ];

  return (
    <section className="features-section">
      <div className="heading-container">
        <h1 className="section-heading">Features & Applications</h1>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature"
            ref={(el) => (featureCardsRef.current[index] = el)}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="application-card">
        <img src="https://firebasestorage.googleapis.com/v0/b/pointmaster-79d9a.appspot.com/o/utils%2Fapplication-image.png?alt=media&token=0af27c57-28b5-4dd4-a0ca-d3196833d7ee" alt="Applications" className="application-image" /> {/* Replace with your actual image path */}
        <div className="application-details">
          {applications.map((app, index) => (
            <div key={index} className="application-item">
              <h3 className="application-name">{app.name}</h3>
             
                <div className="platform-icons">
                   {app.platform.map((platform, index) => (
                    <span key={index} className="platform-icon">
                        {platform === "IOS" && <AppleOutlined />}
                        {platform === "Android" && <AndroidOutlined />}
                        {platform === "Web" && <WindowsOutlined />}
                        
                    </span>
                    ))} 
                </div>
              <p className="application-description">{app.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

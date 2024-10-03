import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingCartOutlined, GiftOutlined, LockOutlined, AppstoreOutlined } from "@ant-design/icons";
import "./FeaturesSection.css";

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
        start: "top 50%",  // Start animation when the section reaches 50% of the viewport height
        toggleActions: "play none none none",  // Play animation on scroll
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

  return (
    <section className="features-section">
      <div className="heading-container">
        <h1 className="section-heading">Features</h1>
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
    </section>
  );
};

export default FeaturesSection;

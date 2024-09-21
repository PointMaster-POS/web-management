// components/Registration/Footer.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  test("renders contact section with email and phone", () => {
    render(<Footer />);

    // Check that Contact Us section is rendered
    const contactHeading = screen.getByText("Contact Us");
    expect(contactHeading).toBeInTheDocument();

    // Check that email is rendered (more flexible matcher)
    const email = screen.getByText((content, element) =>
      content.includes("support@pointmaster.com")
    );
    expect(email).toBeInTheDocument();

    // Check that phone number is rendered
    const phone = screen.getByText((content, element) =>
      content.includes("+1 234 567 890")
    );
    expect(phone).toBeInTheDocument();
  });

  test("renders social media icons with correct links", () => {
    render(<Footer />);

    // Check if Facebook link is rendered and has correct href
    const facebookLink = screen.getByRole("link", { name: /facebook/i });
    expect(facebookLink).toHaveAttribute("href", "https://facebook.com");

    // Check if Twitter link is rendered and has correct href
    const twitterLink = screen.getByRole("link", { name: /twitter/i });
    expect(twitterLink).toHaveAttribute("href", "https://twitter.com");

    // Check if LinkedIn link is rendered and has correct href
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com");
  });

  test("renders copyright section", () => {
    render(<Footer />);

    // Check if copyright text is rendered
    const copyrightText = screen.getByText(
      /© 2024 PointMaster. All Rights Reserved./i
    );
    expect(copyrightText).toBeInTheDocument();
  });
});

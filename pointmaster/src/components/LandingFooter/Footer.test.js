import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe("Footer component", () => {
  test("renders contact section with email and phone", () => {
    act(() => {
      render(<Footer />);
    });

    // Check that Contact Us section is rendered
    const contactHeading = screen.getByText("Contact Us");
    expect(contactHeading).toBeInTheDocument();

    // Check email and phone
    const email = screen.getByText("Email: support@pointmaster.com");
    const phone = screen.getByText("Phone: +1 234 567 890");
    expect(email).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
  });

  test("renders social media icons", () => {
    act(() => {
      render(<Footer />);
    });

    // Check that the social media links are rendered
    const facebookIcon = screen.getByRole('link', { name: /facebook/i });
    const twitterIcon = screen.getByRole('link', { name: /twitter/i });
    const linkedinIcon = screen.getByRole('link', { name: /linkedin/i });

    expect(facebookIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
    expect(linkedinIcon).toBeInTheDocument();
  });

  test("renders footer copyright text", () => {
    act(() => {
      render(<Footer />);
    });

    // Check that the copyright text is rendered
    const copyrightText = screen.getByText(/© 2024 PointMaster. All Rights Reserved./i);
    expect(copyrightText).toBeInTheDocument();
  });
});

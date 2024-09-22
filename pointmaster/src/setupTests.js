// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom'; // Custom matchers for Testing Library

// Mock for window.matchMedia
global.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
}));

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText(/Interactive Logic Gates Learning Platform/i)).toBeInTheDocument();
  });

  it('renders technology stack features', () => {
    render(<App />);
    expect(screen.getByText(/React 19 \+ TypeScript/i)).toBeInTheDocument();
    expect(screen.getByText(/Framer Motion Animations/i)).toBeInTheDocument();
    expect(screen.getByText(/Tailwind CSS Styling/i)).toBeInTheDocument();
  });

  it('renders interactive demo section', () => {
    render(<App />);
    expect(screen.getByText(/Interactive Demo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Logic Gate/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset Circuit/i })).toBeInTheDocument();
  });
});
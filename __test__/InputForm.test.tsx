import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputForm from '../components/inputForm/InputForm';

describe('InputForm', () => {
  it('renders input fields and submit button', () => {
    render(<InputForm onSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/Stock Symbol/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fetch Data/i })).toBeInTheDocument();
  });

  it('calls onSubmit with correct data', () => {
    const mockOnSubmit = jest.fn();
    render(<InputForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Stock Symbol/i), { target: { value: 'CBOE' } });
    fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2023-01-10' } });
    fireEvent.click(screen.getByRole('button', { name: /Fetch Data/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith('CBOE', '2023-01-01', '2023-01-10');
  });

  it('alerts if fields are missing', () => {
    window.alert = jest.fn();
    render(<InputForm onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /Fetch Data/i }));
    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields.');
  });
});

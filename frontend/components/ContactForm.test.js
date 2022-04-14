import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    // Arrange
    render(<ContactForm />);
    
    // Act
    const header = screen.queryByText(/contact form/i);
    
    // Assert
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    // Arrange
    render(<ContactForm />);

    // Act
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, "not5");
    const errorsText = screen.queryByText(/firstName must have at least 5 characters./i);

    // Assert
    expect(firstNameInput).toHaveValue("not5");
    expect(errorsText).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    // Arrange
    render(<ContactForm />);

    // Act
    const submitButton = screen.queryByRole("button");
    userEvent.click(submitButton);
    
    const errors = screen.getAllByText(/error:/i);

    // Assert
    expect(errors).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    // Arrange
    render(<ContactForm />);
    
    // Act
    const submitButton = screen.queryByRole("button");

    
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, "This IsOver5");

    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, "MyLast Name");

    userEvent.click(submitButton);

    const errors = screen.getAllByText(/error:/i);

    // Assert
    expect(errors).toHaveLength(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    // Arrange
    render(<ContactForm />);

    // Act
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "lmaogmail.com");

    const errorText = screen.queryByText(/email must be a valid email address./i);

    // Assert
    expect(errorText).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    // Arrange
    render(<ContactForm />);

    // Act
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, "Raylen");
    
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "raylen@gmail.com");
    
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const errorText = screen.queryByText(/lastName is a required field./i);

    // Assert
    expect(errorText).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    // Arrange
    render(<ContactForm />);

    // Act
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, "Raylen");

    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, "Burke");
    
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "raylen@gmail.com");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const messageDisplay = screen.queryByTestId(/messageDisplay/i);

    // Assert
    expect(messageDisplay).not.toBeInTheDocument();
    
});

test('renders all fields text when all fields are submitted.', async () => {
    // Arrange
    render(<ContactForm />);

    // Act
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, "Raylen");

    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, "Burke");
    
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "raylen@gmail.com");

    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, "This Is My Info");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const firstnameDisplay = screen.queryByTestId(/firstnameDisplay/i);
    const lastNameDisplay = screen.queryByTestId(/lastnamedisplay/i);
    const emailDisplay = screen.queryByTestId(/emaildisplay/i);
    const messageDisplay = screen.queryByTestId(/messagedisplay/i);

    // Assert
    expect(firstnameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).toBeInTheDocument();

});

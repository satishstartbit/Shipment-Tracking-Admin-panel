import React from "react";  // Import React
import { FormGroup, Label, Input } from "reactstrap";  // Import components from Reactstrap
import "./CheckboxInput.css";  // Import custom CSS for styling

// CheckboxInput component to create a customizable checkbox
const CheckboxInput = ({
  check = false,  // Default value for the checkbox (checked or unchecked)
  setChecked,  // Function to update the checkbox state
  label = null,  // Optional label for the checkbox
  disabled = false,  // Whether the checkbox is disabled
  className = "",  // Additional CSS class for styling the checkbox input
  formGroupClassName = "",  // Additional CSS class for styling the FormGroup container
  id = "check-box-input-default-id",  // ID for the checkbox input (default if not provided)
}) => {
  return (
    // FormGroup component from Reactstrap to group the checkbox input and label
    <FormGroup check inline className={`check-box ${formGroupClassName}`}>
      {/* Checkbox Input */}
      <Input
        id={id}  // Set the id for the checkbox input
        type="checkbox"  // Set the input type to checkbox
        className={className}  // Apply the additional CSS class
        onChange={() => {
          setChecked(!check);  // Toggle the checkbox state when clicked
        }}
        aria-required="true"  // Mark the checkbox as required for accessibility
        checked={check}  // Set the checkbox checked state based on the `check` prop
        tabIndex={0}  // Ensure the checkbox is focusable with the keyboard
        disabled={disabled}  // Disable the checkbox if `disabled` is true
      />
      {/* Label for the checkbox, shown only if `label` is provided */}
      {label && (
        <Label
          tabIndex={0}  // Ensure the label is focusable with the keyboard
          check  // This prop marks the label as associated with a checkbox input
          inline  // Display the label inline with the checkbox
          htmlFor={id}  // Associate the label with the checkbox input via id
          className={` check-box-input-label`}  // Apply a CSS class for styling the label
        >
          {label}  {/* Display the label text */}
        </Label>
      )}
    </FormGroup>
  );
};

// Export the component to be used in other parts of the app
export default CheckboxInput;

import { FormGroup, Input } from "reactstrap";  // Import FormGroup and Input from Reactstrap
import "./InputWithAddOn.css";  // Import custom CSS styles for the input
import uuid from "react-uuid";  // Import uuid for generating unique IDs
import { useEffect, useState } from "react";  // Import React hooks for managing state and side effects

// InputWithAddOnMultiple component - allows multiple dynamic form group behaviors, including custom validation and add-ons
const InputWithAddOnMultiple = ({
  hasAddOn = null,  // Add-on elements (e.g., left or right icons/text to be added to the input)
  value = "",  // The current value of the input field
  setValue,  // Function to update the value of the input field
  placeholder = "",  // Placeholder text for the input field
  feedbackMessage = "",  // Feedback message like error/success
  feedbackType = "none",  // Type of feedback (none, success, error)
  isTouched = false,  // Whether the input has been touched
  setIsTouched,  // Function to set the touched state
  label = "",  // Label text for the input field
  validateHandler = null,  // Optional validation handler function
  disabled,  // Flag to disable the input
  type = "text",  // The type of input field (text, number, integer)
  className = "",  // Custom CSS class for styling
  isRequired = false,  // Flag to mark the input as required
  name = null,  // Name attribute for the input field
  id = null,  // ID for the input field
  extraProps = {},  // Additional props to be passed to the input
  onBlurAction = () => { },  // Custom action to run on blur (when the input loses focus)
  dynamicFormGroup = null,  // Optionally provide a custom FormGroup element for dynamic form groups
}) => {
  const DynamicElement = dynamicFormGroup ?? FormGroup; // If dynamicFormGroup is provided, use it, otherwise use FormGroup
  const [uuidName, setUuidName] = useState(null); // State for generating unique UUID for the input's id
  // useEffect hook to generate a unique ID if neither 'id' nor 'name' is provided
  useEffect(() => {
    if (!id || !name) {
      setUuidName(uuid()); // Set a unique ID if none is provided
    }
  }, []);

  return (
    <DynamicElement>
      {label !== "" && (
        <label
          htmlFor={name ?? uuidName}
          className="ml-1  truncate w-full "
          aria-labelledby={id ?? uuidName}
          style={{
            userSelect: "none",
            fontSize: "12px",
            fontWeight: "500",
            color: "#0F0F0F",
          }}
        >
          {label}
          {isRequired && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="my-2" style={{ position: "relative" }}>
        <Input
          autoComplete="off"
          id={id ?? uuidName}
          name={name ?? uuidName}
          className={`InputWithAddOnMultiple_input ${hasAddOn?.left && "has_left_add_on"
            } ${hasAddOn?.right && "has_right_add_on"
            } ${className} input-background-color-default input-with-add-on-default `}
          type={type === "integer" ? "number" : type}
          disabled={disabled}
          value={value}
          aria-required="true"
          aria-label={label}
          title={value}
          tabIndex={0}
          {...extraProps}
          onChange={(e) => {
            let newValue = e.target.value;
            if (type === "integer") {
              newValue = newValue?.replace(/[^0-9]/g, '')
            }
            setValue(newValue);

            if (isTouched && validateHandler !== null) {
              validateHandler(newValue);
            }
          }}
          placeholder={placeholder}
          onBlur={(e) => {

            let newValue = value;
            if (type === "integer") {
              newValue = newValue?.replace(/[^0-9]/g, '')
            }


            if (type === "text") {
              setValue((newValue ?? "").trim());
            } else {
              setValue(newValue ?? "");
            }

            validateHandler && validateHandler(newValue);
            setIsTouched(true);
            onBlurAction(newValue);

            return e
          }}
          valid={feedbackType === "success"}
          invalid={feedbackType === "error"}
        />
        {hasAddOn?.left}
        {hasAddOn?.right}
      </div>
      {feedbackType !== "none" && (
        <div
          className={feedbackType + "-feedback-class  m-0 p-0 ml-1 w-full"}
          style={{ userSelect: "none" }}
        >
          {feedbackMessage}
        </div>
      )}
    </DynamicElement>
  );
};


export default InputWithAddOnMultiple;

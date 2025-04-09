
import React, { useEffect, useState } from "react";  // Import React and hooks
import Datetime from "react-datetime";  // Import Datetime component for date/time selection
import "react-datetime/css/react-datetime.css";  // Import CSS for Datetime component
import uuid from "react-uuid";  // Import UUID for generating unique identifiers
import { FormGroup } from "reactstrap";  // Import FormGroup from Reactstrap for form grouping
import "../forminputs/InputWithAddOn.css";  // Import custom CSS for the input with add-ons
import moment from "moment";  // Import Moment.js for date formatting and manipulation
const DateTimeInputMultiple = ({
  value = "",  // Default value for the input
  setValue,  // Function to update the value
  feedbackMessage = "",  // Feedback message to show (error or success)
  feedbackType = "none",  // Type of feedback (error, none, etc.)
  isTouched = false,  // Flag to check if the input was interacted with
  setIsTouched = () => { },  // Function to set touched state
  label = "",  // Label for the input
  validateHandler = null,  // Validation handler to call on value change
  className = "",  // Additional class names for styling
  isRequired = false,  // Whether the field is required
  name = null,  // Name attribute for the input
  id = null,  // ID attribute for the input
  inputProps = {},  // Additional properties to pass to the input
  momentFormat = "",  // Moment.js format string for formatting the date
  onBlurAction = () => { },  // Action to take on blur event
  disabled = false,  // Whether the input is disabled or not
  ...extraProps  // Any other extra props
}) => {
  const [uuidName, setUuidName] = useState(null);   // State to hold a unique identifier (UUID) if name or id are not provided
  // Effect hook to generate a UUID when the component is first rendered if no id or name is provided
  useEffect(() => {
    if (!id || !name) {
      setUuidName(uuid());  // Set UUID for id and name
    }
  }, []);

  return (
    <FormGroup>
      {/* Render label if it exists */}
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
      <div style={{ position: "relative" }}>
        <Datetime
          value={moment(value).isValid() ? moment(value) : null}
          closeOnSelect={!(extraProps?.timeFormat == true)}
          className={` ${className}  ${feedbackType == "error"
            ? "date-time-input-is-not-valid"
            : "is-valid"
            } input-background-color-default default-border-radius has_left_add_on_date_time `}
          onChange={async (e) => {
            const parsedDate = moment(e, moment.ISO_8601, true);
            let stringDate = parsedDate.isValid() ? e.toISOString() : null;
            setValue(stringDate);
            if (isTouched && validateHandler != null) {
              validateHandler(stringDate);
            }
          }}
          onClose={(e) => {
            let stringDate = moment(value).isValid() ? value : null;
            validateHandler && validateHandler(stringDate);
            onBlurAction(stringDate);
            setIsTouched(true);
            return e
          }}
          inputProps={{
            ...inputProps,
            id: id ?? uuidName,
            name: name ?? uuidName,
            "aria-required": "true",
            "aria-label": label,
            title: label,
            tabIndex: 0,
            autoComplete: "false",
            value: moment(value).isValid()
              ? moment(value).format(momentFormat)
              : "",
            disabled: disabled,

          }}
          {...extraProps}
        />
      </div>
      {feedbackType != "none" && (
        <div
          className={feedbackType + "-feedback-class  m-0 p-0 ml-1 w-full"}
          style={{ userSelect: "none" }}
        >
          {feedbackMessage}
        </div>
      )}
    </FormGroup>
  );
};


export default DateTimeInputMultiple;

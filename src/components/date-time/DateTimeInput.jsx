import React, { useEffect, useState } from "react";  // Importing React and hooks
import Datetime from "react-datetime";  // Importing Datetime picker component
import "react-datetime/css/react-datetime.css";  // Importing the CSS for the Datetime component
import uuid from "react-uuid";  // Importing uuid to generate unique identifiers
import { FormGroup } from "reactstrap";  // Importing FormGroup from Reactstrap for form grouping
import "../forminputs/InputWithAddOn.css";  // Importing custom CSS for the input with add-ons
import { ReactComponent as CancelIcon } from "../../assets/icons/Cancel.svg";  // Importing cancel icon as React component
import { ReactComponent as CalendarIcon } from "../../assets/icons/CalendarIcon.svg";  // Importing calendar icon as React component
import moment from "moment";  // Importing moment.js for date manipulation
const DateTimeInput = ({
  value = "",  // Default value for the input
  setValue,  // Function to update the value
  feedbackMessage = "",  // Feedback message to display under the input
  feedbackType = "none",  // Type of feedback (none, error, etc.)
  isTouched = false,  // Flag to check if the field has been interacted with
  setIsTouched,  // Function to set the touched state
  label = "",  // Label for the input
  validateHandler = null,  // Validation handler function
  className = "",  // Additional CSS classes for styling
  isRequired = false,  // Whether the field is required
  name = null,  // Name attribute for the input
  id = null,  // ID attribute for the input
  inputProps = {},  // Additional input props
  momentFormat = "",  // Moment.js format for the input value
  disabled = false,  // Whether the input is disabled
  ...extraProps  // Any other extra properties passed
}) => {
 
  const [uuidName, setUuidName] = useState(null); // State to hold a unique UUID for the input
  useEffect(() => {
     // Generate UUID if id or name is not provided
    if (!id || !name) {
      setUuidName(uuid());
    }
  }, []);

  return (
    <FormGroup>
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
          closeOnSelect={!(extraProps?.timeFormat == true)}
          value={moment(value).isValid() ? moment(value) : null}
          className={` ${className}  ${feedbackType == "error"
              ? "date-time-input-is-not-valid"
              : "is-valid"
            } input-background-color-default default-border-radius has_left_add_on_date_time`}
          onChange={async (e) => {
            const parsedDate = moment(e, moment.ISO_8601, true);
            let stringDate = parsedDate.isValid() ? e.toISOString() : null;
            setValue(stringDate);
            if (isTouched && validateHandler != null) {
              validateHandler(stringDate);
            }
          }}
          onClose={(e) => {
            validateHandler && validateHandler(value);
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
            value: value ? moment(value).format(momentFormat) : "",
            disabled: disabled,
          }}
          {...extraProps}
        />
        {!disabled && (
          <CancelIcon
            className="input_addon_icon_right me-1"
            onClick={() => {
              validateHandler && validateHandler(null);
              setValue(null);
            }}
          />
        )}

        <CalendarIcon className="input_addon_icon_left_date_time_calendar " />
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


export default DateTimeInput;



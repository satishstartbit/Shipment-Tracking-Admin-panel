import { FormGroup, Input } from "reactstrap";  // Import FormGroup and Input from Reactstrap
import "./InputWithAddOn.css";  // Import custom CSS for styling
import uuid from "react-uuid";  // Import UUID for generating unique IDs
import { useEffect, useState } from "react";  // Import React hooks for state and side effects
const InputWithAddOn = ({
    hasAddOn = null,  // Add-on elements like left or right icons or text
    value = "",  // Current value of the input field
    setValue,  // Function to set the value of the input field
    placeholder = "",  // Placeholder text for the input field
    feedbackMessage = "",  // Feedback message (e.g., error or success)
    feedbackType = "none",  // Type of feedback (none, success, error)
    isTouched = false,  // Flag to indicate if the input has been touched
    setIsTouched,  // Function to set the touched state
    label = "",  // Label for the input field
    validateHandler = null,  // Optional validation handler function
    disabled,  // Boolean flag to disable the input field
    type = "text",  // Type of the input field (text, number, integer, etc.)
    className = "",  // Additional custom CSS class for styling
    isRequired = false,  // Flag to mark the input field as required
    name = null,  // Name for the input field (used for form submissions)
    id = null,  // ID for the input field
    extraProps = {},  // Extra properties to pass to the input element
}) => {
    // State to generate a unique ID for the input if no id or name is provided
    const [uuidName, setUuidName] = useState(null);

    useEffect(() => {
        // Set a UUID as the id if neither id nor name is provided
        if (!id || !name) {
            setUuidName(uuid());
        }
    }, []);
    
    // Function to remove leading zeros from a number (for 'number' type input)
    const removeLeadingZeros = (number) => {
        if (/^0$|^0(\.0+)?$/.test(number)) {
            return number;
        }
        return number.replace(/^0+(?!\.)/, '');
    };

    const handleChange = (e) => {
        let newValue = e?.target?.value;

        if (type === "number") {
            if (newValue === "" || /^[0-9]*\.?[0-9]*$/.test(newValue)) {

                setValue(newValue);
            } else {
                return;
            }
        } else if (type === "integer") {
            setValue(newValue?.replace(/[^0-9]/g, ''));
        } else {
            setValue(newValue);
        }

        if (isTouched && validateHandler !== null) {
            validateHandler(newValue);
        }
    };

    const handleBlur = (e) => {
        let trimmedValue = (value ? value + "" : "").trim();
        if (type === "text") {
            setValue(trimmedValue);
        }

        if (type === "number") {
            setValue(removeLeadingZeros(trimmedValue));
        }

        validateHandler && validateHandler(trimmedValue);
        setIsTouched(true);
        return e
    };

    return (
        <FormGroup>
            {label !== "" && (
                <label
                    htmlFor={name ?? uuidName}
                    className="ml-1 truncate w-full"
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
                <Input
                    autoComplete="off"
                    id={id ?? uuidName}
                    name={name ?? uuidName}
                    className={`InputWithAddOn_input ${hasAddOn?.left ? "has_left_add_on" : ""
                        } ${hasAddOn?.right ? "has_right_add_on" : ""
                        } ${className} input-background-color-default input-with-add-on-default`}
                    type={type}
                    disabled={disabled}
                    value={value}
                    aria-required="true"
                    aria-label={label}
                    title={label}
                    tabIndex={0}
                    {...extraProps}
                    onChange={handleChange}
                    placeholder={placeholder}
                    onBlur={handleBlur}
                    valid={feedbackType === "success"}
                    invalid={feedbackType === "error"}
                />
                {hasAddOn?.left}
                {hasAddOn?.right}
            </div>
            {feedbackType !== "none" && (
                <div
                    className={`${feedbackType}-feedback-class m-0 p-0 ml-1 w-full`}
                    style={{ userSelect: "none" }}
                >
                    {feedbackMessage}
                </div>
            )}
        </FormGroup>
    );
};


export default InputWithAddOn;

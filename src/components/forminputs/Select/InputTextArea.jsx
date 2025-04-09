import { FormGroup, Input } from "reactstrap";
import uuid from "react-uuid";
import { useEffect, useState } from "react";
const InputTextArea = ({
  hasAddOn = null,
  value = "",
  setValue,
  placeholder = "",
  feedbackMessage = "",
  feedbackType = "none",
  isTouched = false,
  setIsTouched,
  label = "",
  validateHandler = null,
  disabled,
  type = "text",
  className = "",
  isRequired = false,
  name = null,
  id = null,
  extraProps = {},
  minLength = 3
}) => {
  const [uuidName, setUuidName] = useState(null);
  useEffect(() => {
    if (!id || !name) {
      setUuidName(uuid());
    }
  }, []);
  return (
    <FormGroup>
      {label !== "" && (
        <label
          htmlFor={name ?? uuidName}
          style={{
            userSelect: "none",
            fontSize: "12px",
            fontWeight: "500",
            color: "#0F0F0F",
          }}
          className="ml-1  truncate w-full "
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
          className={`${hasAddOn?.left && "has_left_add_on"} ${
            hasAddOn?.right && "has_right_add_on"
          } ${className} input-background-color-default`}
          type="textarea"
          disabled={disabled}
          rows={minLength}
          value={value}
          {...extraProps}
          onChange={(e) => {
            setValue(e.target.value);
            if (isTouched && validateHandler !== null) {
              validateHandler(e.target.value);
            }
          }}
          placeholder={placeholder}
          onBlur={() => {
            if (type === "text") {
              setValue((value ?? "").trim());
            }
            validateHandler && validateHandler(value);
            setIsTouched(true);
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
    </FormGroup>
  );
};

export default InputTextArea;

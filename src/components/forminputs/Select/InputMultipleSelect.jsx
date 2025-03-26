import { MultiSelect } from "react-multi-select-component";
import { FormGroup } from "reactstrap";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

const InputMultipleSelect = ({
  options = [], 
  value = "",
  setValue,
  placeholder = "Select...",
  feedbackMessage = "",
  feedbackType = "none",
  label = "",
  validateHandler = null,
  disabled = false,
  isTouched = false,
  setIsTouched,
  isRequired = false,
  extraProps = {},
  name = null,
  id = null,
  hasSelectAll = false,
  isLoading = false,
  labelClassName = "",
  overrideStrings = {},
  heightClass = null,
  hasExpand = false,
}) => {
  const [uuidName, setUuidName] = useState(null);
  useEffect(() => {
    if (!id || !name) {
      setUuidName(uuid());
    }
  }, []);
  return (
    <FormGroup
      className={` ${hasExpand ? "expand-multiple-select-dropdown" : ""} ${
        feedbackType === "error" ? "input-searchable-select-error" : ""
      }  input_select_tab${heightClass ? "_" + heightClass : ""} ${
        disabled ? "input_select_tab_disabled" : ""
      } `}
    >
      {label !== "" && (
        <label
          className={` ${labelClassName} ml-1  truncate w-full `}
          htmlFor={name ?? uuidName}
          style={{
            userSelect: "none",
            fontSize: "12px",
            fontWeight: "500",
            color: "#0F0F0F",
          }}
        >
          {label} {isRequired && <span className="text-red-500"> *</span>}
        </label>
      )}
      <MultiSelect
        isLoading={isLoading}
        options={options}
        value={value}
        id={id ?? uuidName}
        disabled={disabled}
        hasSelectAll={hasSelectAll}
        onChange={(e) => {
          setValue(e);
          if (isTouched && validateHandler !== null) {
            validateHandler(e);
          }
        }}
        onMenuToggle={() => {
          validateHandler && validateHandler(value);
          setIsTouched(true);
        }}
        labelledBy={placeholder}
        overrideStrings={{ ...overrideStrings, selectSomeItems: placeholder }}
        className=" "
        {...extraProps}
      />

      {feedbackType !== "none" && (
        <div className={feedbackType + "-feedback-class  m-0 p-0 ml-1 w-full"}>
          {feedbackMessage}
        </div>
      )}
    </FormGroup>
  );
};



export default InputMultipleSelect;

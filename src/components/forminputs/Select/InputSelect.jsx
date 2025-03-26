import { FormGroup } from "reactstrap";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import Select from "react-select";

const InputSelect = ({
  removeXIcon = true,
  options = [],
  value = "",
  setValue,
  feedbackMessage = "",
  feedbackType = "none",
  label = "",
  validateHandler = null,
  disabled = false,
  isTouched = false,
  setIsTouched = () => { },
  isRequired = false,
  extraProps = {},
  name = null,
  id = null,
  labelClassName = "",
  isLoading = false,
  hasExpand = false,
  heightClass = null,
  dynamicFormGroup = null,
  inputCssClass = ''
}) => {

  const DynamicElement = dynamicFormGroup ?? FormGroup;
  const [uuidName, setUuidName] = useState(null);
  const [ClearSelectedIconObj, setClearSelectedIconObj] = useState({});

  useEffect(() => {
    if (!id || !name) {
      setUuidName(uuid());
    }
    if (removeXIcon) {
      setClearSelectedIconObj({
        ClearSelectedIcon: removeXIcon,
      });
    } else {
      setClearSelectedIconObj({});
    }
  }, [id, name, removeXIcon]);

  // Mapping options for react-select
  const formattedOptions = (options ?? [])?.map(option => ({
    value: option.value,
    label: option.label
  }));

  // Mapping value for react-select
  const selectedOption = formattedOptions.find(option => option.value === value);

  return (
    <DynamicElement
      className={` ${hasExpand ? "expand-multiple-select-dropdown" : ""} ${feedbackType === "error" ? "input-searchable-select-error" : ""} input_select_tab${heightClass ? "_" + heightClass : ""} ${disabled ? "input_select_tab_disabled" : ""}`}
    >
      {label !== "" && (
        <label
          className={` ${labelClassName} ml-1 truncate w-full `}
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

      <Select
        {...ClearSelectedIconObj}
        isLoading={isLoading}
        options={formattedOptions}
        value={selectedOption || ""}
        id={id ?? uuidName}
        isDisabled={disabled}
        onChange={(selectedOption) => {
          const newValue = selectedOption ? selectedOption.value : "";
          setValue(newValue);
          if (isTouched && validateHandler !== null) {
            validateHandler(newValue);
          }
        }}
        onBlur={() => setIsTouched(true)}
        placeholder="Select..."
        isClearable={false}
        closeMenuOnSelect={true}
        className={inputCssClass}
        {...extraProps}
      />

      {feedbackType !== "none" && (
        <div className={feedbackType + "-feedback-class m-0 p-0 ml-1 w-full"}>
          {feedbackMessage}
        </div>
      )}
    </DynamicElement>
  );
};

export default InputSelect;

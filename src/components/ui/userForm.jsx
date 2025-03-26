import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import useFetchAPI from "../../hooks/useFetchAPI";
import useInputComponent from "../../hooks/useInputComponent"
import InputWithAddOnMultiple from "../forminputs/InputWithAddOnMultiple"
import DateTimeInputMultiple from "../date-time/DateTimeInputMultiple";
import CheckboxInput from "../forminputs/CheckboxInput";
import { Label } from "reactstrap";
import InputSelect from "../forminputs/Select/InputSelect"
export function AddUserDialog({ isOpen, setIsOpen }) {

  const [getRoleResponse, getRoleHandler] =
    useFetchAPI(
      {
        url: "/role",
        method: "GET",
      },
      (e) => {
        return e?.roles?.map((item) => {
          return {
            label: item?.name, value: item?._id
          }
        });
      },
      (e) => {
        return e;
      }
    );


  useEffect(() => {
    if (isOpen) {
      getRoleHandler()
    }
  }, [isOpen])


  // Firstname
  let FirstNameInput = useInputComponent();
  let FirstNameValidator = (value) => {
    if (value === "" || !value) {
      FirstNameInput.setFeedbackMessage("Field Required!");
      FirstNameInput.setMessageType("error");
      return false;
    }
    FirstNameInput.setFeedbackMessage("");
    FirstNameInput.setMessageType("none");
    return true;
  };




  // Lastname
  let LastNameInput = useInputComponent();
  let LastNameValidator = (value) => {
    if (value === "" || !value) {
      LastNameInput.setFeedbackMessage("Field Required!");
      LastNameInput.setMessageType("error");
      return false;
    }
    LastNameInput.setFeedbackMessage("");
    LastNameInput.setMessageType("none");
    return true;
  };

  // Email
  let EmailInput = useInputComponent();
  let EmailValidator = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      EmailInput.setFeedbackMessage("Invalid Email Format!");
      EmailInput.setMessageType("error");
      return false;
    }
    EmailInput.setFeedbackMessage("");
    EmailInput.setMessageType("none");
    return true;
  };



  // PhoneNumber
  let PhoneNumberInput = useInputComponent();
  let PhoneNumberValidator = (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value)) {
      PhoneNumberInput.setFeedbackMessage("Invalid Phone Number!");
      PhoneNumberInput.setMessageType("error");
      return false;
    }
    PhoneNumberInput.setFeedbackMessage("");
    PhoneNumberInput.setMessageType("none");
    return true;
  };

  // Password
  let PasswordInput = useInputComponent();
  let PasswordValidator = (value) => {
    if (value.length < 6) {
      PasswordInput.setFeedbackMessage("Password must be at least 6 characters!");
      PasswordInput.setMessageType("error");
      return false;
    }
    PasswordInput.setFeedbackMessage("");
    PasswordInput.setMessageType("none");
    return true;
  };



  // Date of Birth (DOB)
  let DobInput = useInputComponent();
  let DobValidator = (value) => {
    if (value === "" || !value) {
      DobInput.setFeedbackMessage("Field Required!");
      DobInput.setMessageType("error");
      return false;
    }
    DobInput.setFeedbackMessage("");
    DobInput.setMessageType("none");
    return true;
  };

  const [Gender, setGender] = useState("male")

  const changegander = (type) => {
    if (type !== Gender) {
      if (Gender === "male") {
        setGender("female")
      } else {
        setGender("male")
      }
    }
    return type

  }

  const [selectlanguage, setSelectlanguage] = useState();
  const [selectlanguageischeck, setSelectlanguageischeck] = useState(false);
  const [languageFeedbackMessage, setLanguageFeedBackMessage] = useState({
    type: "info",
    message: "",
  });
  const languageSelectValidater = (value) => {
    if (value === "" || !value) {
      setLanguageFeedBackMessage({
        type: "error",
        message: "This field is required!",
      });
      return false;
    }
    setLanguageFeedBackMessage({ type: "info", message: "" });

    return true;
  };






  const [CreateUserResponse, CreateUserHandler] =
    useFetchAPI(
      {
        url: "/users/registeruser",
        method: "POST",
      },
      (e) => {
        return e;
      },
      (e) => {
        return e;
      }
    );


  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOpen(false);


    let isFirstNameValidator = FirstNameValidator(FirstNameInput.enteredValue)
    let isLastNameValidator = LastNameValidator(LastNameInput.enteredValue)
    let isEmailValidator = EmailValidator(EmailInput.enteredValue)
    let isPhoneNumberValidator = PhoneNumberValidator(PhoneNumberInput.enteredValue)
    let isPasswordValidator = PasswordValidator(PasswordInput.enteredValue)
    let isDobValidator = DobValidator(DobInput.enteredValue)


    if (!isFirstNameValidator || !isLastNameValidator || !isEmailValidator ||
      !isPhoneNumberValidator || !isPasswordValidator || !isDobValidator) {
      alert("fill complete fields")
    } else {
      console.log("dfg", {
        first_name: FirstNameInput.enteredValue,
        last_name: LastNameInput.enteredValue,
        email: EmailInput.enteredValue,
        password: PasswordInput.enteredValue,
        mobile_no: "846756464646",
        gender: Gender,
        dob: DobInput.enteredValue,
        roleid: selectlanguage,
        avatar: "df"
      },
);

    await CreateUserHandler({
      body: {
        first_name: FirstNameInput.enteredValue,
        last_name: LastNameInput.enteredValue,
        email: EmailInput.enteredValue,
        password: PasswordInput.enteredValue,
        mobile_no: "846756464646",
        gender: Gender,
        dob: DobInput.enteredValue,
        roleid: selectlanguage,
        avatar: "df"
      },
    });
  }

};



return (
  <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 w-[100%] z-30" />
      <Dialog.Content className="z-40 fixed top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
        <Dialog.Title className="text-lg font-semibold">Add New User</Dialog.Title>
        <Dialog.Description className="text-sm text-gray-500 mb-4">
          Create a new user here. Click save when you’re done.
        </Dialog.Description>

        <form onSubmit={handleSubmit} >

          <div className="my-5" >

            <div className="mb-3" >
              <InputWithAddOnMultiple
                label="First Name"
                placeholder=""
                className="loginInputs  w-full"
                value={FirstNameInput.enteredValue ?? ''}
                setValue={FirstNameInput.setEnteredValue}
                setIsTouched={FirstNameInput.setIsTouched}
                feedbackMessage={FirstNameInput.feedbackMessage}
                feedbackType={FirstNameInput.messageType}
                isTouched={FirstNameInput.isTouched}
                validateHandler={FirstNameValidator}
                reset={FirstNameInput.reset}
                extraProps={{ style: { height: "32px" } }}
                onBlurAction={(e) => { return e }}
                isRequired={true}
                disabled={false}
              />
            </div>

            <div className="mb-3" >
              <InputWithAddOnMultiple
                label="Last Name"
                placeholder=""
                className="loginInputs w-full"
                value={LastNameInput.enteredValue ?? ''}
                setValue={LastNameInput.setEnteredValue}
                setIsTouched={LastNameInput.setIsTouched}
                feedbackMessage={LastNameInput.feedbackMessage}
                feedbackType={LastNameInput.messageType}
                isTouched={LastNameInput.isTouched}
                validateHandler={LastNameValidator}
                reset={LastNameInput.reset}
                extraProps={{ style: { height: "32px" } }}
                onBlurAction={(e) => { return e }}
                isRequired={true}
                disabled={false}
              />
            </div>
            <div className="mb-3" >
              <InputWithAddOnMultiple
                label="Email"
                placeholder=""
                className="loginInputs w-full"
                value={EmailInput.enteredValue ?? ''}
                setValue={EmailInput.setEnteredValue}
                setIsTouched={EmailInput.setIsTouched}
                feedbackMessage={EmailInput.feedbackMessage}
                feedbackType={EmailInput.messageType}
                isTouched={EmailInput.isTouched}
                validateHandler={EmailValidator}
                reset={EmailInput.reset}
                extraProps={{ style: { height: "32px" } }}
                onBlurAction={(e) => { return e }}
                isRequired={true}
                disabled={false}
              />
            </div>


            <div className="mb-3" >
              <DateTimeInputMultiple
                label="Date"
                className="datetime-input-format-type-1"
                value={DobInput.enteredValue ?? ''}
                setValue={DobInput.setEnteredValue}
                setIsTouched={DobInput.setIsTouched}
                feedbackMessage={DobInput.feedbackMessage}
                feedbackType={DobInput.messageType}
                isTouched={DobInput.isTouched}
                validateHandler={DobValidator}
                reset={DobInput.reset}
                dateFormat={"YYYY-MM-DD"}
                timeFormat={false}
                extraProps={{ style: { width: "100%", height: "32px" } }}
                heightClass="small"
                isRequired={true}
                inputProps={{
                  placeholder: "YYYY-MM-DD",
                }}
                onBlurAction={(e) => {
                  return e

                }}
                momentFormat={"YYYY-MM-DD"}
              />

            </div>


            <div className="mb-3" >
              <InputSelect
                setValue={setSelectlanguage}
                label="Select Language"
                value={selectlanguage}
                options={getRoleResponse?.data}
                isTouched={selectlanguageischeck}
                setIsTouched={setSelectlanguageischeck}
                labelClassName="text-weight-bold h6"
                className="py-1 "
                isRequired={true}
                feedbackMessage={languageFeedbackMessage?.message}
                feedbackType={languageFeedbackMessage?.type}
                validateHandler={languageSelectValidater}
              />
            </div>
            <div className="mb-3" >
              <InputWithAddOnMultiple
                label="Phone Number"
                placeholder=""
                className="loginInputs w-full"
                value={PhoneNumberInput.enteredValue ?? ''}
                setValue={PhoneNumberInput.setEnteredValue}
                setIsTouched={PhoneNumberInput.setIsTouched}
                feedbackMessage={PhoneNumberInput.feedbackMessage}
                feedbackType={PhoneNumberInput.messageType}
                isTouched={PhoneNumberInput.isTouched}
                validateHandler={PhoneNumberValidator}
                reset={PhoneNumberInput.reset}
                extraProps={{ style: { height: "32px" } }}
                onBlurAction={(e) => { return e }}
                isRequired={true}
                disabled={false}
              />
            </div>
            <div className="mb-3" >
              <InputWithAddOnMultiple
                label="Password"
                placeholder=""
                className="loginInputs w-full"
                value={PasswordInput.enteredValue ?? ''}
                setValue={PasswordInput.setEnteredValue}
                setIsTouched={PasswordInput.setIsTouched}
                feedbackMessage={PasswordInput.feedbackMessage}
                feedbackType={PasswordInput.messageType}
                isTouched={PasswordInput.isTouched}
                validateHandler={PasswordValidator}
                reset={PasswordInput.reset}
                extraProps={{ style: { height: "32px" } }}
                onBlurAction={(e) => { return e }}
                isRequired={true}
                disabled={false}
              />
            </div>
            <div className="mb-3" >
              <Label style={{ fontSize: "0.9rem" }} >Gender</Label>
              <div>
                <CheckboxInput
                  setChecked={() => { changegander("male") }}
                  check={Gender === "male"}
                  label={"Male"}
                  id={"male_gender"}
                />
              </div>
              <div>
                <CheckboxInput
                  setChecked={() => {
                    changegander("female")
                  }}
                  check={Gender === "female"}
                  label={"Female"}
                  id={"female_gender"}
                />
              </div>
            </div>



          </div>
          <div className="flex justify-end space-x-2">
            <Dialog.Close asChild>
              <button type="button" className="px-4 mb-3 border rounded">Cancel</button>
            </Dialog.Close>
            <button
              type="submit"
              className="px-4 mb-3 bg-black text-white text-[16px] font-bold rounded disabled:opacity-50"
            >
              Save changes
            </button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
}

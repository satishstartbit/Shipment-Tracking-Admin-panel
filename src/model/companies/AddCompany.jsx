import useFetchAPI from "../../hooks/useFetchAPI";
import useInputComponent from "../../hooks/useInputComponent"
import InputWithAddOnMultiple from "../../components/forminputs/InputWithAddOnMultiple"
import { useLocation, useNavigate } from "react-router-dom";
import NotificationAlert from "../../hooks/NotificationAlert";
import CheckboxInput from "../../components/forminputs/CheckboxInput"
import DateTimeInputMultiple from "../../components/date-time/DateTimeInputMultiple";
import { Label } from "reactstrap";
import { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import { Country, State, City } from 'country-state-city';
import InputSelect from "../../components/forminputs/Select/InputSelect"

export function AddCompany() {
    const navigate = useNavigate();
    const location = useLocation();



    const [CompanyId, setCompanyId] = useState(null)
    useEffect(() => {
        const match = location?.pathname.match(/:([a-f0-9]{24})/);
        if (match) {
            setCompanyId(match[1])
        } else {
            setCompanyId(null)
        }

    }, [location])


    const [getCompanyDetailsFetchHandler, getCompanyFetchHandler] = useFetchAPI(
        {
            url: `/company/${CompanyId}`,
            method: "GET",
            authRequired: true,

        },
        (e) => {

            return e;
        },
        (e) => {
            return e?.response ?? true;
        }
    );



    useEffect(() => {
        if (getCompanyDetailsFetchHandler?.data) {
            let company = getCompanyDetailsFetchHandler?.data
            CompanyNameInput.setEnteredValue(company?.company_name)
            setSelectedState(company?.state)
            setSelectedCity(company?.city)


            let users = company?.munshiId;
            FirstNameInput.setEnteredValue(users.first_name)
            LastNameInput.setEnteredValue(users.last_name)
            EmailInput.setEnteredValue(users.email)
            PasswordInput.setEnteredValue(users.password)
            PhoneNumberInput.setEnteredValue(users.mobile_no)
            DobInput.setEnteredValue(users.dob)
            UserNameInput.setEnteredValue(users.username)
        }
    }, [getCompanyDetailsFetchHandler?.data])


    useEffect(() => {
        if (CompanyId !== null) {
            getCompanyFetchHandler()
        }
    }, [CompanyId])

    // CompanyName
    let CompanyNameInput = useInputComponent();
    let CompanyNameValidator = (value) => {
        if (value === "" || !value) {
            CompanyNameInput.setFeedbackMessage("Field Required!");
            CompanyNameInput.setMessageType("error");
            return false;
        }
        CompanyNameInput.setFeedbackMessage("");
        CompanyNameInput.setMessageType("none");
        return true;
    };



    // County
    let CountyInput = useInputComponent();






    // add user details 





    let UserNameInput = useInputComponent();
    let UserNameValidator = (value) => {
        // Check if the field is empty
        if (value === "" || !value) {
            UserNameInput.setFeedbackMessage("Field Required!");
            UserNameInput.setMessageType("error");
            return false;
        }

        // Check for minimum length
        if (value.length < 3) {
            UserNameInput.setFeedbackMessage("Username must be at least 3 characters.");
            UserNameInput.setMessageType("error");
            return false;
        }

        // Check for leading or trailing spaces
        if (value.trim() !== value) {
            UserNameInput.setFeedbackMessage("Username cannot have leading or trailing spaces.");
            UserNameInput.setMessageType("error");
            return false;
        }

        // Check if the username starts with a letter
        const startWithLetterRegex = /^[a-zA-Z]/;
        if (!startWithLetterRegex.test(value)) {
            UserNameInput.setFeedbackMessage("Username must start with a letter.");
            UserNameInput.setMessageType("error");
            return false;
        }

        // Check if the username contains only alphanumeric characters and underscores
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(value)) {
            UserNameInput.setFeedbackMessage("Username can only contain letters, numbers, and underscores.");
            UserNameInput.setMessageType("error");
            return false;
        }

        // Clear feedback if everything is valid
        UserNameInput.setFeedbackMessage("");
        UserNameInput.setMessageType("none");
        return true;
    };



    // Firstname
    let FirstNameInput = useInputComponent();
    let FirstNameValidator = (value) => {
        // Check if the field is empty
        if (value === "" || !value) {
            FirstNameInput.setFeedbackMessage("Field Required!");
            FirstNameInput.setMessageType("error");
            return false;
        }

        // Check if the name starts with a number
        if (/^\d/.test(value)) {
            FirstNameInput.setFeedbackMessage("First name cannot start with a number.");
            FirstNameInput.setMessageType("error");
            return false;
        }

        // Check if the name contains only letters, spaces, or hyphens (you can adjust this regex as needed)
        const nameRegex = /^[a-zA-Z\s-]+$/;
        if (!nameRegex.test(value)) {
            FirstNameInput.setFeedbackMessage("First name can only contain letters, spaces, or hyphens.");
            FirstNameInput.setMessageType("error");
            return false;
        }

        // Clear feedback if everything is valid
        FirstNameInput.setFeedbackMessage("");
        FirstNameInput.setMessageType("none");
        return true;
    };

    // Lastname
    let LastNameInput = useInputComponent();
    let LastNameValidator = (value) => {
        // Check if the field is empty
        if (value === "" || !value) {
            LastNameInput.setFeedbackMessage("Field Required!");
            LastNameInput.setMessageType("error");
            return false;
        }

        // Check if the name starts with a number
        if (/^\d/.test(value)) {
            LastNameInput.setFeedbackMessage("Last name cannot start with a number.");
            LastNameInput.setMessageType("error");
            return false;
        }

        // Check if the name contains only letters, spaces, or hyphens (you can adjust this regex as needed)
        const nameRegex = /^[a-zA-Z\s-]+$/;
        if (!nameRegex.test(value)) {
            LastNameInput.setFeedbackMessage("Last name can only contain letters, spaces, or hyphens.");
            LastNameInput.setMessageType("error");
            return false;
        }

        // Clear feedback if everything is valid
        LastNameInput.setFeedbackMessage("");
        LastNameInput.setMessageType("none");
        return true;
    };


    // Email
    let EmailInput = useInputComponent();
    let EmailValidator = (value) => {
        // Check if the email field is empty
        if (value === "" || !value) {
            EmailInput.setFeedbackMessage("Email is required!");
            EmailInput.setMessageType("error");
            return false;
        }

        // Validate email format using regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
            EmailInput.setFeedbackMessage("Invalid Email Format!");
            EmailInput.setMessageType("error");
            return false;
        }

        // Clear feedback if the email is valid
        EmailInput.setFeedbackMessage("");
        EmailInput.setMessageType("none");
        return true;
    };



    // PhoneNumber
    let PhoneNumberInput = useInputComponent();
    let PhoneNumberValidator = (value) => {
        // Check if the phone number field is empty
        if (value === "" || !value) {
            PhoneNumberInput.setFeedbackMessage("Phone Number is required!");
            PhoneNumberInput.setMessageType("error");
            return false;
        }

        // Validate the phone number format (exactly 10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
            PhoneNumberInput.setFeedbackMessage("Invalid Phone Number! It must be exactly 10 digits.");
            PhoneNumberInput.setMessageType("error");
            return false;
        }

        // Clear feedback if the phone number is valid
        PhoneNumberInput.setFeedbackMessage("");
        PhoneNumberInput.setMessageType("none");
        return true;
    };


    // Password
    let PasswordInput = useInputComponent();
    let PasswordValidator = (value) => {
        // Check for empty password
        if (value === "" || !value) {
            PasswordInput.setFeedbackMessage("Password is required!");
            PasswordInput.setMessageType("error");
            return false;
        }

        // Check password length
        if (value.length < 6) {
            PasswordInput.setFeedbackMessage("Password must be at least 6 characters long!");
            PasswordInput.setMessageType("error");
            return false;
        }

        // Check for at least one uppercase letter
        const uppercaseRegex = /[A-Z]/;
        if (!uppercaseRegex.test(value)) {
            PasswordInput.setFeedbackMessage("Password must contain at least one uppercase letter!");
            PasswordInput.setMessageType("error");
            return false;
        }

        // Check for at least one lowercase letter
        const lowercaseRegex = /[a-z]/;
        if (!lowercaseRegex.test(value)) {
            PasswordInput.setFeedbackMessage("Password must contain at least one lowercase letter!");
            PasswordInput.setMessageType("error");
            return false;
        }

        // Check for at least one digit
        const numberRegex = /[0-9]/;
        if (!numberRegex.test(value)) {
            PasswordInput.setFeedbackMessage("Password must contain at least one number!");
            PasswordInput.setMessageType("error");
            return false;
        }

        // Check for at least one special character
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(value)) {
            PasswordInput.setFeedbackMessage("Password must contain at least one special character!");
            PasswordInput.setMessageType("error");
            return false;
        }

        // If all checks pass, clear feedback and set message type to none
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




    const reset = () => {
        CompanyNameInput.reset()
        setSelectedState()
        setselectedStateischeck(false)
        setStateFeedBackMessage({
            type: "info",
            message: "",
        })

        setSelectedCity()
        setselectedCityischeck(false)
        setCityFeedBackMessage({
            type: "info",
            message: "",
        })




        UserNameInput.reset()
        FirstNameInput.reset()
        LastNameInput.reset()
        EmailInput.reset()
        PhoneNumberInput.reset()
        PasswordInput.reset()
        DobInput.reset()

    }


    useEffect(() => {
        reset()
    }, [])



    const [CreateCompanyResponse, CreateCompanyHandler] =
        useFetchAPI(
            {
                url: "/company/create",
                method: "POST",
            },
            (e) => {
                NotificationAlert(
                    "success",
                    "Transport Company has been created successfully."
                );
                navigate("/companies")
                reset()
                return e;
            },
            (e) => {
                let message =
                    "Something went wrong while logging out. please try again.";
                if (typeof e?.response?.data === "string") {
                    message = e?.response?.data;
                } else if (typeof e?.response?.data?.message === "string") {
                    message = e?.response?.data?.message;
                }
                NotificationAlert("error", message);
            }
        );




    const [UpdateCompanyResponse, UpdateCompanyHandler] =
        useFetchAPI(
            {
                url: "/company/update",
                method: "POST",
            },
            (e) => {
                NotificationAlert(
                    "success",
                    "Transport Company has been updated successfully."
                );
                navigate("/companies")
                reset()
                return e;
            },
            (e) => {
                let message =
                    "Something went wrong while logging out. please try again.";
                if (typeof e?.response?.data === "string") {
                    message = e?.response?.data;
                } else if (typeof e?.response?.data?.message === "string") {
                    message = e?.response?.data?.message;
                }
                NotificationAlert("error", message);
            }
        );


    // Handle Submit 
    const handleSubmit = async (e) => {
        e.preventDefault();

        let isCompanyNameValidator = CompanyNameValidator(CompanyNameInput.enteredValue)

        let isStateSelectValidater = StateSelectValidater(selectedState)
        let isCitySelectValidater = CitySelectValidater(selectedCity)




        let isFirstNameValidator = FirstNameValidator(FirstNameInput.enteredValue)
        let isLastNameValidator = LastNameValidator(LastNameInput.enteredValue)
        let isEmailValidator = EmailValidator(EmailInput.enteredValue)
        let isPhoneNumberValidator = PhoneNumberValidator(PhoneNumberInput.enteredValue)
        let isPasswordValidator = PasswordValidator(PasswordInput.enteredValue)
        let isDobValidator = DobValidator(DobInput.enteredValue)
        let isUserNameValidator = UserNameValidator(UserNameInput.enteredValue)



        if (!isCompanyNameValidator || !isStateSelectValidater || !isCitySelectValidater ||
            !isFirstNameValidator || !isLastNameValidator || !isEmailValidator ||
            !isPhoneNumberValidator || !isPasswordValidator || !isDobValidator || !isUserNameValidator
        ) {
            NotificationAlert(
                "error",
                "Please enter all information before proceeding."
            );
        } else {

            if (CompanyId) {

                await UpdateCompanyHandler({
                    body: {
                        company_id: CompanyId,
                        company_name: CompanyNameInput.enteredValue,
                        city: selectedCity,
                        state: selectedState,
                        country: "IN",

                        first_name: FirstNameInput.enteredValue,
                        last_name: LastNameInput.enteredValue,
                        email: EmailInput.enteredValue,
                        password: PasswordInput.enteredValue,
                        mobile_no: PhoneNumberInput.enteredValue,
                        gender: Gender,
                        dob: DobInput.enteredValue,
                        roleid: "67e2942f30f69ed5e93b2c89",
                        avatar: "df",
                        username: UserNameInput.enteredValue
                    },
                });
            } else {

                await CreateCompanyHandler({
                    body: {
                        company_name: CompanyNameInput.enteredValue,
                        city: selectedCity,
                        state: selectedState,
                        country: "IN",

                        first_name: FirstNameInput.enteredValue,
                        last_name: LastNameInput.enteredValue,
                        email: EmailInput.enteredValue,
                        password: PasswordInput.enteredValue,
                        mobile_no: PhoneNumberInput.enteredValue,
                        gender: Gender,
                        dob: DobInput.enteredValue,
                        roleid: "67e2942f30f69ed5e93b2c89",
                        avatar: "df",
                        username: UserNameInput.enteredValue
                    },
                });
            }


        }

    };


    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);



    const [selectedCountry, setSelectedCountry] = useState('IN');

    const [selectedState, setSelectedState] = useState('');
    const [selectedStateischeck, setselectedStateischeck] = useState(false);
    const [StateFeedbackMessage, setStateFeedBackMessage] = useState({
        type: "info",
        message: "",
    });
    const StateSelectValidater = (value) => {
        if (value === "" || !value) {
            setStateFeedBackMessage({
                type: "error",
                message: "This field is required!",
            });
            return false;
        }
        setStateFeedBackMessage({ type: "info", message: "" });

        return true;
    };




    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCityischeck, setselectedCityischeck] = useState(false);
    const [CityFeedbackMessage, setCityFeedBackMessage] = useState({
        type: "info",
        message: "",
    });
    const CitySelectValidater = (value) => {
        if (value === "" || !value) {
            setCityFeedBackMessage({
                type: "error",
                message: "This field is required!",
            });
            return false;
        }
        setCityFeedBackMessage({ type: "info", message: "" });

        return true;
    };





    useEffect(() => {
        if (selectedCountry) {
            // Get states for the selected country
            setStates(State.getStatesOfCountry(selectedCountry));
            setSelectedState(''); // Reset the state selection when country changes
            setCities([]); // Reset cities
        }
    }, []);


    useEffect(() => {
        if (selectedState) {
            // Get cities for the selected state
            setCities(City.getCitiesOfState(selectedCountry, selectedState));
            // setSelectedCity(''); // Reset city selection when state changes
        }
    }, [selectedState]);


    return getCompanyDetailsFetchHandler?.fetching ? <div style={{ textAlign: "center" }}> <Spinner /> </div> : <div className="w-full p-5" >
        <p className="text-lg font-semibold"> {CompanyId ? "Edit" : "Add New"} Transport Company</p>
        <p className="text-sm text-gray-500 mb-4">
            {CompanyId ? "Edit" : "Create a new"} Transport Company here. Click save when you’re done.
        </p>
        <form onSubmit={handleSubmit} >



            <div className="my-5 grid grid-cols-2 gap-4" >

                <div className="mb-5" >
                    <InputWithAddOnMultiple
                        label="Transport Company Name"
                        placeholder=""
                        className="loginInputs  w-full"
                        value={CompanyNameInput.enteredValue ?? ''}
                        setValue={CompanyNameInput.setEnteredValue}
                        setIsTouched={CompanyNameInput.setIsTouched}
                        feedbackMessage={CompanyNameInput.feedbackMessage}
                        feedbackType={CompanyNameInput.messageType}
                        isTouched={CompanyNameInput.isTouched}
                        validateHandler={CompanyNameValidator}
                        reset={CompanyNameInput.reset}
                        extraProps={{ style: { height: "32px" } }}
                        onBlurAction={(e) => { return e }}
                        isRequired={true}
                        disabled={false}
                    />
                </div>



                <div className="mb-5" >
                    <InputWithAddOnMultiple
                        label="County"
                        placeholder=""
                        className="loginInputs w-full"
                        value={"India"}
                        setValue={CountyInput.setEnteredValue}
                        extraProps={{ style: { height: "32px" } }}
                        onBlurAction={(e) => { return e }}
                        disabled={true}
                    />
                </div>


                <div className="mb-5" >
                    <InputSelect
                        setValue={setSelectedState}
                        label="Select State"
                        value={selectedState}
                        options={states?.map((item) => {
                            return {
                                value: item?.isoCode,
                                label: item?.name
                            }
                        })}
                        isTouched={selectedStateischeck}
                        setIsTouched={setselectedStateischeck}
                        labelClassName="text-weight-bold h6"
                        className="py-1 "
                        isRequired={true}
                        feedbackMessage={StateFeedbackMessage?.message}
                        feedbackType={StateFeedbackMessage?.type}
                        validateHandler={StateSelectValidater}
                    />
                </div>





                <div className="mb-5" >
                    <InputSelect
                        setValue={setSelectedCity}
                        label="Select City"
                        value={selectedCity}
                        options={(cities ?? [])?.map((item) => {
                            return {
                                value: item?.name,
                                label: item?.name
                            }
                        }) ?? []}
                        isTouched={selectedCityischeck}
                        setIsTouched={setselectedCityischeck}
                        labelClassName="text-weight-bold h6"
                        className="py-1 "
                        isRequired={true}
                        feedbackMessage={CityFeedbackMessage?.message}
                        feedbackType={CityFeedbackMessage?.type}
                        validateHandler={CitySelectValidater}
                    />
                </div>




            </div>

            <p className="text-lg font-semibold"> {CompanyId ? "Edit" : "Add"} User</p>
            <p className="text-sm text-gray-500 mb-4">
                {CompanyId ? "Edit user" : "Create a new user"} here and connect with Transport Company.
            </p>

            <div className="my-5 grid grid-cols-2 gap-4" >
                <div className="mb-5" >
                    <InputWithAddOnMultiple
                        label="User Name"
                        placeholder=""
                        className="loginInputs  w-full"
                        value={UserNameInput.enteredValue ?? ''}
                        setValue={UserNameInput.setEnteredValue}
                        setIsTouched={UserNameInput.setIsTouched}
                        feedbackMessage={UserNameInput.feedbackMessage}
                        feedbackType={UserNameInput.messageType}
                        isTouched={UserNameInput.isTouched}
                        validateHandler={UserNameValidator}
                        reset={UserNameInput.reset}
                        extraProps={{ style: { height: "32px" } }}
                        onBlurAction={(e) => { return e }}
                        isRequired={true}
                        disabled={CompanyId ? true : false}
                    />
                </div>
                <div className="mb-5" >
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

                <div className="mb-5" >
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
                <div className="mb-5" >
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


                <div className="mb-5" >
                    <DateTimeInputMultiple
                        label="Date of Birth"
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



                <div className="mb-5" >
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
                <div className="mb-5" >
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
                <div className="mb-5" >
                    <Label style={{ fontSize: "0.9rem" }} >Gender</Label>
                    <div className="grid grid-cols-8  mt-2  " >
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
            </div>
            <div className="flex justify-end space-x-2">
                <button onClick={() => { navigate("/companies") }} type="button" className="px-4 mb-5 border rounded">Cancel</button>

                <button
                    type="submit"
                    disabled={UpdateCompanyResponse?.fetching || CreateCompanyResponse?.fetching}
                    className="px-4 mb-5 bg-black text-white text-[16px] font-bold rounded disabled:opacity-50"
                >
                    {CompanyId ? "Update" : "Save changes"}
                </button>
            </div>
        </form>
    </div>
}

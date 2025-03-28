import useInputComponent from "../hooks/useInputComponent";
import InputWithAddOn from "../components/forminputs/InputWithAddOn";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { LoginAction } from "../store/slices/LoginSlice";

import "./LoginUser.css"; // Import the CSS
import { useState } from "react";
import useFetchAPI from "../hooks/useFetchAPI";
// import { ReactComponent as EyeHideIcon } from "../assets/icons/EyeHideIcon.svg";


const LoginUser = () => {
    const { IsMobileView } = useSelector(
        (state) => state.SideBarReducer
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)

    const EmailInput = useInputComponent();
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

    const PasswordInput = useInputComponent();
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





    const [LoginFetchResponse, LoginFetchHandler] = useFetchAPI(
        {
            url: `/users/login`,
            method: "POST",
            authRequired: true,
        },
        (e) => {
            console.log(e);

            dispatch(
                LoginAction({
                    email: EmailInput.enteredValue,
                    accessToken: e?.accessToken,
                    refreshToken: e?.refreshToken
                })
            );
            navigate("/users")
            return e;
        },
        (e) => {
            return e?.response ?? true;
        }
    );


    const SubmitHandler = (e) => {
        e.preventDefault();
        console.log("dfgdg");

        let isEmailValidator = EmailValidator(EmailInput.enteredValue)
        let isPasswordValidator = PasswordValidator(PasswordInput.enteredValue)

        if (!isEmailValidator || !isPasswordValidator) {
            console.log("wrong EmailInput and password")
        } else {
            LoginFetchHandler({
                body: {
                    email: EmailInput.enteredValue,
                    password: PasswordInput.enteredValue,
                    role_type: "admin"
                }
            })
        }

    };

    return (
        <div className="login-container">
            <div className="login-left">
                <h2 className="mb-5 font-bold" >Shipment Tracking Admin Panel</h2>
                <Form className="login-form mt-5" onSubmit={SubmitHandler}>
                    <InputWithAddOn
                        name="EmailInput"
                        id="EmailInput"
                        placeholder=""
                        className="login-input"
                        value={EmailInput.enteredValue}
                        setValue={EmailInput.setEnteredValue}
                        setIsTouched={EmailInput.setIsTouched}
                        feedbackMessage={EmailInput.feedbackMessage}
                        feedbackType={EmailInput.messageType}
                        isTouched={EmailInput.isTouched}
                        reset={EmailInput.reset}
                        label="Email ID"
                        validateHandler={EmailValidator}

                    />
                    <InputWithAddOn
                        name="Password"
                        id="Password"
                        placeholder=""
                        className="login-input"
                        type={showPassword ? "text" : "password"}
                        value={PasswordInput.enteredValue}
                        setValue={PasswordInput.setEnteredValue}
                        setIsTouched={PasswordInput.setIsTouched}
                        feedbackMessage={PasswordInput.feedbackMessage}
                        feedbackType={PasswordInput.messageType}
                        isTouched={PasswordInput.isTouched}
                        reset={PasswordInput.reset}
                        label="Password"
                        validateHandler={PasswordValidator}
                    // hasAddOn={{
                    //     right: showPassword ? (
                    //         <EyeHideIcon
                    //             className="input_addon_icon_right"
                    //             onClick={() => {
                    //                 setShowPassword(false);
                    //             }}
                    //         />
                    //     ) : (
                    //         <EyeIcon
                    //             className="input_addon_icon_right"
                    //             onClick={() => {
                    //                 setShowPassword(true);
                    //             }}
                    //         />
                    //     ),
                    // }}
                    />
                    <div className="login-button-wrapper">
                        <button className="login-button" type="submit">
                            Login
                        </button>
                    </div>
                </Form>
            </div>
            {!IsMobileView && <div className="login-right">

                <div className="login-right-text">
                    <p className="small-text">Logging in is quick and easy!</p>
                    <h3>
                        Need help with your account? <br />
                        We're here to assist you.
                    </h3>

                </div>
            </div>}
        </div>
    );
};

export default LoginUser;

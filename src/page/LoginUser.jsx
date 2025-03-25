import useInputComponent from "../hooks/useInputComponent";
import InputWithAddOn from "../components/forminputs/InputWithAddOn";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { LoginAction } from "../store/slices/LoginSlice";

import "./LoginUser.css"; // Import the CSS


const LoginUser = () => {
    const { IsMobileView } = useSelector(
        (state) => state.SideBarReducer
    );
    const dispatch = useDispatch();

    const UserNameInput = useInputComponent();
    const PasswordInput = useInputComponent();
    const navigate = useNavigate();
    // const [showPassword, setShowPassword] = useState(false);

    const SubmitHandler = (e) => {
        e.preventDefault();
        // Add your login logic here

        if (UserNameInput.enteredValue === "Admin" && PasswordInput.enteredValue === "root@123") {
            dispatch(
                LoginAction({
                    username: UserNameInput.enteredValue,
                })
              );
            navigate("/dashboard")
        } else {
            console.log("wrong UserNameInput and password");

        }

    };

    return (
        <div className="login-container">
            <div className="login-left">
                <h2 className="mb-5 font-bold" >Shipment Tracking Admin Panel</h2>
                <Form className="login-form mt-5" onSubmit={SubmitHandler}>
                    <InputWithAddOn
                        name="UserNameInput"
                        id="UserNameInput"
                        placeholder=""
                        className="login-input"
                        value={UserNameInput.enteredValue}
                        setValue={UserNameInput.setEnteredValue}
                        setIsTouched={UserNameInput.setIsTouched}
                        feedbackMessage={UserNameInput.feedbackMessage}
                        feedbackType={UserNameInput.messageType}
                        isTouched={UserNameInput.isTouched}
                        reset={UserNameInput.reset}
                        label="User Name"
                    />
                    <InputWithAddOn
                        name="Password"
                        id="Password"
                        placeholder=""
                        className="login-input"
                        // type={showPassword ? "text" : "password"}
                        value={PasswordInput.enteredValue}
                        setValue={PasswordInput.setEnteredValue}
                        setIsTouched={PasswordInput.setIsTouched}
                        feedbackMessage={PasswordInput.feedbackMessage}
                        feedbackType={PasswordInput.messageType}
                        isTouched={PasswordInput.isTouched}
                        reset={PasswordInput.reset}
                        label="Password"
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

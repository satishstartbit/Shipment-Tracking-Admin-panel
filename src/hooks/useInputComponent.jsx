import { useState } from "react";
const useInputComponent = (feedtype = "none", feedmessage = "") => {
  const [enteredValue, setEnteredValue] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState(feedmessage);
  const [messageType, setMessageType] = useState(feedtype);
  const [isTouched, setIsTouched] = useState(false);
  const reset = (message = "") => {
    setEnteredValue("");
    setIsTouched(false);
    setFeedbackMessage((message === "" ? feedmessage : message));
    setMessageType(feedtype);
  };
  return {
    enteredValue,
    setEnteredValue,
    isTouched,
    setIsTouched,
    feedbackMessage,
    setFeedbackMessage,
    messageType,
    setMessageType,
    reset,
  };
};
export default useInputComponent;
 
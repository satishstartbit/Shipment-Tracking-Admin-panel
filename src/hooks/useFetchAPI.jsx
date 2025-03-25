import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LocalStorageHelper from "../services/LocalStorageHelper";
import { progressBarStart, progressBarStop } from "../services/NavProgressHelper";

const useFetchAPI = (
  {
    fullURL = null,
    url = "",
    method = "GET",
    sendImmediately = false,
    authRequired = false,
    params = null,
    body = null,
    headers = null,
    isAsync = false,
    isRefreshCall = false,
    haltRequest = false,
  },
  dataTransform = null,
  errorTransform = null
) => {
  const { APIKey } = useSelector((state) => state.LoginReducer);  // Accessing the API key from Redux store.
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Automatically trigger API call if sendImmediately is true
  useEffect(() => {
    if (sendImmediately) {
      immediateCall();
    }
  }, [sendImmediately]);

  // Handle immediate API call when needed
  const immediateCall = async () => {
    await execute();
  };

  // Error handling for async operation
  const catchErrorHandlerAsync = async (error) => {
    handleError(error, true);
  };

  // Error handling for synchronous operation
  const catchErrorHandler = (error) => {
    handleError(error, false);
  };

  const handleError = (error, isAsync) => {
    console.log(error?.response);
    if (!error?.response && error?.request) {
      let responseMessage = genrateErrorMessage(error);
      error.response = { data: { message: responseMessage } };
    }
    if ((error?.response?.status !== 401 || isRefreshCall)) {
      setError(errorTransform ? errorTransform(error) : error);
    } else {
      LocalStorageHelper.removeItem("token");
      window.location.reload(false);
    }
    setFetching(false);
    setData(null);
  };

  // Handle success for async operations
  const thenSuccessHandlerAsync = async (response) => {
    handleSuccess(response, true);
  };

  // Handle success for normal operations
  const thenSuccessHandler = (response) => {
    handleSuccess(response, false);
  };

  const handleSuccess = (response, isAsync) => {
    if (dataTransform) {
      let resultData = dataTransform(response?.data);
      setData(resultData);
    } else {
      setData(response?.data);
    }
    setFetching(false);
    setError(null);
  };

  // Execute the API call
  const execute = async () => {
    setFetching(true);
    progressBarStart();

    let fullurl = fullURL ?? "http://localhost:3000/api" + url;
    let tokenHeader = {};
    if (authRequired) {
      tokenHeader.Authorization = `Bearer ${APIKey}`;
    }

    let newheaders = headers ? { ...headers, ...tokenHeader } : {
      "Content-Type": "application/json; charset=utf-8",
      ...tokenHeader,
    };

    let newparams = params ?? {};
    let newbody = body ?? null;

    if (haltRequest) {
      setFetching(false);
      setData(null);
      return;
    }

    try {
      switch (method) {
        case "GET":
          await axios.get(fullurl, { params: newparams, headers: newheaders })
            .then(isAsync ? thenSuccessHandlerAsync : thenSuccessHandler)
            .catch(isAsync ? catchErrorHandlerAsync : catchErrorHandler);
          break;

        case "POST":
          await axios.post(fullurl, newbody, { headers: newheaders })
            .then(isAsync ? thenSuccessHandlerAsync : thenSuccessHandler)
            .catch(isAsync ? catchErrorHandlerAsync : catchErrorHandler);
          break;

        case "PUT":
          await axios.put(fullurl, newbody, { headers: newheaders })
            .then(isAsync ? thenSuccessHandlerAsync : thenSuccessHandler)
            .catch(isAsync ? catchErrorHandlerAsync : catchErrorHandler);
          break;

        case "DELETE":
          await axios.delete(fullurl, { headers: newheaders })
            .then(isAsync ? thenSuccessHandlerAsync : thenSuccessHandler)
            .catch(isAsync ? catchErrorHandlerAsync : catchErrorHandler);
          break;

        default:
          throw new Error("Unsupported HTTP method");
      }
    } catch (error) {
      catchErrorHandler(error);
    } finally {
      progressBarStop();
    }
  };

  return [{ data, fetching, error }, execute];
};

const genrateErrorMessage = (error) => {
  // Error message generation based on error codes
  let responseMessage = null;
  switch (error.code) {
    case "ECONNABORTED":
      responseMessage = "Timeout Error: The request took too long.";
      break;
    case "ENOTFOUND":
      responseMessage = "DNS Error: The domain could not be found.";
      break;
    case "ECONNREFUSED":
      responseMessage = "Connection Refused: The server is down or unreachable.";
      break;
    default:
      responseMessage = "Unknown Error: Please try again.";
  }
  return responseMessage;
};

export default useFetchAPI;

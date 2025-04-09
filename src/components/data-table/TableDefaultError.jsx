import React from "react";  // Importing React library

// TableDefaultError is a functional component that displays an error message
const TableDefaultError = ({
  errorMessage = "Something went wrong while Loading!",  // Default error message if none is provided
  hasRetry = false,  // Determines if the retry button should be shown
  retryAction = null,  // The action to be triggered when the retry button is clicked
}) => {

  return (
    // Main wrapper for the error component with centered text and full width
    <div className="w-100 text-center default-error-component">
      {/* Displaying the error message */}
      <div className={`${"text-danger"} text-center w-100`}>
        {errorMessage}  {/* Render the provided error message */}
        
        {/* Conditionally render the retry button if hasRetry is true and retryAction is provided */}
        {hasRetry && retryAction &&
          <>
            <br />  {/* Line break before the retry button */}
            <div className="text-center">
              {/* Retry button with custom styling, triggers retryAction on click */}
              <button
                className="text-danger btn custom-secondary-button theme-custom-button-sm "
                onClick={retryAction}  // Calling the retryAction function when the button is clicked
              >
                Retry  {/* Text displayed on the button */}
              </button>
            </div>
          </>
        }
      </div>
    </div>
  );
};

// Export the TableDefaultError component to be used elsewhere in the app
export default TableDefaultError;

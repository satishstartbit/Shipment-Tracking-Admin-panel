import React from "react";

const TableDefaultError = ({
  errorMessage = "Something went wrong while Loading!",
  hasRetry = false,
  retryAction = null,
}) => {

  return (
    <div className="w-100 text-center default-error-component">
      <div className={`${"text-danger"} text-center w-100`}>{errorMessage}
        {hasRetry && retryAction &&
          <>
            <br />
            <div className="text-center">

              <button
                className="text-danger btn custom-secondary-button theme-custom-button-sm "
                onClick={retryAction}
              >
                Retry
              </button>
            </div>
          </>
        }
      </div></div>
  );
};



const ProjectNumberMissing = ({
  errorMessage = "Please assign a project to proceed.",
  hasRetry = false,
  retryAction = null,
}) => {
  return (
    <div className="w-100 text-center default-error-component">
      <p className={`${"text-danger"} text-center w-100`}>{errorMessage}</p>
      {hasRetry && retryAction &&
        <>
          <br />
          <button
            className="text-danger btn custom-secondary-button theme-custom-button-sm "
            onClick={retryAction}
          >
            Retry
          </button>
        </>
      }
    </div>
  );
};



TableDefaultError.ProjectNumberMissing = ProjectNumberMissing
TableDefaultError.ProjectNumberMissingMessage = "Please assign a project to proceed."
export default TableDefaultError;

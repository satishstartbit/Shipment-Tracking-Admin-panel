import { Row } from "reactstrap";  // Importing Row component from Reactstrap for layout
import "./ThemeDataTable.css"; // Importing custom styles for the data table
import PaginationComponent from "./PaginationComponent";  // Importing the pagination component
import DataTableListComponent from "./DataTableListComponent";  // Importing the data table list component
import TableDefaultError from "./TableDefaultError";  // Importing the error component to show when something goes wrong
const ThemeDataTable1 = ({
  isLoading = false,  // Flag to show loading state
  isError = false,  // Flag to show error state
  ErrorComponent = null,  // Optional custom error component
  NoDataMessage = "No records found",  // Message to show when no data is available
  totalRows = 0,  // Total number of rows in the data
  currentPage = 1,  // Current page number
  currentRows = 10,  // Number of rows per page
  changeRowPage = null,  // Callback to change the page
  dataRows = [],  // Data to be displayed in the table
  selectable = false,  // Whether rows can be selected
  selectedRows = {},  // Selected rows data
  setSelectedRows = () => { },  // Function to update selected rows
  selectedViewOption = "list",  // View option: "list" or "grid"
  listComponent = null,  // List of components to render in the table
  retryAction = null,  // Retry action callback
  errorConfig = { hasRetry: true },  // Config for error handling, like whether retry button should appear
  selectableRowSelected = null,  // Function to determine if a row is selected
  isSelectAbleColumns2 = false,  // Flag to enable selectable columns
  selectPrimaryField = null,  // Field to uniquely identify rows for selection
  sortAction = () => { },  // Function to handle sorting
  sortField = null,  // Field to sort by
  sortDirection = null,  // Sorting direction (asc/desc)
  setSelectedRowsData = () => { },  // Function to update the selected rows' data
}) => {

  // Handler for changing pages in pagination
  const pageNoChangeHandler = (newPage) => {
    let totalPages = Math.ceil(totalRows / currentRows); // Calculate total pages
    if (
      changeRowPage &&
      newPage !== currentPage &&
      newPage > 0 &&
      newPage < totalPages + 1 &&
      newPage
    ) {
      changeRowPage(newPage, currentRows); // Change page if valid
    }
  };

  // Handler to check/uncheck rows for selection
  const selectableCheckHandler = (selectedRow) => {
    let newSelectedRows = [];
    let alreadySelected = selectedRows?.selectedRows
      ? selectedRows?.selectedRows.some(
        (item) => item[selectPrimaryField] === selectedRow[selectPrimaryField]
      )
      : false;
    if (alreadySelected) {
      newSelectedRows = selectedRows?.selectedRows
        ? selectedRows?.selectedRows.filter(
          (item) =>
            item[selectPrimaryField] !== selectedRow[selectPrimaryField]
        )
        : [];

      setSelectedRowsData(newSelectedRows);
    } else {
      const existingSelectedRows = selectedRows?.selectedRows || [];
      newSelectedRows = [...existingSelectedRows, selectedRow];
      setSelectedRowsData(newSelectedRows);
    }
    // Update the selected rows state
    setSelectedRows({
      allSelected: totalRows === newSelectedRows.length,
      selectedCount: newSelectedRows.length,
      selectedRows: newSelectedRows,
    });
  };

  // Handler for checking/unchecking all rows from the header
  const selectableCheckHandlerHeader = (e) => {
    let isAlredyChecked = e?.target?.checked;

    let newSelectedRows = selectedRows?.selectedRows ?? [];
    if (isAlredyChecked) {
      (dataRows ?? []).forEach((row1) => {
        let rowExists = (selectedRows?.selectedRows ?? []).some(
          (row2) => row2[selectPrimaryField] === row1[selectPrimaryField]
        );
        if (!rowExists) {
          newSelectedRows.push(row1); // Add row to selected rows if not already selected
        }
      });
    } else {
      newSelectedRows = newSelectedRows.filter(
        (row1) =>
          !(dataRows ?? []).some(
            (row2) => row2[selectPrimaryField] === row1[selectPrimaryField]
          )
      );// Remove rows from selected rows
    }
    setSelectedRowsData(newSelectedRows);
    setSelectedRows({
      allSelected: totalRows === newSelectedRows.length,
      selectedCount: newSelectedRows.length,
      selectedRows: newSelectedRows,
    });
  };

  return (
    <div className="w-full" style={{ overflow: "hidden" }}>
      {isError && !isLoading && (
        <>
          {ErrorComponent ? (
            <ErrorComponent />  // Render custom error component if provided
          ) : (
            <TableDefaultError errorMessage={errorConfig?.errorMessage} hasRetry={errorConfig?.hasRetry} retryAction={retryAction} />
          )}
        </>
      )}
      {/* Show loading message if loading is true */}
      {isLoading && (
        <div className="w-full text-center default-loading-component">
          <p className="text-dark text-center w-full">Loading...</p>
        </div>
      )}
      {/* Show no data message if there is no data */}
      {!isError && !isLoading && (dataRows ?? []).length === 0 && (
        <div className="w-full text-center default-no-data-component">
          <p className="text-dark text-center w-full">{NoDataMessage ?? "No records found"}</p>
        </div>
      )}
      {/* If there is data, display it in a list or grid view */}
      {!isError && !isLoading && (dataRows ?? []).length > 0 && (
        <>
          {selectedRows?.selectedRows &&
            selectedRows?.selectedRows.length > 0 &&
            isSelectAbleColumns2 && (
              <div
                className="w-full justify-between d-flex p-2 px-3"
                style={{ backgroundColor: "rgb(227, 242, 253)" }}
              >
                <span>
                  {selectedRows?.selectedRows.length}/{totalRows} Item
                  {selectedRows?.selectedRows.length === 1 ? "" : "s"} Selected
                </span>
                <span
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedRows({
                      allSelected: false,
                      selectedCount: 0,
                      selectedRows: [],
                    });
                  }}
                >
                  Clear
                </span>
              </div>
            )}
          {selectedViewOption === "list" ? (
            <DataTableListComponent
              onSort={sortAction}
              sortField={sortField}
              sortDirection={sortDirection}
              data={dataRows}
              columns={
                isSelectAbleColumns2
                  ? [
                    {
                      name: (
                        <input
                          type="checkbox"
                          onChange={selectableCheckHandlerHeader}
                          checked={
                            selectedRows?.selectedRows
                              ? dataRows.every((obj2) =>
                                (selectedRows?.selectedRows ?? []).some(
                                  (obj1) =>
                                    obj1[selectPrimaryField] ===
                                    obj2[selectPrimaryField]
                                )
                              )
                              : false
                          }
                        />
                      ),
                      selector: (row) => (
                        <input
                          type="checkbox"
                          checked={
                            selectedRows?.selectedRows
                              ? selectedRows?.selectedRows.some(
                                (item) =>
                                  item[selectPrimaryField] ===
                                  row[selectPrimaryField]
                              )
                              : false
                          }
                          onChange={() => {
                            selectableCheckHandler(row);
                          }}
                        />
                      ),
                      sortable: false,
                      width: "50px",
                      minWidth: "20px",
                    },
                    ...listComponent,
                  ]
                  : listComponent
              }
              selectable={isSelectAbleColumns2 ? false : selectable}
              setSelectedRows={setSelectedRows}
              selectableRowSelected={selectableRowSelected}
            />
          ) : (
            <Row className="p-0 m-0 py-1 ">
              {dataRows &&
                dataRows.map((item, index) => {
                  return (
                    <CardComponent
                      item={item}
                      index={index}
                      key={index + "index_key"}
                      selectable={selectable}
                      setSelectedRows={setSelectedRows}
                      selectedRows={selectedRows}
                    />
                  );
                })}
            </Row>
          )}
          {totalRows > currentRows && (
            <div className="w-full datatable-pagination-div">
              <PaginationComponent
                totalRows={totalRows}
                changePage={pageNoChangeHandler}
                currentRows={currentRows}
                currentPage={currentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};


export default ThemeDataTable1;

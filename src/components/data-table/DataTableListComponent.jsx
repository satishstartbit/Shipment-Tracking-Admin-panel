import "./ThemeDataTable.css"; // Importing custom styles for the data table
import DataTable from "react-data-table-component";  // Importing the DataTable component
import ReactTableStyles1 from "./ReactTableStyles";  // Importing custom styles for React Table
// DataTableListComponent is a functional component that renders a DataTable
const DataTableListComponent = ({
  data, // Data to be displayed in the table
  columns, // Column definitions for the table
  selectable = false, // Determines whether rows can be selected or not
  setSelectedRows,  // Callback to handle changes in selected rows
  selectableRowSelected,  // Function to check if a row is selected
  onSort, // Callback function to handle sorting changes
  sortField,   // The field by which data is initially sorted
  sortDirection,  // The initial sort direction (either "asc" or "desc")
}) => {
  return (
    <DataTable
      onSort={onSort}  // Pass the onSort handler to handle sorting
      sortServer  // Enables server-side sorting
      defaultSortFieldId={sortField}  // Set the default field to sort by
      defaultSortAsc={sortDirection === "asc" ? true : false}  // Set the default sort direction
      columns={columns}  // Column definitions
      data={data}  // Data to be displayed in the table
      customStyles={ReactTableStyles1}  // Apply custom styles to the table
      responsive={true}  // Make the table responsive to screen size changes
      highlightOnHover  // Highlight rows when hovered
      selectableRows={selectable}  // Enable row selection based on the 'selectable' prop
      onSelectedRowsChange={setSelectedRows}  // Handle changes to selected rows
      selectableRowSelected={selectableRowSelected}  // Determine if a row is selected
    />
  );
};
// Export the DataTableListComponent to be used in other parts of the application
export default DataTableListComponent;


import { useState, useEffect } from "react";
import { UserFilters } from "../../components/ui/userFilters";
import { Button } from "../../components/ui/button";
import { AddUserDialog } from "../../components/ui/userForm";
import useFetchAPI from "../../hooks/useFetchAPI";
import moment from "moment"
import ThemeDataTable1 from "../../components/data-table/ThemeDataTable1"


const User = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [inputSearch, setInputSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [order, setOrder] = useState({
    orderBy: "name",
    order: "DESC",
  });

  const [getUsersFetchResponse, getUsersFetchHandler] = useFetchAPI(
    {
      url: `/users`,
      method: "GET",
      authRequired: true,
      sendImmediately: true,
      params: {
        page_size: pageSize,
        page_no: pageNo,
        search: inputSearch,
        order: order.order,
      },
    },
    (e) => {
      return e;
    },
    (e) => {
      return e?.response ?? true;
    }
  );

  const [customColumns, setCustomColumns] = useState([]);
  const retryOrRefreshAction = async () => {
    await getUsersFetchHandler();
  };

  const changePageRowHandle = async (page, pageSizes) => {
    await getUsersFetchHandler({
      params: {
        page_size: pageSizes,
        page_no: page,
        search: inputSearch,
        order: order.order,

      },
    });
    setPageNo(page);
    setPageSize(pageSizes);
  };

  const [savedTableColumns, setSavedTableColumns] = useState([
    { name: "EMAIL ID", key: "email" },
    { name: "FIRST NAME", key: "first_name" },
    { name: "LAST NAME", key: "last_name" },
    { name: "PHONE NUMBER", key: "mobile_no" },
    { name: "GENDER", key: "gender" },
    { name: "DATE OF BIRTH", key: "dob" },

  ]);

  useEffect(() => {
    setCustomColumns(
      (savedTableColumns ?? []).map((obj) => {
        return {
          name: obj?.name?.toUpperCase(),
          selector: (row) => {
            switch (obj?.key) {
              case "dob":
                return (
                  <span>
                    {row?.[obj?.key]
                      ? moment(row?.[obj?.key]).format("DD/MM/YYYY")
                      : ""}
                  </span>
                );


              case "gender":
                return (
                  <span
                    className={`px-2 py-1 rounded text-xs ${row?.[obj?.key] === "male"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {row?.[obj?.key] === "female" ? "Female" : "Male"}
                  </span>

                );
              default:
                return (
                  <span>
                    {row[obj?.key] == null ||
                      row[obj?.key] == "" ||
                      row[obj?.key] == undefined
                      ? ""
                      : row[obj?.key]}
                  </span>
                );
            }
          },

          sortable: false,
          minWidth: () => {
            if (obj?.key === "email" || obj?.key === "dob") {
              return "250px"
            }
            let width = "200px";
            return width;
          },
        };
      })
    );
  }, [savedTableColumns]);

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-[22px] font-semibold">Users</h2>
      <AddUserDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <div className="flex justify-between items-center mb-4 mt-4 sm:flex-row sm:justify-between sm:items-center">
        <UserFilters
          filter={inputSearch}
          setFilter={setInputSearch}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <Button onClick={() => setIsDialogOpen(true)} className="sm-w-[100%]">
          Add User
        </Button>
      </div>

      <ThemeDataTable1
        dataRows={getUsersFetchResponse?.data?.usersListing ?? []}
        isLoading={getUsersFetchResponse?.fetching}
        isError={getUsersFetchResponse?.error}
        listComponent={customColumns}
        changeRowPage={changePageRowHandle}
        totalRows={Number(getUsersFetchResponse?.data?.totalUserCount)}
        currentPage={pageNo}
        currentRows={pageSize}
        retryAction={retryOrRefreshAction}
      />

  
    </div>
  );
}
export default User
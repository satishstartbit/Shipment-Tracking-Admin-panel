
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import useFetchAPI from "../../hooks/useFetchAPI";
import ThemeDataTable1 from "../../components/data-table/ThemeDataTable1"
import { useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "../../components/ui/popover";

const Companies = () => {
  const navigate = useNavigate();

  // State for search input
  const [inputSearch, setInputSearch] = useState("");
  // Pagination state
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [order, setOrder] = useState({
    orderBy: "name",
    order: "DESC",
  });
  // API call to fetch companies
  const [getUsersFetchResponse, getUsersFetchHandler] = useFetchAPI(
    {
      url: `/company`,
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
  
  // Handle page or row size change
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

  // Table column configuration
  const [savedTableColumns, setSavedTableColumns] = useState([
    { name: "ACTION", key: "actions" },
    { name: "TRANSPORT COMPANY NAME", key: "company_name" },
    { name: "CITY", key: "city" },
    { name: "STATE", key: "state" },
    { name: "COUNTRY", key: "country" },
    { name: "USER NAME", key: "username" },
    { name: "FIRST NAME", key: "first_name" },
    { name: "LAST NAME", key: "last_name" },
    { name: "MOBILE NUMBER", key: "mobile_no" },
  ]);

  useEffect(() => {
    setCustomColumns(
      (savedTableColumns ?? []).map((obj) => {

        return {
          name: obj?.name?.toUpperCase(),
          selector: (row) => {

            let userDeatils = row["munshiId"]
            switch (obj?.key) {

              case "username":
              case "first_name":
              case "last_name":
              case "mobile_no":
                return userDeatils[obj?.key]

              case "actions":
                return <Popover asChild>
                  <PopoverTrigger asChild>
                    <button className="btn">. . .</button>
                  </PopoverTrigger>

                  <PopoverContent className="popover-content w-50" >
                    <div className="mb-2">
                      <button className="text-sm" onClick={() => navigate(`/editcompany/:${row["_id"]}`)}>
                        Edit Company
                      </button>
                    </div>

                  </PopoverContent>
                </Popover>

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
            if (obj?.key === "name") {
              return "250px"
            }
            if (obj?.key === "actions") {
              return "100px"
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
      <h2 className="text-[22px] font-semibold">Transport Companies</h2>

      <div className="flex justify-between items-center mb-5 mt-4 sm:flex-row sm:justify-between sm:items-center">

        <div>

        </div>
        <Button onClick={() => navigate("/createcompany")} className="sm-w-[100%]">
          Add Transport Company
        </Button>
      </div>

      <ThemeDataTable1
        dataRows={getUsersFetchResponse?.data?.CompanyListing ?? []}
        isLoading={getUsersFetchResponse?.fetching}
        isError={getUsersFetchResponse?.error}
        listComponent={customColumns}
        changeRowPage={changePageRowHandle}
        totalRows={Number(getUsersFetchResponse?.data?.totalCompanyCount)}
        currentPage={pageNo}
        currentRows={pageSize}
        retryAction={retryOrRefreshAction}
      />

    </div>
  );
}
export default Companies
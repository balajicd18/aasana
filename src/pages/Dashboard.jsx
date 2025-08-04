// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import {createColumnHelper,flexRender, getCoreRowModel, getFilteredRowModel,getSortedRowModel,useReactTable,getPaginationRowModel} from "@tanstack/react-table";
import {ArrowUpDown,ChevronLeft,ChevronRight,ChevronsLeft,ChevronsRight,Search,User,Calendar,Code,Workflow, Eye,Phone  } from "lucide-react";
import nodata from '../assests/images/noData.webp'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import whatsapp from '../assests/images/WhatsApp.webp'
import voice from '../assests/images/voice.png'


const Dashboard = () => {
const [source, setSource] = useState("");
  const [bookinglist, setBookingList] = useState([])
  const [allPatient, setAllPatient] = useState([])

  const navigate = useNavigate(); // ✅ Hook called at top level

const columnHelper = createColumnHelper();
const columnHelperPatient = createColumnHelper();



useEffect(() => {
    axios
      .get("https://assana-test.vercel.app/v1/nurse/get-all-bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Full response:", response);
        setBookingList(response.data.result); 
        setSource(response.data.result.source); // ← store bookings in state
        // ← store bookings in state
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });

      axios.get("https://assana-test.vercel.app/v1/nurse/get-all-patients", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Full response:", response);
        setAllPatient(response.data.result); // ← store bookings in state
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });


  }, []);

  console.log('////',bookinglist);
  

const columns = [


  columnHelper.accessor("patient_name", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} /> Patient Name
      </span>
    ),
  }),


columnHelper.accessor("booking_time", {
  id:"101",
  cell: (info) => {
    const bookingTime = info.getValue();

    if (!bookingTime) {
      return <span className="text-red-500 text-sm">No time</span>;
    }

    const [date] = bookingTime.split("T");

    return (
      <div>
        <p className="text-sm">{date}</p>
      </div>
    );
  },
  header: () => (
    <span className="flex items-center">
      <Calendar className="mr-2" size={16} />
      Booking Date
    </span>
  ),
}),

columnHelper.accessor("booking_time", {
  id:"102",
  cell: (info) => {
    const bookingTime = info.getValue();

    if (!bookingTime) {
      return <span className="text-red-500 text-sm">No time</span>;
    }

    const [date, time] = bookingTime.split("T");
    const timeObj = new Date(`1970-01-01T${time}`); // any date will work
    const formattedTime = timeObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <div>
        <p className="text-sm">{formattedTime}</p>
      </div>
    );
  },
  header: () => (
    <span className="flex items-center">
      <Calendar className="mr-2" size={16} />
      Booking Time
    </span>
  ),
}),



  columnHelper.accessor("whatsapp_number", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <Phone className="mr-2" size={16} />Whatsapp Number
      </span>
    ),
  }),

  columnHelper.accessor("source", {
    cell: (info) => (
      <div className='flex  items-center'>
      <img
        src={info.getValue()==="VOICECALL"?voice:whatsapp}
        alt="source icon"
        className="w-6 h-6 object-contain"
      />
      <span className='bg-[#fbe2e2] px-5 py-1 rounded-lg'>Voice</span>
      </div>
    ),
    header: () => (
      <span className="flex items-center">
        <Code className="mr-2" size={16} /> Source
      </span>
    ),
  }),

columnHelper.accessor("status", {
  cell: (info) => {
    const currentStatus = info.getValue();
    const row = info.row.original;
    const bookingId = row.id;

    const statusOptions = {
      PENDING: 1,
      CONFIRMED: 2,
      CANCELLED: 3,
      RESHEDULED: 4,
      COMPLETED: 5,
    };

    const handleStatusChange = async (e) => {
      const selectedLabel = e.target.value;
      const statusCode = statusOptions[selectedLabel];
      console.log("statusCode",statusCode);
      
      try {
        await axios.put(
          `https://assana-test.vercel.app/v1/nurse/booking/${bookingId}/statuschange`,
          { status: statusCode },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
 
        // Optionally trigger table refresh here
      } catch (err) {
        console.error("Failed to update status:", err);
      }
    };

    return (
      <select
        className="p-2 rounded-lg border border-gray-300 text-sm"
        value={currentStatus}
        onChange={handleStatusChange}
      >
        {Object.entries(statusOptions).map(([label]) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
    );
  },

  header: () => (
    <span className="flex items-center">
      <Code className="mr-2" size={16} />
      Status
    </span>
  ),
}),


  columnHelper.accessor("action", {
  cell: (info) => {
    const row = info.row.original;

    return (
      <Eye
        className="text-[#3cc24e] font-bold cursor-pointer"
        onClick={() =>
          navigate("/action", {
            state: {
              booking_id: row.id, 
              source: row.source,
            },
          })
        }
      />
    );
  },
  header: () => (
    <span className="flex items-center">
      <Workflow className="mr-2" size={16} /> Action
    </span>
  ),
})


];



// all patient list
const columns1 = [


  columnHelperPatient.accessor("first_name", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} /> First Name
      </span>
    ),
  }),

   columnHelperPatient.accessor("last_name", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} /> Last Name
      </span>
    ),
  }),


   columnHelperPatient.accessor("gender", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <User className="mr-2" size={16} /> Gender
      </span>
    ),
  }),






  columnHelperPatient.accessor("phone_number", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="flex items-center">
        <Phone className="mr-2" size={16} />Phone Number
      </span>
    ),
  }),

  columnHelperPatient.accessor("source", {
    cell: (info) => (
      <div className='flex  items-center'>
      <img
        src={info.getValue()==="VOICECALL"?voice:whatsapp}
        alt="source icon"
        className="w-6 h-6 object-contain"
      />
      <span className='bg-[#fbe2e2] px-5 py-1 rounded-lg'>Voice</span>
      </div>
    ),
    header: () => (
      <span className="flex items-center">
        <Code className="mr-2" size={16} /> Source
      </span>
    ),
  }),

  // columnHelperPatient.accessor("status", {
  //   cell: (info) => (<button className={info.getValue()==="PENDING"?'bg-[red] w-25 py-2 rounded-lg text-white':'bg-[#07bc0c] w-25 py-2 rounded-lg text-white'}>{info.getValue()}</button>),
  //   header: () => (
  //     <span className="flex items-center">
  //       <Code className="mr-2" size={16} /> Status
  //     </span>
  //   ),
  // }),

columnHelper.accessor("action", {
  cell: (info) => {
    const row = info.row.original;

    return (
      <Eye
        className="text-[#3cc24e] font-bold cursor-pointer"
        onClick={() =>
          navigate("/actionPatient", {
            state: {
              patient_id: row.patient_id, // ✅ pass patient_id
            },
          })
        }
      />
    );
  },
  header: () => (
    <span className="flex items-center">
      <Workflow className="mr-2" size={16} /> Action
    </span>
  ),
}),







];






    
const data = React.useMemo(() => bookinglist, [bookinglist]);
const dataAllPatient = React.useMemo(() => allPatient, [allPatient]);


        const [sorting, setSorting] = React.useState([]);
        const [globalFilter, setGlobalFilter] = React.useState("");
    
        const table = useReactTable({
        data,
        columns,
        state: {
          sorting,
          globalFilter,
        },
        initialState: {
          pagination: {
            pageSize: 4,
          },
        },
        getCoreRowModel: getCoreRowModel(),
    
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
      });


      const allPatients = useReactTable({
       data: dataAllPatient,
       columns: columns1,
        state: {
          sorting,
          globalFilter,
        },
        initialState: {
          pagination: {
            pageSize: 4,
          },
        },
        getCoreRowModel: getCoreRowModel(),
    
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
      });



  return (
    <>
      <div className="flex flex-col min-h-screen  mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-[] ">
        <h1 className='font-bold text-2xl'>Upcoming Appointments</h1>
      <div className="mb-4 relative mt-8">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="w-60 pl-10 pr-4 py-2 border-0 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#ed7d7d38] text-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <ArrowUpDown className="ml-2" size={14} />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
  {table.getFilteredRowModel().rows.length === 0 ? (
    <tr>
      <td colSpan={columns.length} className="text-center py-10">
        <img
          src={nodata}
          alt="No Data"
          className="mx-auto  w-50 opacity-70"
        />
        <p className="text-gray-500 mt-2">No data found</p>
      </td>
    </tr>
  ) : (
    table.getRowModel().rows.map((row) => (
      <tr key={row.id} className="hover:bg-gray-50">
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            className="px-6 py-4 whitespace-nowrap text-sm"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="mr-2">Items per page</span>
          <select
            className="border border-gray-300 rounded-md shadow-sm  p-2 outline-0"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[2, 5, 10, 20, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft size={20} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={20} />
          </button>

          <span className="flex items-center">
            <input
              min={1}
              max={table.getPageCount()}
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 p-2 rounded-md border border-gray-300 text-center bg-[#ed7d7d38] text-black font-bold"
            />
            <span className="ml-1">of {table.getPageCount()}</span>
          </span>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={20} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>

{/* all patient */}

        <h1 className='font-bold text-2xl mt-10'>All Patients</h1>
      <div className="mb-4 relative mt-8">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="w-60 pl-10 pr-4 py-2 border-0 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#ed7d7d38] text-black">
            {allPatients.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <ArrowUpDown className="ml-2" size={14} />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
  {allPatients.getFilteredRowModel().rows.length === 0 ? (
    <tr>
      <td colSpan={columns1.length} className="text-center py-10">
        <img
          src={nodata}
          alt="No Data"
          className="mx-auto  w-50 opacity-70"
        />
        <p className="text-gray-500 mt-2">No data found</p>
      </td>
    </tr>
  ) : (
    allPatients.getRowModel().rows.map((row) => (
      <tr key={row.id} className="hover:bg-gray-50">
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            className="px-6 py-4 whitespace-nowrap text-sm"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="mr-2">Items per page</span>
          <select
            className="border border-gray-300 rounded-md shadow-sm  p-2 outline-0"
            value={allPatients.getState().pagination.pageSize}
            onChange={(e) => {
              allPatients.setPageSize(Number(e.target.value));
            }}
          >
            {[2, 5, 10, 20, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => allPatients.setPageIndex(0)}
            disabled={!allPatients.getCanPreviousPage()}
          >
            <ChevronsLeft size={20} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => allPatients.previousPage()}
            disabled={!allPatients.getCanPreviousPage()}
          >
            <ChevronLeft size={20} />
          </button>

          <span className="flex items-center">
            <input
              min={1}
              max={allPatients.getPageCount()}
              type="number"
              value={allPatients.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                allPatients.setPageIndex(page);
              }}
              className="w-16 p-2 rounded-md border border-gray-300 text-center bg-[#ed7d7d38] text-black font-bold"
            />
            <span className="ml-1">of {allPatients.getPageCount()}</span>
          </span>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => allPatients.nextPage()}
            disabled={!allPatients.getCanNextPage()}
          >
            <ChevronRight size={20} />
          </button>

          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => allPatients.setPageIndex(allPatients.getPageCount() - 1)}
            disabled={!allPatients.getCanNextPage()}
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>

    </div>
</>

  );
};

export default Dashboard;

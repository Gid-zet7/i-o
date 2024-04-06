"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import { useSession } from "next-auth/react";
import CancelIcon from "@mui/icons-material/Close";
import { updateEmployee } from "@/lib/actions";
import SideMenu from "@/stories/SideMenu/SideMenu";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbar,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { getData } from "@/lib/actions";
import Paper from "@mui/material/Paper";
import { Avatar } from "@mui/material";
import { CardTitle, CardSubtitle, Table } from "reactstrap";

type RowEmployee = {
  isNew: boolean;
  id: string;
  lastName: string;
  firstName: string;
  gender: string;
  department: string;
  contact: string;
  salary: string;
};

export default function EmployeeManagement() {
  const { data: session } = useSession();
  const [rows, setRows] = React.useState<RowEmployee[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesData = await getData(session);
        // console.log(employeesData);
        setRows(
          employeesData.map((employee: Employee) => ({
            id: employee._id,
            avatar: employee.user.avatarUrl,
            lastName: employee.lastname,
            firstName: employee.firstname,
            bio: employee.bio,
            gender: employee.gender,
            contact: employee.contact,
            permanent_address: employee.permanent_address,
            current_address: employee.current_address,
            age: employee.birthday,
            position: employee.position,
            skills: employee.skills,
            experience: employee.experience,
            education: employee.education,
            startDate: new Date(employee.startDate).toLocaleDateString(),
            department: employee.department.name,
            // contact: employee.contact,
            salary: "$1000",
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  // const handleDeleteClick = (id: GridRowId) => () => {
  //   if (rows)
  //   setRows(rows.filter((row) => row.id !== id));
  // };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: RowEmployee) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: RowEmployee) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    console.log(newRow);
    try {
      const result = await updateEmployee(
        session,
        newRow.id,
        newRow.firstName,
        newRow.lastName,
        newRow.bio,
        newRow.gender,
        newRow.contact,
        newRow.permanent_address,
        newRow.current_address,
        newRow.age,
        newRow.department,
        newRow.position,
        newRow.skills,
        newRow.experiences,
        newRow.education,
        newRow.performance,
        newRow.startDate
      );
      if (result !== undefined && result !== null) {
        console.log("success!");
        // setError("");
        // setIsSuccess("Succesful");
        // router.back();
      } else {
        console.log("error!");
        // setError("Failed to create employee. Please check the input.");
      }
    } catch (error) {}

    const updatedRow = {
      ...newRow,
      isNew: false,
      id: newRow.id,
      lastName: newRow.lastName,
      firstName: newRow.firstName,
      gender: newRow.gender,
      position: newRow.position,
      department: newRow.department,
      startDate: newRow.startDate,
      contact: newRow.contact,
      salary: newRow.salary,
    };
    setRows(
      rows.map((row: RowEmployee) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 180 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 80,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: false,
    },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // },
    {
      field: "gender",
      headerName: "Gender",
      type: "string",
      width: 120,
      editable: false,
    },
    {
      field: "position",
      headerName: "Position",
      type: "string",
      width: 140,
      editable: false,
    },
    {
      field: "department",
      headerName: "Department",
      type: "string",
      width: 160,
      editable: false,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      type: "string",
      width: 160,
      editable: false,
    },
    {
      field: "contact",
      headerName: "Contact",
      type: "string",
      width: 130,
      editable: true,
    },
    {
      field: "salary",
      headerName: "Salary",
      type: "string",
      width: 110,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          // <GridActionsCellItem
          //   icon={<DeleteIcon />}
          //   label="Delete"
          //   onClick={handleDeleteClick(id)}
          //   color="inherit"
          // />,
        ];
      },
    },
  ];

  return (
    <>
      <SideMenu />
      <section className="">
        <Paper className="p-5">
          <CardTitle tag="h5">Employee Management</CardTitle>

          <CardSubtitle className="mb-2 text-gray-300" tag="h6">
            Overview of the projects
          </CardSubtitle>
          <Box
            sx={{
              height: 500,
              width: "100%",
              "& .actions": {
                color: "text.secondary",
              },
              "& .textPrimary": {
                color: "text.primary",
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              slots={{
                toolbar: GridToolbar,
              }}
              slotProps={{
                toolbar: { setRows, setRowModesModel },
              }}
            />
          </Box>
        </Paper>
      </section>
    </>
  );
}

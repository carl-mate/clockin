"use client";

import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHooks } from "./hooks";
import moment from "moment";

export default function CheckinList() {
  const { checkins, handleDelete } = useHooks();

  const columns = [
    { field: "created_at", headerName: "Created At", minWidth: 250 },
    { field: "hours", headerName: "Hours", minWidth: 250 },
    { field: "tag", headerName: "Tag", minWidth: 250 },
    { field: "activity", headerName: "Activity", minWidth: 250 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => handleDelete(params.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const rows = checkins.map((checkin) => ({
    id: checkin.id,
    created_at: moment(checkin.created_at).format("MMMM Do YYYY, h:mm:ss a"),
    hours: checkin.hours,
    tag: checkin.tag,
    activity: checkin.activity,
  }));

  return (
    <>
      <DataGrid rows={rows} columns={columns} autoPageSize />
    </>
  );
}

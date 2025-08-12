'use client';

import AGTable from "@/components/datatable/AGTable";
import { AgGridReact } from "ag-grid-react";

export default function SQLPage() {
  return <div>SQL Page
     <AgGridReact
     rowData={[{ id: 1, name: "John" }, { id: 2, name: "Jane" }]}
     columnDefs={[
       { field: "id" },       
       { field: "name" },
     ]}
     
     />

  </div>;
}

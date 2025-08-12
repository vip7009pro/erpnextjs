'use client';

import AGTable from "@/components/datatable/AGTable";
import { AgGridReact } from "ag-grid-react";

export default function SQLPage() {
  return <div className="h-screen">SQL Page
     <AGTable
     toolbar={<></>}
     data={[
       {id: 1, name: "John"},
       {id: 2, name: "Jane"},
     ]}
     columns={[
       {field: "id"},
       {field: "name"},
     ]}
     onSelectionChange={(e) => console.log(e)}
     /> 

  </div>;
}

"use client";


import WorkflowEditor from "@/components/workflowmanager/WorkflowEditor";
import { ReactFlowProvider } from "reactflow";

export default function WorkflowPage() {
  return <ReactFlowProvider><WorkflowEditor /></ReactFlowProvider>;
}

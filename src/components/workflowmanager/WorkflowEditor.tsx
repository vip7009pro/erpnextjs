'use client';

import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  useNodesState,
  useEdgesState,
  Connection,
  Node,
  Handle,
  Position,
  NodeChange,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setNodes, setEdges } from '@/store/workflowSlice';

// Custom node types with handles
const nodeTypes: NodeTypes = {
  form: ({ data }) => (
    <div style={{ padding: 10, border: '1px solid #777', borderRadius: 5, background: '#fff' }}>
      <Handle type="target" position={Position.Top} />
      <strong>{data.label}</strong>
      <p>Form Node</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  ),
  page: ({ data }) => (
    <div style={{ padding: 10, border: '1px solid #777', borderRadius: 5, background: '#fff' }}>
      <Handle type="target" position={Position.Top} />
      <strong>{data.label}</strong>
      <p>Page Node</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  ),
  decision: ({ data }) => (
    <div style={{ padding: 10, border: '1px solid #777', borderRadius: 5, background: '#fff' }}>
      <Handle type="target" position={Position.Top} />
      <strong>{data.label}</strong>
      <p>Decision Node</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  ),
  start: ({ data }) => (
    <div style={{ padding: 10, border: '1px solid #777', borderRadius: 5, background: '#fff' }}>
      <strong>{data.label}</strong>
      <p>Start Node</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  ),
  end: ({ data }) => (
    <div style={{ padding: 10, border: '1px solid #777', borderRadius: 5, background: '#fff' }}>
      <Handle type="target" position={Position.Top} />
      <strong>{data.label}</strong>
      <p>End Node</p>
    </div>
  ),
};

const WorkflowEditor: React.FC = () => {
  const dispatch = useDispatch();
  const { nodes: initialNodes, edges: initialEdges } = useSelector((state: RootState) => state.workflow);
  const [nodes, setNodesState, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdgesState, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition, getNodes } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = addEdge(params, edges);
      setEdgesState(newEdge);
      dispatch(setEdges(newEdge));
    },
    [edges, setEdgesState, dispatch]
  );

  const onNodesChangeHandler = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);
      const updatedNodes = nodes.map((node) => ({ ...node }));
      dispatch(setNodes(updatedNodes));
    },
    [nodes, onNodesChange, dispatch]
  );

  // Handle node deletion with Delete key
  const onDeleteNode = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        const selectedNodes = getNodes().filter((node: { selected: any; }) => node.selected);
        if (selectedNodes.length === 0) return;

        const selectedNodeIds = selectedNodes.map((node: { id: any; }) => node.id);
        const newNodes = nodes.filter((node: { id: any; }) => !selectedNodeIds.includes(node.id));
        const newEdges = edges.filter(
          (edge) => !selectedNodeIds.includes(edge.source) && !selectedNodeIds.includes(edge.target)
        );

        setNodesState(newNodes);
        setEdgesState(newEdges);
        dispatch(setNodes(newNodes));
        dispatch(setEdges(newEdges));
      }
    },
    [nodes, edges, setNodesState, setEdgesState, dispatch, getNodes]
  );

  // Handle drag-and-drop from sidebar
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData('application/reactflow');
      if (!nodeType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${nodes.length + 1}`,
        type: nodeType,
        position,
        data: { label: `New ${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node` },
      };

      setNodesState((nds) => nds.concat(newNode));
      dispatch(setNodes([...nodes, newNode]));
    },
    [nodes, setNodesState, dispatch, screenToFlowPosition]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drag start from sidebar
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  // Add event listener for Delete key
  useEffect(() => {
    document.addEventListener('keydown', onDeleteNode);
    return () => {
      document.removeEventListener('keydown', onDeleteNode);
    };
  }, [onDeleteNode]);

  // Sidebar node types
  const nodeTypesList = ['form', 'page', 'decision', 'start', 'end'];

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '200px',
          background: '#f0f0f0',
          padding: '10px',
          borderRight: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <h3>Node Types</h3>
        {nodeTypesList.map((type) => (
          <div
            key={type}
            draggable
            onDragStart={(event) => onDragStart(event, type)}
            style={{
              padding: '10px',
              background: '#fff',
              border: '1px solid #777',
              borderRadius: '5px',
              cursor: 'grab',
              textAlign: 'center',
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        ))}
      </div>

      {/* React Flow Canvas */}
      <div
        style={{ flex: 1 }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChangeHandler}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};

export default WorkflowEditor;
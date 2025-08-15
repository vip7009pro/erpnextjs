'use client';

import React from 'react';

// Sidebar.tsx
export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="p-4 bg-gray-100">
      <div
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
        className="p-2 bg-white border rounded mb-2 cursor-move"
      >
        Default Node
      </div>
      <div
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
        className="p-2 bg-white border rounded mb-2 cursor-move"
      >
        Input Node
      </div>
    </aside>
  );
}

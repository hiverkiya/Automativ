"use client";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  type Connection,
  Controls,
  type Edge,
  type EdgeChange,
  MarkerType,
  MiniMap,
  type Node,
  type NodeChange,
  Panel,
  ReactFlow,
} from "@xyflow/react";
import { useCallback, useMemo, useState } from "react";
import "@xyflow/react/dist/style.css";
import { useSetAtom } from "jotai";
import { ErrorView, LoadingView } from "@/components/entity-components";
import { nodeComponents } from "@/config/node-components";
import { AddNodeButton } from "@/features/editor/components/add-node-button";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";
import { NodeType } from "@/generated/prisma";
import { editorAtom } from "../store/atoms";
import { ExecuteWorkflowButton } from "./execute-workflow-button";

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const setEditor = useSetAtom(editorAtom);
  const [nodes, setNodes] = useState<Node[]>(workflow.nodes);
  const [edges, setEdges] = useState<Edge[]>(workflow.edges);
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
  // React Flow state is intentionally local and unsaved until the header or
  // execute control serializes the full graph through the workflow mutation.
  const hasManualTrigger = useMemo(() => {
    return nodes.some((node) => node.type === NodeType.MANUAL_TRIGGER);
  }, [nodes]);

  const defaultEdgeOptions = useMemo(
    () => ({
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 1, stroke: "#93c5fd" },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 10,
        height: 10,
        color: "#93c5fd",
      },
    }),
    [],
  );

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeComponents}
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        onInit={setEditor}
        snapGrid={[25, 25]}
        snapToGrid
        panOnScroll
        panOnDrag={[2]}
        selectionKeyCode={["Shift"]}
        multiSelectionKeyCode={["Control", "Meta"]}
        deleteKeyCode={["Delete"]}
        selectionOnDrag
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={25}
          size={1.5}
          className="opacity-40"
          color="#93c5fd"
        />

        <Controls className="bg-background/80 backdrop-blur-sm border-border shadow-sm rounded-lg overflow-hidden [&>button]:border-border [&>button]:bg-transparent hover:[&>button]:bg-muted/50" />
        <MiniMap
          pannable
          zoomable
          className="rounded-xl border border-border shadow-md bg-background/50 backdrop-blur-md"
         
          nodeColor={(node) => {
            switch (node.type) {
              case "trigger":
                return "#2563eb";
              case "action":
                return "#0891b2";
              default:
                return "#64748b";
            }
          }}
        />
        <Panel position="top-right">
          <AddNodeButton />
        </Panel>
        {hasManualTrigger && (
          <Panel position="bottom-center">
            <ExecuteWorkflowButton workflowId={workflowId} />
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};
export const EditorLoading = () => {
  return <LoadingView message="Editor coming through..." />;
};
export const EditorError = () => {
  return <ErrorView message="Error loading editor" />;
};

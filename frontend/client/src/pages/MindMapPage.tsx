import ReactFlow, { Background, Controls, useNodesState,
  useEdgesState } from "reactflow";
import "reactflow/dist/style.css";

import CenterNode from "../components/mindmap/CenterNode";
import ClusterNode from "../components/mindmap/ClusterNode";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/APIclient";
import UrlNode from "../components/mindmap/UrlNode";

const nodeTypes = {
  center: CenterNode,
  cluster: ClusterNode,
  url: UrlNode
};


const MindMapPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/');
  const hash = path[3];
  const title = hash.split('-')[0];
  const brainTitle = title.replace("%20", " ");
  const mindmap = localStorage.getItem("mindmap") as string
  const data = JSON.parse(mindmap)
  const nodes: any = [];
  const edges: { id: string; source: string; target: any; }[] | undefined = [];
  const CENTER_X = 0;
  const CLUSTER_X = 350;
  const URL_X = 750;
  const CLUSTER_GAP = 250;
  const URL_GAP = 70;

  useEffect(() => {
    const CheckBrain = async () => {
      try {
        const JsonMindmap = localStorage.getItem("mindmap")
        if(JsonMindmap == undefined || JsonMindmap == null || !data || data.clusters == undefined || JsonMindmap.length == 0) throw new Error()

        await api.get(`/home/brain/${hash}`) 
      } catch(err) {
        navigate("/error")
      }
    }
    CheckBrain()
  }, [])
  nodes.push({
    id: "center",
    type: "center",
    position: { x: CENTER_X, y: 0 },
    data: { label: brainTitle },
    draggable: false
  });

  const totalClustersHeight =
    (data.clusters.length - 1) * CLUSTER_GAP;

  data.clusters.forEach((cluster: any, clusterIndex: number) => {
    const clusterY =
      clusterIndex * CLUSTER_GAP - (totalClustersHeight + (cluster.urls.length - 1) * URL_GAP) / 2;

    // Cluster node
    nodes.push({
      id: cluster.id,
      type: "cluster",
      position: { x: CLUSTER_X, y: clusterY },
      data: { name: cluster.name }
    });

    edges.push({
      id: `center-${cluster.id}`,
      source: "center",
      target: cluster.id
    });

    // URL nodes
    cluster.urls.forEach((url: string, urlIndex: number) => {
      const urlY =
        clusterY + urlIndex * URL_GAP - ((cluster.urls.length - 1) * URL_GAP) / 2 ;

      const urlNodeId = `${cluster.id}-url-${urlIndex}`;

      nodes.push({
        id: urlNodeId,
        type: "url",
        position: { x: URL_X, y: urlY },
        data: { url }
      });

      edges.push({
        id: `${cluster.id}-${urlNodeId}`,
        source: cluster.id,
        target: urlNodeId
      });
    });
  });
  const [Nodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [Edges, setEdges, onEdgesChange] = useEdgesState(edges);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={Nodes}
        edges={Edges}
        nodeTypes={nodeTypes}
        fitView
        onNodesChange={onNodesChange}   
        onEdgesChange={onEdgesChange}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default MindMapPage
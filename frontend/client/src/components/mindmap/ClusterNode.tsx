import { Handle, Position } from "reactflow";

const ClusterNode = ({ data }: any) => {
  return (
    <div className="bg-white">
      <div className="h-24 w-64 rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.5)] bg-fuchsia-800 text-[#00FFFF] flex items-center justify-center text-center font-medium p-4">
        {data.name}
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default ClusterNode;

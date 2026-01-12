import { Handle, Position } from "reactflow";

const CenterNode = ({ data }: any) => {
  return (
    <div className="w-32 h-32 rounded-full bg-fuchsia-950 text-[#00FFFF] flex items-center justify-center text-center font-semibold shadow-[0px_3px_10px_rgba(0,0,0,0.5)] line-clamp-3`">
      {data.label}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default CenterNode

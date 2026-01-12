import { Handle, Position } from "reactflow";

const UrlNode = ({ data }: any) => {
  return (
    <div className="bg-white border rounded-lg shadow p-3 text-sm">
      <a
        href={data.url}
        target="_blank"
        className="text-blue-600 hover:underline"
      >
        {data.url}
      </a>

      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default UrlNode;

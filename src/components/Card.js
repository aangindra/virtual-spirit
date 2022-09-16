import React from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

const Card = ({ data, onEdit, onDelete }) => (
  <div className="bg-white miui-shadow max-w-xs rounded-xl py-4">
    <div className="px-4 mb-4">
      <h2 className="text-3xl truncate font-bold">{data.title}</h2>
    </div>
    <div className="px-4">
      <p>{data.body}</p>
    </div>
    <div className="flex px-4 mt-8 justify-end gap-2">
      <span className="bg-indigo-500 p-1 rounded-lg">
        <HiOutlinePencilAlt
          size={32}
          className="cursor-pointer text-white"
          onClick={onEdit}
        />
      </span>
      <span className="bg-rose-700 p-1 rounded-lg">
        <HiOutlineTrash
          size={32}
          className="cursor-pointer text-white"
          onClick={onDelete}
        />
      </span>
    </div>
  </div>
);

export default Card;

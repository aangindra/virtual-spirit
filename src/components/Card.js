import React from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

const Card = ({ title, children }) => (
  <div className="bg-white shadow-md max-w-xs rounded-lg py-4">
    <div className="px-4">
      <p>
        This impressive paella is a perfect party dish and a fun meal to cook
        together with your guests. Add 1 cup of frozen peas along with the
        mussels, if you like.
      </p>
    </div>
    <div className="flex px-4 mt-2">
      <HiOutlinePencilAlt />
      <HiOutlineTrash />
    </div>
  </div>
);

export default Card;

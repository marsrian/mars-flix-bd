import { useState } from "react";
import { Button } from "../ui/button";

const DeleteButton = ({ onDelete, label }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
        <div className={`p-4 rounded-lg bg-gray-200 dark:bg-gray-900`}>
          <div className="text-center">
            Are you want to delete?
          </div>
          <div className="flex gap-2 mt-1">
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="border border-gray-400 p-2 rounded-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              className="text-red-600 border border-gray-400 p-2 rounded-sm"
            >
              Yes,&nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Button
        onClick={() => setShowConfirm(true)}
        className="w-full bg-red-600  text-white hover:bg-red-500"
      >
        {label}
      </Button>
    </div>
  );
};

export default DeleteButton;
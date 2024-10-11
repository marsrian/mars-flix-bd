import React from "react";

const Modal = ({ children, modalOpen, setModalOpen }) => {
  return (
    <div className="">
      {modalOpen && (
        <div className="fixed inset-0 w-[350px] md:w-[500px] mx-auto mt-16 mb-4 rounded-sm shadow-lg bg-white dark:bg-gray-900">
          <div className="flex justify-center items-center h-full">
            <div className="max-h-[90%] md:max-w-lg overflow-auto flex flex-col items-end bg-secondaryColor p-5">
              <button
                onClick={() => setModalOpen(false)}
                className="text-2xl mb-3 hover:text-red-600"
              >
                &times;
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
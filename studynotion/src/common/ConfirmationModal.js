import React from "react";

export default function ConfirmationModal({ modalData, setModalData }) { // yhaa p dikkt hain
  const {
    text1 = "Are you sure?",
    text2 = "",
    btn1Text = "Yes",
    btn2Text = "No",
    btn1Handler = () => {},
  } = modalData || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-[90%] max-w-md rounded-lg bg-richblack-800 p-6 shadow-lg">
        <h2 className="mb-2 text-lg font-semibold text-richblack-5">{text1}</h2>
        {text2 && <p className="mb-4 text-sm text-richblack-300">{text2}</p>}

        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              btn1Handler();
              setModalData(null);
            }}
            className="rounded-md bg-yellow-50 px-4 py-2 text-sm font-medium text-black transition duration-200 hover:bg-yellow-100"
          >
            {btn1Text}
          </button>
          <button
            onClick={() => setModalData(null)}
            className="rounded-md border border-richblack-400 px-4 py-2 text-sm font-medium text-richblack-200 transition duration-200 hover:bg-richblack-700"
          >
            {btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}

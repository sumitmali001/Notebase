import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { remove } from "../redux/notebaseSlice";
import { toast } from "react-toastify";

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes.notes);

  const note = notes.find((item) => item._id === id);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(note.value);
    toast.success("Note Copied!");
  };

  const handleDelete = () => {
    dispatch(remove(note));
    toast.success("Note Deleted Successfully!");
    navigate("/notes");
  };

  const handleEdit = () => {
    navigate(`/?noteid=${note?._id}`);
  };

  if (!note) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-gray-600">
          Note not found.
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Back Button */}
      <div className="mb-5">
        <button
          onClick={() => navigate("/notes")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 transition-all duration-200 hover:bg-red-200 hover:border-red-300 hover:scale-105 active:scale-95"
        >
          <i className="ri-arrow-left-line text-lg"></i>
          <span className="font-medium">Back to Notes</span>
        </button>
      </div>

      {/* Note Card */}
      <div className="rounded-2xl border border-red-200 bg-white shadow-lg">
        {/* Header */}
        <div className="border-b border-red-100 p-8">
          <div className="flex justify-between items-start">
            {/* Title & Date */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800">{note.title}</h1>

              <p className="mt-2 text-sm text-gray-500">
                Created on : {formatDate(note.createdAt)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {/* Edit */}
              <button
                onClick={handleEdit}
                title="Edit"
                className="h-9 w-9 rounded-lg border border-red-200 bg-red-50 flex items-center justify-center transition-all duration-200 hover:bg-red-200 hover:border-red-300 hover:scale-105 active:scale-95"
              >
                <i className="ri-pencil-fill text-red-600 text-lg"></i>
              </button>

              {/* Copy */}
              <button
                onClick={handleCopy}
                title="Copy"
                className="h-9 w-9 rounded-lg border border-red-200 bg-red-50 flex items-center justify-center transition-all duration-200 hover:bg-red-200 hover:border-red-300 hover:scale-105 active:scale-95"
              >
                <i className="ri-file-copy-line text-red-600 text-lg"></i>
              </button>

              {/* Delete */}
              <button
                onClick={handleDelete}
                title="Delete"
                className="h-9 w-9 rounded-lg border border-red-200 bg-red-50 flex items-center justify-center transition-all duration-200 hover:bg-red-200 hover:border-red-300 hover:scale-105 active:scale-95"
              >
                <i className="ri-delete-bin-7-line text-red-600 text-lg"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-gray-700 text-lg leading-8 whitespace-pre-wrap">
            {note.value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;

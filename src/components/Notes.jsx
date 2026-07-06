import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update, reset, remove } from "../redux/notebaseSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  function handledelete(noteid) {
    dispatch(remove(noteid));
  }
  const dispatch = useDispatch();
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

  const notes = useSelector((state) => state.notes.notes);
  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="m-5">
      {/* Search Bar */}
      <div className="w-80">
        <div
          className="
            flex items-center
            mb-5
            h-12
            px-5
            rounded-full
            bg-white
            border border-gray-300
            transition-all duration-200
            focus-within:border-red-400
            focus-within:ring-2
            focus-within:ring-red-100
          "
        >
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search notes..."
            className="
              ml-3
              flex-1
              bg-transparent
              outline-none
              text-gray-700
              placeholder:text-gray-400
            "
          />
        </div>
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-2">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div
              key={note._id}
              className="w-full mb-6 rounded-2xl border border-red-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-red-300 hover:shadow-lg"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                {/* Title & Date */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {note.title}
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Created on : {formatDate(note.createdAt)}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {/* Edit */}
                  <button
                    onClick={() => {
                      navigate(`/?noteid=${note?._id}`);
                    }}
                    title="Edit"
                    className="h-9 w-9 rounded-lg border border-red-200 bg-red-50 flex items-center justify-center transition-all duration-200 hover:bg-red-200 hover:border-red-300 hover:scale-105 active:scale-95"
                  >
                    <i className="ri-pencil-fill text-red-600 text-lg"></i>
                  </button>

                  {/* View */}
                  <button
                    onClick={() => {
                      navigate(`/notes/${note?._id}`);
                    }}
                    title="View"
                    className="h-9 w-9 rounded-lg border border-red-200 bg-red-50 flex items-center justify-center transition-all duration-200 hover:bg-red-200 hover:border-red-300 hover:scale-105 active:scale-95"
                  >
                    <i className="ri-eye-line text-red-600 text-lg"></i>
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      handledelete(note?._id);
                    }}
                    title="Delete"
                    className="h-9 w-9 rounded-lg border border-red-200 bg-red-50 flex items-center justify-center transition-all duration-200 hover:bg-red-200 hover:border-red-300 hover:scale-105 active:scale-95"
                  >
                    <i className="ri-delete-bin-7-line text-red-600 text-lg"></i>
                  </button>

                  {/* Copy */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(note?.value);
                      toast.success("Note Copied!");
                    }}
                    title="Copy"
                    className="h-9 w-9 rounded-lg border border-red-200 bg-red-50 flex items-center justify-center transition-all duration-200 hover:bg-red-200 hover:border-red-300 hover:scale-105 active:scale-95"
                  >
                    <i className="ri-file-copy-line text-red-600 text-lg"></i>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-gray-200"></div>

              {/* Content */}
              <p className="text-gray-600 leading-7 whitespace-pre-wrap">
                {note.value}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">No notes found.</div>
        )}
      </div>
    </div>
  );
};

export default Notes;

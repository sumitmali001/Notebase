import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { add, update } from "../redux/notebaseSlice";

const Home = () => {
  const allnotes = useSelector((state) => state.notes.notes);

  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [value, setvalue] = useState("");
  const [searchparams, setsearchparams] = useSearchParams();
  const noteid = searchparams.get("noteid");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!noteid) return;

    const note = allnotes.find((n) => n._id === noteid?.trim());

    if (note) {
      settitle(note.title);
      setvalue(note.value);
    }
  }, [noteid, allnotes]);

  function createnote() {
    const note = {
      title: title,
      value: value,
      _id: noteid || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    if (noteid) {
      dispatch(update(note));
    } else {
      dispatch(add(note));
    }

    //after creation
    settitle("");
    setvalue("");
    setsearchparams({});
  }
  return (
    <div>
      <div className="mt-3 ml-3  flex gap-5">
        <div className="w-full max-w-sm min-w-50">
          <input
            onChange={(e) => {
              settitle(e.target.value);
            }}
            value={title}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow h-10"
            placeholder="Enter Title..."
          />
        </div>
        <button
          onClick={createnote}
          className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded"
        >
          {noteid ? "Update Note" : "Create Note"}
        </button>
      </div>
      <div className="w-250 mt-5 ml-3">
        <div className="relative w-full min-w-50">
          <textarea
            onChange={(e) => setvalue(e.target.value)}
            value={value}
            placeholder=""
            className="
        peer
        w-full
        min-h-25
        resize-none
        rounded-[7px]
        border
        border-gray-300
        bg-transparent
        px-3
        py-2.5
        text-sm
        outline-none
        transition-all
        focus:border-2
        focus:border-gray-900
      "
            rows={25}
          ></textarea>

          <label
            className="
        absolute
        left-3
        -top-2
        bg-white
        px-1
        text-[11px]
        text-gray-500
        transition-all
        pointer-events-none

        peer-placeholder-shown:top-3
        peer-placeholder-shown:text-sm

        peer-focus:-top-2
        peer-focus:text-[11px]
        peer-focus:text-gray-900
      "
          >
            Enter Value
          </label>
        </div>
      </div>
    </div>
  );
};

export default Home;

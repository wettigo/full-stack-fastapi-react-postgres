import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Check, Trash2, Pin, PinOff } from "lucide-react";
import "./NotePage.css";

function ViewNotePage() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "", is_pinned: false });
  const [originalNote, setOriginalNote] = useState({ title: "", content: "", is_pinned: false });
  const [showConfirm, setShowConfirm] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axiosClient.get(`/notes/${noteId}`);
        console.log("Note:", response.data);
        setNote(response.data);
        setOriginalNote(response.data);

        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
          }
        }, 0);
      } catch (error) {
        console.error("Error loading note:", error);
      }
    };
    fetchNote();
  }, [noteId]);

  const handleSave = async () => {
    if (
      note.title.trim() !== originalNote.title.trim() ||
      note.content.trim() !== originalNote.content.trim()
    ) {
      try {
        await axiosClient.put(`/notes/${noteId}`, {
          title: note.title.trim(),
          content: note.content.trim(),
          is_pinned: note.is_pinned,
        });
        navigate("/dashboard");
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/notes/${noteId}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handlePinToggle = async () => {
    try {
      const updatedPinned = !note.is_pinned;
      await axiosClient.post(`/pin?item_id=${noteId}&item_type=note&pin=${updatedPinned}`);
      navigate("/dashboard");
      setNote((prev) => ({ ...prev, is_pinned: updatedPinned }));
    } catch (error) {
      console.error("Error when attaching:", error);
    }
  };

  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const canSave = note.content.trim();

  return (
    <div className="view-note-page">
      <div className="header-frame">
        <button
          className={`save-button-view ${canSave ? "active" : "disabled"}`}
          onClick={handleSave}
          disabled={!canSave}
          title="Save"
        >
          <Check />
        </button>
        <button
            className="pin-button-view"
            onClick={handlePinToggle}
            title={note.is_pinned ? "Unpin" : "Pin"}
          >
            {note.is_pinned ? <PinOff /> : <Pin />}
        </button>
        <button className="delete-button-view" onClick={() => setShowConfirm(true)} title="Delete">
          <Trash2 />
        </button>
      </div>

      <div className="note-body-wrapper">
        <div className="note-form">
          <input
            className="note-title"
            type="text"
            placeholder="Title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <textarea
            className="note-content"
            placeholder="Content"
            ref={textareaRef}
            value={note.content}
            onChange={(e) => {
              setNote({ ...note, content: e.target.value });
              autoResize(e);
            }}
            onInput={autoResize}
          />
        </div>
      </div>

      {showConfirm && (
        <div className="modal-backdrop">
          <div className="confirm-dialog">
            <p>Are you sure you want to delete the note?</p>
            <div className="confirm-buttons">
              <div className="button-container">
                <button onClick={handleDelete}>Yes</button>
              </div>
              <div className="button-container">
                <button onClick={() => setShowConfirm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewNotePage;

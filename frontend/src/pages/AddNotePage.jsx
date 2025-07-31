import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Check, X } from "lucide-react";
import "./NotePage.css";

function AddNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  const handleSubmit = async () => {
    if (!title.trim() && !content.trim()) return;

    try {
      await axiosClient.post("/notes", {
        title: title.trim(),
        content: content.trim(),
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Error adding note:", err);
      setError("Failed to create note");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const canSave = title.trim() || content.trim();

  return (
    <div className="add-note-page">
      <div className="note-header-wrapper">
        <div className="note-header">
          <button
            className={`save-button ${canSave ? "active" : "disabled"}`}
            onClick={handleSubmit}
            disabled={!canSave}
            title="Add"
          >
            <Check />
          </button>
          <button
            className={`cancel-button`}
            onClick={handleCancel}
            title="Сancel"
          >
            <X />
          </button>
        </div>
      </div>

      <div className="note-body-wrapper">
        <div className="note-form">
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            className="note-title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            ref={textareaRef}
            className="note-content"
            placeholder="Сontent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default AddNotePage;
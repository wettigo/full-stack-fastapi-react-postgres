import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Check, Trash2, Pin, PinOff } from "lucide-react";
import "./ChecklistPage.css";

function ViewChecklistPage() {
  const { checklistId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [items, setItems] = useState([""]);
  const [original, setOriginal] = useState({ title: "", items: [], is_pinned: false });
  const [isPinned, setIsPinned] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const textareaRefs = useRef([]);

  const adjustHeight = (el) => {
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await axiosClient.get(`/checklists/${checklistId}`);
        const fetchedTitle = response.data.title || "";
        const fetchedItems = response.data.items || [];
        const pinned = response.data.is_pinned || false;

        setTitle(fetchedTitle);
        setItems([...fetchedItems, ""]);
        setOriginal({ title: fetchedTitle, items: [...fetchedItems], is_pinned: pinned });
        setIsPinned(pinned);
      } catch (error) {
        console.error("Error loading checklist:", error);
      }
    };

    fetchChecklist();
  }, [checklistId]);

  useEffect(() => {
    textareaRefs.current.forEach(adjustHeight);
  }, [items]);

  const handleItemChange = (index, value) => {
    const updated = [...items];
    updated[index] = value;

    const compacted = updated.filter((item, i) => item.trim() !== "" || i === 0);
    if (compacted[compacted.length - 1].trim() !== "") {
      compacted.push("");
    }

    setItems(compacted);
  };

  const handleSave = async () => {
    const filteredItems = items.map(item => item.trim()).filter(item => item !== "");

    const hasChanges =
      title !== original.title ||
      JSON.stringify(filteredItems) !== JSON.stringify(original.items);

    if (!hasChanges) return;

    try {
      await axiosClient.put(`/checklists/${checklistId}`, {
        title: title.trim(),
        items: filteredItems,
        is_pinned: isPinned,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating checklist:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/checklists/${checklistId}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting checklist:", error);
    }
  };

  const handleTogglePin = async () => {
    try {
      const updatedPinned = !isPinned;

      await axiosClient.post(
        `/pin?item_id=${checklistId}&item_type=checklist&pin=${updatedPinned}`
      );
      navigate("/dashboard");
      setIsPinned(updatedPinned);
    } catch (error) {
      console.error("Error when changing assignment:", error);
    }
  };

  const isSaveEnabled = items.some((item) => item.trim() !== "");

  return (
    <div className="view-checklist-page">
      <div className="header-frame">
        <button
          className={`save-button-view ${isSaveEnabled ? "active" : "disabled"}`}
          onClick={handleSave}
          disabled={!isSaveEnabled}
          title="Save"
        >
          <Check />
        </button>
        <button
          className="pin-button-view"
          onClick={handleTogglePin}
          title={isPinned ? "Unpin" : "Pin"}
        >
          {isPinned ? <PinOff style={{ textDecoration: "line-through" }} /> : <Pin />}
        </button>
        <button
          className="delete-button-view"
          onClick={() => setShowConfirm(true)}
          title="Delete"
        >
          <Trash2 />
        </button>
      </div>

      <div className="checklist-body-wrapper">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
        {items.map((item, index) => (
          <textarea
            key={index}
            ref={(el) => (textareaRefs.current[index] = el)}
            rows={1}
            placeholder={`Item ${index + 1}`}
            value={item}
            onChange={(e) => {
              handleItemChange(index, e.target.value);
              adjustHeight(e.target);
            }}
            className="item-textarea"
          />
        ))}
      </div>

      {showConfirm && (
        <div className="modal-backdrop">
          <div className="confirm-dialog">
            <p>Are you sure you want to delete the checklist?</p>
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

export default ViewChecklistPage;
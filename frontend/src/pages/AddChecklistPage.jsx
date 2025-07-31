import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Check, X } from "lucide-react";
import "./ChecklistPage.css";

function AddChecklistPage() {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([""]);
  const navigate = useNavigate();

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
    const filteredItems = items
      .map((item) => item.trim())
      .filter((item) => item !== "");

    if (filteredItems.length === 0) return;

    try {
      await axiosClient.post("/checklists", {
        title: title.trim(),
        items: filteredItems,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding checklist:", error);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const isSaveEnabled = items.some((item) => item.trim() !== "");

  return (
    <div className="add-page">
      <div className="checklist-header-wrapper">
        <div className="checklist-header">
          <button
            className={`save-button ${isSaveEnabled ? "active" : "disabled"}`}
            onClick={handleSave}
            disabled={!isSaveEnabled}
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

      <div className="checklist-body-wrapper">
        <div className="checklist-form">
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
              rows={1}
              placeholder={`Item ${index + 1}`}
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              className="item-textarea"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddChecklistPage;

import { Pin } from "lucide-react";
import "./Card.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const ChecklistCard = ({ checklist, onClick, sortBy }) => {
  const shouldUseUpdatedAt = () => {
    if (sortBy === "updated_newest" || sortBy === "updated_oldest") return true;
    if (sortBy === "title") return !!checklist.updated_at;
    if (
      checklist.is_pinned &&
      (sortBy === "updated_newest" || sortBy === "updated_oldest" || sortBy === "title")
    ) {
      return !!checklist.updated_at;
    }
    return false;
  };

  const dateToDisplay = shouldUseUpdatedAt() ? checklist.updated_at : checklist.created_at;

  const contentPreview = checklist.items
    ?.slice(0, 10)
    .map((item) => `• ${item}`)
    .join("\n");

  return (
    <div className="card" onClick={() => onClick(checklist.id)}>
      <div className="card-title">{checklist.title}</div>

      <div className="card-content">
        {contentPreview}
      </div>

      {checklist.is_pinned && <Pin className="pinned-tag" />}

      <div className="card-footer">
        <div className="card-date">{formatDate(dateToDisplay)}</div>
      </div>
    </div>
  );
};

export default ChecklistCard;
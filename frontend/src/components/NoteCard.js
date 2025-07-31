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

const NoteCard = ({ note, onClick, sortBy }) => {
  const shouldUseUpdatedAt = () => {
    if (sortBy === "updated_newest" || sortBy === "updated_oldest") return true;
    if (sortBy === "title") return !!note.updated_at;
    if (
      note.is_pinned &&
      (sortBy === "updated_newest" || sortBy === "updated_oldest" || sortBy === "title")
    ) {
      return !!note.updated_at;
    }
    return false;
  };

  const dateToDisplay = shouldUseUpdatedAt() ? note.updated_at : note.created_at;

  return (
    <div className="card" onClick={() => onClick(note.id)}>
      <div className="card-title">{note.title}</div>

      <div className="card-content">
        {note.content}
      </div>

      {note.is_pinned && <Pin className="pinned-tag" />}

      <div className="card-footer">
        <div className="card-date">{formatDate(dateToDisplay)}</div>
      </div>
    </div>
  );
};

export default NoteCard;

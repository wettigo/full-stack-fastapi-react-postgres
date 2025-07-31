import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import NoteCard from "../components/NoteCard";
import ChecklistCard from "../components/ChecklistCard";
import "./DashboardPage.css";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import { FileText, List, Check, X } from "lucide-react";

const sortOptions = [
  { value: "created_newest", label: "Created (newest first)" },
  { value: "created_oldest", label: "Created (oldest first)" },
  { value: "updated_newest", label: "Changed (newest first)" },
  { value: "updated_oldest", label: "Modified (old first)" },
  { value: "title", label: "By title" },
];

const columnOptions = [
  { value: 1, label: "one" },
  { value: 2, label: "two" },
  { value: 3, label: "three" },
  { value: 4, label: "four" },
  { value: 5, label: "five" },
  { value: 6, label: "six" },
];

const saveColumnChoice = (columnCount) => {
  localStorage.setItem("columnCount", columnCount);
};

const getColumnChoice = () => {
  const stored = localStorage.getItem("columnCount");
  return stored ? parseInt(stored, 10) : 1;
};

const saveFilterChoice = (filter) => {
  localStorage.setItem("filter", filter);
};

const getFilterChoice = () => {
  return localStorage.getItem("filter") || "created_newest";
};

const DashboardPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(getFilterChoice());
  const [selectedSort, setSelectedSort] = useState(getFilterChoice());
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [columns, setColumns] = useState(getColumnChoice());
  const [selectedColumns, setSelectedColumns] = useState(getColumnChoice());
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosClient.get(`/all?sort_by=${sortBy}`);
        setItems(response.data);
      } catch (error) {
        console.error("Loading error:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("access_token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [navigate, sortBy]);

  const pinnedItems = items.filter((item) => item.is_pinned);
  const regularItems = items.filter((item) => !item.is_pinned);

  const handleOpen = (id, type) => {
    navigate(type === "note" ? `/notes/${id}` : `/checklists/${id}`);
  };

  const handleSaveSort = () => {
    setSortBy(selectedSort);
    saveFilterChoice(selectedSort);
    setShowFilterModal(false);
  };

  const handleCancelSort = () => {
    setSelectedSort(sortBy);
    setShowFilterModal(false);
  };

  const handleSaveColumns = () => {
    setColumns(selectedColumns);
    saveColumnChoice(selectedColumns);
    setShowColumnModal(false);
  };

  const handleCancelColumns = () => {
    setSelectedColumns(columns);
    setShowColumnModal(false);
  };

  const handleAddNote = () => {
    setShowAddModal(false);
    navigate("/notes/new");
  };

  const handleAddChecklist = () => {
    setShowAddModal(false);
    navigate("/checklists/new");
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <HeaderBar
        onFilterClick={() => setShowFilterModal(true)}
        onColumnClick={() => setShowColumnModal(true)}
        onAddClick={() => setShowAddModal(true)}
      />

      <div
        className="dashboard-container"
        style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: "12px" }}
      >
        {[...pinnedItems, ...regularItems].map((item) =>
          item.type === "note" ? (
            <NoteCard
              key={`note-${item.id}`}
              note={item}
              onClick={(id) => handleOpen(id, item.type)}
              sortBy={sortBy}
            />
          ) : (
            <ChecklistCard
              key={`checklist-${item.id}`}
              checklist={item}
              onClick={(id) => handleOpen(id, item.type)}
              sortBy={sortBy}
            />
          )
        )}
      </div>

      {showFilterModal && (
        <div className="modal-backdrop">
          <div className="filter-modal">
            <div className="filter-modal-header">
              <button className="icon-button" onClick={handleSaveSort} title="Save">
                <Check />
              </button>
              <span className="modal-header-title modal-header-title-filter">Filter</span>
              <button className="icon-button" onClick={handleCancelSort} title="Cancel">
                <X />
              </button>
            </div>
            <div className="filter-options">
              {sortOptions.map((opt) => (
                <label key={opt.value} className="filter-option">
                  <input
                    type="radio"
                    name="sort"
                    value={opt.value}
                    checked={selectedSort === opt.value}
                    onChange={() => setSelectedSort(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {showColumnModal && (
        <div className="modal-backdrop">
          <div className="filter-modal">
            <div className="filter-modal-header">
              <button className="icon-button" onClick={handleSaveColumns} title="Save">
                <Check />
              </button>
              <span className="modal-header-title">Columns</span>
              <button className="icon-button" onClick={handleCancelColumns} title="Сancel">
                <X />
              </button>
            </div>
            <div className="filter-options two-columns">
              {columnOptions.map((opt) => (
                <label key={opt.value} className="filter-option">
                  <input
                    type="radio"
                    name="columns"
                    value={opt.value}
                    checked={parseInt(selectedColumns) === opt.value}
                    onChange={() => setSelectedColumns(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="modal-backdrop">
          <div className="filter-modal">
            <div className="filter-modal-header">
              <span className="modal-header-title-add">Add</span>
              <button className="icon-button" onClick={() => setShowAddModal(false)} title="Close">
                <X />
              </button>
            </div>
            <div className="add-options">
              <div className="add-option-column">
                <button className="add-option-button" onClick={handleAddNote}>
                  <FileText /> Note
                </button>
              </div>
              <div className="add-option-column">
                <button className="add-option-button" onClick={handleAddChecklist}>
                  <List /> Checklist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

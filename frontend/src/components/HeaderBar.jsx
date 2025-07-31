import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Filter, LayoutGrid, Plus, X } from "lucide-react";
import "./HeaderBar.css";

function HeaderBar({ onFilterClick, onColumnClick, onAddClick }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="header-bar">
        <div className="left" onClick={() => setShowProfileModal(true)}>
          <div className="avatar">
            {user?.username ? user.username[0].toUpperCase() : "-"}
          </div>
        </div>

        <div className="center">
          <h2>Notes</h2>
        </div>

        <div className="right-icons">
          <button className="icon-button" onClick={onColumnClick} title="Сolumns">
            <LayoutGrid />
          </button>

          <button className="icon-button" onClick={onFilterClick} title="Filter">
            <Filter />
          </button>

          <button className="icon-button" onClick={onAddClick} title="Add">
            <Plus />
          </button>
        </div>
      </div>

      {showProfileModal && (
        <div className="modal-backdrop">
          <div className="filter-modal">
            <div className="filter-modal-header">
              <span className="modal-header-title-two">Profile</span>
              <button
                className="icon-button"
                onClick={() => setShowProfileModal(false)}
                title="Close"
              >
                <X />
              </button>
            </div>
            <div className="profile-modal-content">
              <div className="avatar-large">
                {user?.username ? user.username[0].toUpperCase() : "-"}
              </div>
              <p className="welcome-text">Welcome, {user?.username || "Guest"}!</p>
              <button className="logout-button" onClick={handleLogout}>
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderBar;

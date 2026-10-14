
function DeleteConfirm({ onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <div className="confirm-icon">!</div>

        <h3>Delete this task?</h3>

        <p>This task will be removed from your list.</p>

        <div className="confirm-actions">
          <button
            className="confirm-delete-btn"
            onClick={onConfirm}
          >
            Delete task
          </button>

          <button
            className="confirm-cancel-btn"
            onClick={onCancel}
          >
            Keep task
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirm

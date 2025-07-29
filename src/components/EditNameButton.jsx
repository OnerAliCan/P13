export default function EditNameButton({ setIsEditing }) {
  return (
    <button className="edit-button" onClick={() => setIsEditing(true)}>
      Edit Name
    </button>
  )
}

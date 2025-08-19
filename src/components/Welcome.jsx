export default function Welcome({ isEditing, firstName, lastName }) {
  return (
    <h1>
      Welcome back <br />
      {!isEditing && (
        <>
          {firstName} {lastName}!
        </>
      )}
    </h1>
  )
}

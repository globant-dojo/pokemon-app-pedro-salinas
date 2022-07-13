import "./toast.css";
export const Toast = ({ message, isOpen }) => {
  return (
    <div id="snackbar" className={isOpen ? "show" : ""}>
      {message}
    </div>
  );
};

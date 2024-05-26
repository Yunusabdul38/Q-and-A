import { useEffect } from "react";

// efect for closing modal if click event happens outside the modal component
export default function useModal(close,ref) {
  useEffect(() => {
    function closeModal(e) {
      if (e === ref.current) {
        close();
      }
    }
    document.addEventListener("click", (e) => {
      closeModal(e.target);
    });
    return () =>
      document.addEventListener("click", (e) => {
        closeModal(e.target);
      });
  }, [close,ref]);

  return null
}

import { useEffect, useState } from "react";

function useModal() {
  const [showModal, setShowModal] = useState<boolean>(false);

  //modal action.
  function handleCloseModal() {
    setShowModal(false);
  }

  useEffect(
    function () {
      if (!showModal) return;
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          // console.log("-->Esc");
          handleCloseModal();
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    },
    [showModal],
  );
  return {
    handleCloseModal,
    showModal,
    setShowModal,
  };
}

export default useModal;

import { useState } from "react";

interface ModalState {
    mode: "add" | "update" | "delete";
    metric: { mainValue: string; goalValue: string } | null;
}

const useModal = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalState, setModalState] = useState<ModalState>({
        mode: "add",
        metric: null,
    });

    const handleOpenModal = (mode: "add" | "update" | "delete", metric?: { mainValue: string; goalValue: string; date?: string }) => {
        setModalState({ mode, metric: metric ?? null });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalState({ mode: "add", metric: null });
    };

    return {
        isModalOpen,
        modalState,
        handleOpenModal,
        handleCloseModal,
    };
};

export default useModal;
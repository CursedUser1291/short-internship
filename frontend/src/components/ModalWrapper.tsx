import { Box, Modal, Typography, Input, Button } from "@mui/joy";
import { useState, useEffect } from "react";

interface ModalWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    mode: "add" | "update";
    currentMetric?: { mainValue: string; goalValue: string, date?: string } | null;
    onSubmit: (mainValue: string, goalValue: string, userId: string) => void;
    unit: string;
}

const ModalWrapper = ({
    isOpen,
    onClose,
    title,
    mode,
    currentMetric,
    onSubmit,
    unit,
}: ModalWrapperProps) => {
    const [mainValue, setMainValue] = useState<string>("");
    const [goalValue, setGoalValue] = useState<string>("");
    const [error, setError] = useState<string>("");
    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).id : "";

    useEffect(() => {
        if (mode === "update" && currentMetric) {
            setMainValue(currentMetric.mainValue);
            setGoalValue(currentMetric.goalValue);
        } else {
            setMainValue("");
            setGoalValue("");
        }
    }, [mode, currentMetric]);

    const handleSubmit = () => {
        if (!String(mainValue).trim() || !goalValue.trim()) {
            setError("Both fields are required.");
            return;
        }
        setError("");
        onSubmit(mainValue, goalValue, userId);
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            if (mode === "update" && currentMetric) {
                setMainValue(currentMetric.mainValue);
                setGoalValue(currentMetric.goalValue);
            } else {
                setMainValue("");
                setGoalValue("");
            }
        }
    }, [isOpen, mode, currentMetric]);

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    width: 400,
                    margin: "auto",
                    mt: "20vh",
                    backgroundColor: "white",
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography level="h4" sx={{mb: 2}}>
                    {mode === "add" ? `Add New Entry for ${title}` : `Update Entry for ${title}`}
                </Typography>

                <Typography level="body-sm" sx={{mb: 1}}>
                    Your Entry
                </Typography>
                <Input
                    placeholder={`Enter ${title} (${unit})`}
                    type="number"
                    fullWidth
                    sx={{mb: 2}}
                    value={mainValue}
                    onChange={(e) => setMainValue(e.target.value)}
                />

                <Typography level="body-sm" sx={{mb: 1}}>
                    Your Daily Goal
                </Typography>
                <Input
                    placeholder={`Enter Daily Goal (${unit})`}
                    type="number"
                    fullWidth
                    sx={{mb: 2}}
                    value={goalValue}
                    onChange={(e) => setGoalValue(e.target.value)}
                />

                {error && (
                    <Typography sx={{ color: "red", fontSize: "14px", mb: 2 }}>
                        {error}
                    </Typography>
                )}

                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button
                        onClick={handleSubmit}
                        variant="solid"
                        color="primary"
                        sx={{
                            "&:hover": {
                                backgroundColor: "primary.dark",
                            },
                        }}
                    >
                        Submit
                    </Button>
                    <Button onClick={onClose} variant="soft" color="neutral">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalWrapper;
import { Card, CardContent, Box, Typography, IconButton } from "@mui/joy";
import { Add } from "@mui/icons-material";
import ModalWrapper from "./ModalWrapper";
import axios from "axios";

interface NoEntryCardProps {
    title: string;
    isModalOpen: boolean;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
}

const NoEntryCard = ({ title, isModalOpen, handleOpenModal, handleCloseModal }: NoEntryCardProps) => {
    const handleSubmit = async (mainValue: string, goalValue: string) => {
        try {
            const payload = {
                mainValue: parseFloat(mainValue),
                goal: parseFloat(goalValue),
                title,
                date: new Date().toISOString().split("T")[0]
            };

            const response = await axios.post("/api/metrics", payload);

            if (response.status === 200) {
                console.log("Data saved successfully:", response.data);
                handleCloseModal();
            } else {
                console.error("Failed to save data");
            }
        } catch (error) {
            console.error("An error occurred while saving data:", error);
        }
    };

    return (
        <>
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography level="h3">
                            No new {title} entry found. Would you like to add an entry?
                        </Typography>
                        <IconButton onClick={handleOpenModal}>
                            <Add />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>

            <ModalWrapper
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={title}
                mode="add"
                onSubmit={handleSubmit}
                unit="unit" // Replace with the actual unit if available
            />
        </>
    );
};

export default NoEntryCard;
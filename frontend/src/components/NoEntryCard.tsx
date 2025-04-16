import { Card, CardContent, Box, Typography, IconButton } from "@mui/joy"
import { Add } from "@mui/icons-material"
import { getUnitForTitle } from "../util/UnitMapper"
import ModalWrapper from "./ModalWrapper"
import { handleSubmit } from "../util/SubmitHandler";
import { useHealthMetrics } from "../context/HealthMetricsContext"
import useModal from "../hooks/useModal.ts";


interface NoEntryCardProps {
    title: string
    date?: string
}

const NoEntryCard = ({ title, date }: NoEntryCardProps) => {
    const { setUser } = useHealthMetrics()
    const { isModalOpen, modalState, handleOpenModal, handleCloseModal } = useModal();

    const onSubmit = async (mainValue: string, goalValue: string, userId: string) => {
        const entryDate = date ?? new Date().toISOString().split("T")[0];
        await handleSubmit(mainValue, goalValue, userId, title, entryDate, handleCloseModal, setUser);
    };

    return (
        <>
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    {date && (
                        <Typography level="body-sm" sx={{ mb: 1 }}>
                            {new Date(date).toLocaleDateString("de-DE")}
                        </Typography>
                    )}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography level="h3">
                            No new {title} entry found. Would you like to add an entry?
                        </Typography>
                        <IconButton onClick={() => handleOpenModal("add", { mainValue: "", goalValue: "", date })}>
                            <Add />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>

            <ModalWrapper
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={title}
                mode={modalState.mode}
                currentMetric={modalState.metric}
                onSubmit={onSubmit}
                unit={getUnitForTitle(title)}
            />
        </>
    );
};

export default NoEntryCard;
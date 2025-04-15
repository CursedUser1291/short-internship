import { Card, CardContent, Box, Typography, IconButton } from "@mui/joy"
import { Add } from "@mui/icons-material"
import { getUnitForTitle } from "../util/UnitMapper"
import ModalWrapper from "./ModalWrapper"
import { handleSubmit } from "../util/SubmitHandler";
import { useHealthMetrics } from "../context/HealthMetricsContext"

interface NoEntryCardProps {
    title: string
    isModalOpen: boolean
    handleOpenModal: () => void
    handleCloseModal: () => void
    date: string
}

const NoHistoryEntryCard = ({ title, isModalOpen, handleOpenModal, handleCloseModal, date }: NoEntryCardProps) => {
    const { setUser } = useHealthMetrics()

    const onSubmit = async (mainValue: string, goalValue: string, userId: string, date: string) => {
        await handleSubmit(mainValue, goalValue, userId, title, date, handleCloseModal, setUser)
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
                            No old {title} entry found. Would you like to add an entry?
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
                mode="update"
                onSubmit={(mainValue, goalValue, userId) => onSubmit(mainValue, goalValue, userId, date)}
                unit={getUnitForTitle(title)}
            />
        </>
    );
};

export default NoHistoryEntryCard;
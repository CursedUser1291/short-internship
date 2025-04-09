import { Card, CardContent, Box, Typography, IconButton } from "@mui/joy";
import { Add } from "@mui/icons-material";

interface NoEntryCardProps {
    title: string;
}

const NoEntryCard = ({ title }: NoEntryCardProps) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography level="h3">
                        No new {title} entry found. Would you like to add an entry?
                    </Typography>
                    <IconButton>
                        <Add />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default NoEntryCard;

import {Card, CardContent, Input, Typography} from '@mui/joy';

interface AddEntryCardProps {
    title: string;
    mainValueText: string;
    goalText: string;
}

const AddEntryCardProps = ({
    title,
    mainValueText,
    goalText,
}: AddEntryCardProps) => {
    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Typography level="body-sm">{title}</Typography>
                <Input placeholder={mainValueText}/>
                <Input placeholder={goalText}/>
            </CardContent>
        </Card>
    );
};

export default AddEntryCardProps;

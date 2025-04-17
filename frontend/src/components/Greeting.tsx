import { Typography } from '@mui/joy';
import {useHealthMetrics} from "../context/HealthMetricsContext.tsx";

const getGreeting = (): string => {
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 12) {
        return 'Good Morning';
    } else if (hours >= 12 && hours < 17) {
        return 'Good Afternoon';
    } else {
        return 'Good Evening';
    }
};

const Greeting = () => {
    const { user } = useHealthMetrics();
    if (!user) return <div>Please Log in.</div>;

    return (
        <div style={{textAlign: 'center', margin: '20px'}}>
            <Typography level="h3" sx={{fontSize: '45px' ,marginLeft: '-200px', marginTop: 1}}>
                {getGreeting()}, {user.username}.
            </Typography>

            <Typography level="h3" sx={{fontSize:'30px' ,marginLeft: '200px', marginTop: 1}}>
                How may we assist you today?
            </Typography>
        </div>
    );
};

export default Greeting;

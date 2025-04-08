import { Typography } from '@mui/joy';

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

const MyComponent = () => {
    return (
        <div style={{textAlign: 'center', margin: '20px'}}>
            <Typography level="h3" sx={{fontSize: '45px' ,marginLeft: '-200px', marginTop: 1}}>
                {getGreeting()}
            </Typography>

            <Typography level="h3" sx={{fontSize:'30px' ,marginLeft: '200px', marginTop: 1}}>
                How may we assist you today?
            </Typography>
        </div>
    );
};

export default MyComponent;

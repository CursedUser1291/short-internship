import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';
import axios from 'axios';

interface HealthMetrics {
    id: string
    steps: string
    stepGoal: string
    water: string
    waterGoal: string
    sleep: string
    sleepGoal: string
    weight: string
    weightGoal: string
    date: string
    [key: string]:string
}

interface User {
    id: string
    username: string
    password: string
    healthMetrics: HealthMetrics[];
}

interface HealthMetricsContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    fetchUserData: (username: string, password: string) => Promise<void>;
    login: (username: string, password: string) => Promise<User | null>;
}

const HealthMetricsContext = createContext<HealthMetricsContextType | undefined>(undefined);

interface HealthMetricsProviderProps {
    children: ReactNode;
}

export const HealthMetricsProvider: React.FC<HealthMetricsProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const fetchUserData = async (): Promise<void> => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    };
    const login = async (username: string, password: string): Promise<User | null> => {
        try {
            const response = await axios.post('http://localhost:8040/api/login', {
                username,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const fetchedUser = response.data.user;
            setUser(fetchedUser);
            localStorage.setItem('user', JSON.stringify(fetchedUser));
            localStorage.setItem('loggedIn', 'true');
            return fetchedUser;
        } catch (error) {
            console.error('Login failed', error);
            return null;
        }
    };

    return (
        <HealthMetricsContext.Provider value={{ user, setUser, fetchUserData, login }}>
            {children}
        </HealthMetricsContext.Provider>
    );
};

export const useHealthMetrics = () => {
    const context = useContext(HealthMetricsContext);
    if (!context) {
        throw new Error('useHealthMetrics must be used within a HealthMetricsProvider');
    }
    return context;
};
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import {HealthMetricsProvider} from "./context/HealthMetricsContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <HealthMetricsProvider>
                <App />
            </HealthMetricsProvider>
        </BrowserRouter>
    </StrictMode>
);
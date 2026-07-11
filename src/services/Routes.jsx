import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/user/12" replace />
    },
    {
        path: '/user/:userId',
        element: <App />
    }
]);

export default router;

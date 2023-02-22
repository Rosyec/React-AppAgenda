import { createBrowserRouter, Navigate, createRoutesFromElements, Route, Routes } from 'react-router-dom'
import { AgendaPage } from '../agenda/pages/AgendaPage';
import { AgendaApp } from '../AgendaApp';
import { LoginPage } from '../auth/pages/LoginPage';
import { RegisterPage } from '../auth/pages/RegisterPage';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const RouterApp = () => createBrowserRouter([
    {
        path: '/*',
        element: <Navigate to={ '/auth/login' }/>
    },
    {
        path: '/auth/*',
        element: <PublicRoutes><AgendaApp/></PublicRoutes>,
        children: [
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'register',
                element: <RegisterPage/>
            },
            {
                path: '*',
                element: <Navigate to={ 'login' }/>
            }
        ]
    },
    {
        path: '/app/*',
        element: <PrivateRoutes><AgendaApp/></PrivateRoutes>,
        children: [
            {
                path: 'agenda',
                element: <AgendaPage/>
            },
            {
                path: '*',
                element: <Navigate to={ 'agenda' }/>
            }
        ]
    },
]);

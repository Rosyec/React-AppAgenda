import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { RouterApp } from './router/RouterApp'
import { ThemeProvider } from '@mui/material/';
import './styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppTheme from './themes/AppTheme';
import { store } from './store/store'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={AppTheme}>
        <RouterProvider router={RouterApp()} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)

import { Box, Toolbar } from '@mui/material'
import { useContext } from 'react';
import { NavBar } from '../components/NavBar';
import { SideBar } from '../components/SideBar';
import { AppContext } from '../context/AppContext';

export const AgendaLayout = ({ children }: Props) => {

    const { onClickOut, toggleDrawer, getMyOpen } = useContext(AppContext);

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <NavBar onHandleOpen={toggleDrawer} />
                <SideBar setOpen={onClickOut} onOpen={getMyOpen} />
                <Box component="main" sx={{ flexGrow: '1', p: 3 }}>
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </>
    )
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { LogoutOutlined, Menu } from '@mui/icons-material'
import { useAppDispatch } from "../../store/hooks"
import { logoutUser } from "../../store/thunks"

export const NavBar = ( { onHandleOpen }:Props ) => {

    const dispatch = useAppDispatch()

    const onLogout = () => {
        dispatch( logoutUser() );
    }

  return (
    <AppBar position="fixed">
        <Toolbar>
            <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={ onHandleOpen }>
                <Menu></Menu>
            </IconButton>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" noWrap component="div"> Mi Agenda </Typography>
                <IconButton color="inherit" onClick={ onLogout }>
                    <LogoutOutlined/>
                </IconButton>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}

interface Props {
    onHandleOpen: () => void
}

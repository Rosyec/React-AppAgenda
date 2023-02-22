import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useContext } from 'react';
import { Note, setActiveNote } from '../../store/agenda/agendaSlice'
import { useAppDispatch } from '../../store/hooks';
import { AppContext } from '../context/AppContext';

export const SideBarItem = React.memo(({ nota }: Props) => {

    const dispatch = useAppDispatch();
    const { toggleDrawer } = useContext(AppContext);

    const newTitle = React.useMemo(() => {
        return (nota.title.length > 17) ? nota.title.substring(0, 17).concat('...') : nota.title;
    }, [nota.title]);

    const newBody = React.useMemo(() => {
        return (nota.body.length > 17) ? nota.body.substring(0, 17).concat('...') : nota.body;
    }, [nota.body]);

    const onItemSelected = () => {
        toggleDrawer()
        dispatch(setActiveNote(nota));
    }

    return (
        <>
            <ListItem key={nota.id} disablePadding onClick={onItemSelected}>
                <ListItemButton>
                    <ListItemIcon>
                        <TurnedInNot />
                    </ListItemIcon>
                    <Grid container direction="column">
                        <ListItemText primary={newTitle} />
                        <ListItemText secondary={newBody} />
                    </Grid>
                </ListItemButton>
            </ListItem>
        </>
    )
});

interface Props {
    nota: Note
}
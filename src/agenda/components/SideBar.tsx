import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material"
import { useAppSelector } from "../../store/hooks"
import { RootState } from "../../store/store";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ onOpen, setOpen }: Props) => {

    const { status, displayName } = useAppSelector( (state: RootState) => state.auth );
    const { notes } = useAppSelector( (state: RootState) => state.agenda);

    return (
        <>
            <Box component="nav" sx={{ marginTop: '2em' }}>
                <Drawer variant="temporary" open={onOpen} anchor="left" onClose={setOpen}>
                    <List sx={{ width: '240px' }}>
                        <Typography variant="h6" sx={{ textAlign: 'center', paddingBottom: '0.5em' }}> { displayName } </Typography>
                        <Divider />
                        {
                            (notes.length === 0) 
                                && <ListItem><ListItemText sx={{textAlign: 'center'}} primary={'No hay notas'} /></ListItem>
                        }
                        { notes.map((item, index) => (
                            <SideBarItem key={index} nota={ item } />
                        ))}
                    </List>
                </Drawer>
            </Box>
        </>
    )
}

interface Props {
    onOpen: boolean,
    setOpen: () => void
}
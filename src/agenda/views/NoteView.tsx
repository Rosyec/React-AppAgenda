import { Box, Button, Card, CardContent, Grid, Modal, Paper, TextField, Typography } from "@mui/material"
import { ImageGalerry } from "../components/ImageGalerry"
import { useForm } from "../../hooks/useForm"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { RootState } from "../../store/store"
import React, { BaseSyntheticEvent, useEffect } from "react"
import { setActiveNote } from "../../store/agenda/agendaSlice"
import { deleteActiveNote, saveNote, startUploadingFiles } from "../../store/agenda/thunks"
import { CloudUploadRounded, UploadRounded } from "@mui/icons-material"
import { CircularLoader } from "../components/LinearLoader"

export const NoteView = () => {

    const { active: NoteActive, messagesaved, isSaving } = useAppSelector((state: RootState) => state.agenda);
    const { FormState, setFormState, onInputChange, title, body, date } = useForm(NoteActive!);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setFormState(NoteActive!);
    }, [NoteActive]);

    useEffect(() => {
        dispatch(setActiveNote(FormState));
    }, [FormState]);

    useEffect(() => {
        if (messagesaved.length > 0)
            handleOpen();
    }, [messagesaved]);

    const dateString = React.useMemo(() => {
        return new Date(date).toUTCString();
    }, [date]);

    const onSaveNote = () => {
        dispatch(saveNote());
    }

    const onDeleteNote = () => {
        dispatch(deleteActiveNote());
    }

    const onUploadImg = (evt: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLInputElement>) => {
        const { files } = evt.target as HTMLInputElement;
        if (files?.length === 0 || files === null) return;
        dispatch(startUploadingFiles(files));
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Grid className="animate__animated animate__fadeIn" container direction="row" justifyContent="center" alignItems="center" sx={{ minHeight: '86vh' }}>
                <Card>
                    <Typography fontSize={19} sx={{ mt: '16px', ml: '16px' }} color={'primary.main'}>Nueva entrada</Typography>
                    <Typography variant="caption" sx={{ mt: '16px', ml: '16px', display: 'flex' }} color={'rgba(0, 0, 0, 0.6)'}>Ingresa un título y un breve resumen de eso que quieres recordar más adelante.</Typography>
                    <CardContent sx={{ width: { xs: { minWidth: '150px' }, sm: '500px', md: '800px', lg: '1000px' }, minHeight: '70vh' }}>
                        <Grid container>
                            <TextField onChange={onInputChange} value={title} type="text" placeholder="¿Cómo lo quiero recordar?" fullWidth autoFocus={true} name="title" />
                            <TextField onChange={onInputChange} value={body} type="text" sx={{ mt: '16px' }} placeholder="¿Que sucedió hoy?" fullWidth multiline minRows={3} name="body" />
                        </Grid>
                        <Grid container>
                            <Grid item sx={{ width: '100%', marginTop: '16px' }}>
                                <div className="content-file">
                                    <Paper elevation={0}>
                                        <div className="file-upload">
                                            <label htmlFor="img"></label>
                                            <CloudUploadRounded htmlColor="rgba(116, 117, 117, 0.637)" />
                                            <Typography color="rgba(116, 117, 117, 0.637)">Subir imágenes</Typography>
                                            <input onChange={(evt) => onUploadImg(evt)} onDrop={(evt) => onUploadImg(evt)} type="file" accept="image/png, image/gif, image/jpeg" multiple name="img" id="img" />
                                        </div>
                                    </Paper>
                                </div>
                            </Grid>
                        </Grid>
                        <CircularLoader hidden={isSaving} />
                        <ImageGalerry imgs={NoteActive.imageUrls} />
                        <Grid spacing="5px" container direction="row" justifyContent="space-around" alignItems="center" sx={{ mt: '16px' }}>
                            <Grid spacing="5px" container direction="row" justifyContent="center" alignItems="center" >
                                <Grid item>
                                    <Button disabled={isSaving} onClick={onDeleteNote} variant='text' fullWidth>
                                        Eliminar
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button disabled={isSaving} onClick={onSaveNote} variant='outlined' fullWidth>
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography sx={{textAlign: 'center'}} fontSize={15} color="primary" fontWeight="light"> {dateString} </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Modal
                sx={{display: 'flex'}}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Mi Agenda
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {messagesaved}
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

import { Grid, Typography } from "@mui/material"
import { StarOutline } from '@mui/icons-material'

export const NothingSelectedView = () => {
    return (
        <>
            <Grid
                className="nothing-view animate__animated animate__fadeIn"
                container
                spacing={0}
                direction="column"
                alignItems={'center'}
                justifyContent={'center'}
                sx={{ minHeight: '90vh' }}>
                <Grid item xs={12}>
                    <StarOutline sx={{ fontSize: 100, color: 'rgba(0, 0, 0, 0.54)' }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" color='rgba(0, 0, 0, 0.54)' sx={{textAlign: 'center'}}>Seleccione una entrada o cree una nueva</Typography>
                </Grid>
            </Grid>
        </>
    )
}

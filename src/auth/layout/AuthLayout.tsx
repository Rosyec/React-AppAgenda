import { Card, CardContent, Grid, Typography } from '@mui/material'

export const AuthLayout = ( { children, title }:Props ) => {
    return (
        <>
            <Grid
                className='grid-card'
                container
                spacing={0}
                direction="column"
                alignItems={'center'}
                justifyContent={'center'}
                sx={{ minHeight: '100vh' }}>
                <Grid item>
                    <Card>
                        <CardContent sx={{ width: { xs: '200px', sm: '250px', md: '300px', lg: '350px' } }}>
                            <Typography variant={'h5'} sx={{ marginBottom: '16px' }} color={'primary.main'}> { title } </Typography>
                            { children }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

interface Props {
    children: JSX.Element | JSX.Element[],
    title: string
}

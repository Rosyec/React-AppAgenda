import { AddOutlined } from '@mui/icons-material'
import { AgendaLayout } from '../layout/AgendaLayout'
import { IconButton } from '@mui/material'
import { NoteView } from '../views/NoteView'
import { NothingSelectedView } from '../views/NothingSelectedView'
import { RootState } from '../../store/store'
import { startNewNote } from '../../store/agenda/thunks'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

export const AgendaPage = () => {

  const dispatch = useAppDispatch();
  const { isSaving, active } = useAppSelector((state: RootState) => state.agenda);

  const onNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <>
      <AgendaLayout>
        {
          (active.id)
            ?
            <NoteView />
            :
            <NothingSelectedView />
        }
        <IconButton
          onClick={onNewNote}
          disabled={isSaving}
          size='large'
          sx={{
            color: 'white',
            backgroundColor: 'error.main', ":hover": { backgroundColor: 'error.main' },
            position: 'fixed',
            boxShadow: '5px 5px 20px -3px rgba(0,0,0,0.5)',
            right: 20,
            bottom: 20
          }}>
          <AddOutlined sx={{ fontSize: 30 }} />
        </IconButton>

      </AgendaLayout>
    </>
  )
}

import React, { useState } from 'react'
import { AppContext } from './AppContext'

export const AppProvider = ( { children }:Props ) => {

    const [open, setOpen] = useState<boolean>(false);

    const toggleDrawer = () => {
        setOpen(!open);
    }

    const onClickOut = () => {
        setOpen(false);
    }

  return (
    <>
        <AppContext.Provider value={ { toggleDrawer, onClickOut, getMyOpen: open, setMyOpen: setOpen } }>
            { children }
        </AppContext.Provider>
    </>
  )
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

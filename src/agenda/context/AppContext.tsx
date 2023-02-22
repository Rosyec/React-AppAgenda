import { createContext, Dispatch, SetStateAction } from 'react'

export const AppContext = createContext<Props>({
    toggleDrawer: () => {},
    onClickOut: () => {},
    getMyOpen: false,
    setMyOpen: () => {}
});

interface Props {
    toggleDrawer: () => void,
    onClickOut: () => void,
    getMyOpen: boolean,
    setMyOpen: Dispatch<SetStateAction<boolean>>
}


import { Outlet } from "react-router-dom"
import { AppProvider } from "./agenda/context/AppProvider";
import { useAppSelector } from "./store/hooks"
import { RootState } from "./store/store";
import { CheckingAuth } from "./ui/components/CheckingAuth";

export const AgendaApp = () => {
  
  const { status } = useAppSelector( (state: RootState) => state.auth );

  if ( status === 'checking' ) {
    return ( <CheckingAuth/> );
  }

  return (
    <>
    <AppProvider>
      <Outlet></Outlet>
    </AppProvider>
    </>
  )
}

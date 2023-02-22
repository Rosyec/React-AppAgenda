import React from 'react'
import { Navigate } from 'react-router-dom';
import { useCheckAuth } from './hooks/useCheckAuth';

export const PrivateRoutes = ( { children }:Props ) => {

  const { status } = useCheckAuth();

  return (
        ( status === 'authenticated' ) 
        ? 
        children
        :
        <Navigate to={'/auth/login'}/>
  )
}

interface Props {
    children: React.ReactElement
}

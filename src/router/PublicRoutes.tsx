import React from 'react'
import { Navigate } from 'react-router-dom';
import { useCheckAuth } from './hooks/useCheckAuth';

export const PublicRoutes = ( { children }:Props ) => {

  const { status } = useCheckAuth();

  return (
        ( status !== 'authenticated' ) 
        ? 
        children
        :
        <Navigate to={'/app/agenda'}/>
  )
}

interface Props {
    children: React.ReactElement
}

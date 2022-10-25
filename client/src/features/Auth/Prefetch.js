import { store } from '../../app/store'
import { usersApiSlice } from '../Users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'


const Prefetch = () => {
  /*useEffect(() => {
    console.log('Subscirping')
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    return () => {
        console.log('unsubing')
        users.unsubscribe()
    }
  }, []) */
    return <Outlet />
}

export default Prefetch


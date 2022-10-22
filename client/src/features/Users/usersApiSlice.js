import {
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'


const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (respons, result) => {
                return respons.status === 200 ?? !result.isError
            },
            keepUnusedDataFor: 5, //time 5seconds
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user[0].id
                    return user
                })
            console.log(responseData)
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'user', id}))
                    ]
                } else return [{ type: 'User', id: 'LIST'}]
            }
        }),
    }),
})

export const {
    useGetUsersQuery,
} = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUsersIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)
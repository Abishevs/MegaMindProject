import {
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const contactsAdapter = createEntityAdapter({})

const initialState = contactsAdapter.getInitialState()

export const contactsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getContacts: builder.query({
            query: () => '/contacts',
            validateStatus: (respons, result) => {
                return respons.status === 200 ?? !result.isError
            },
            keepUnusedDataFor: 5, //time 5seconds
            transformResponse: responseData => {
                const loadedContacts = responseData.map(contact => {
                    contact.id = contact.id
                    return contact
                })
                return contactsAdapter.setAll(initialState, loadedContacts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Contact', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'contact', id}))
                    ]
                } else return [{ type: 'Contact', id: 'LIST'}]
            }
        }),
    }),
})

export const {
    useGetContactsQuery,
} = contactsApiSlice

export const selectContactsResult = contactsApiSlice.endpoints.getContacts.select()

const selectContactsData = createSelector(
    selectContactsResult,
    contactsResult => contactsResult.data
)

export const {
    selectAll: selectAllContacts,
    selectById: selectContactsById,
    selectIds: selectContactsIds
} = contactsAdapter.getSelectors(state => selectContactsData(state) ?? initialState)
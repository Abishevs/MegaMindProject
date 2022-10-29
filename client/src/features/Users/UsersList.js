import { useGetUsersQuery } from './usersApiSlice'
import User from './user'
import './Users.css'


const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = users

    const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)


    content = (
      <div className="users-page">
        <p>All users</p>
        <table className="table table--users">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th user__username">id</th>
              <th scope="col" className="table__th user__username">Username</th>
              <th scope="col" className="table__th user__roles">Email</th>
              <th scope="col" className="table__th user__roles">Roles</th>
              <th scope="col" className="table__th user__edit">Edit</th>
            </tr>
          </thead>
          <tbody>
            {tableContent}
          </tbody>
        </table>
      </div>
    )
    return content
  }
}

export default UsersList
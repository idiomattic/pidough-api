import $ from 'jquery'
// export const fetchUsers = () => (
//   $.ajax({
//     method: 'GET',
//     url: '/api/users'
//   })
// )

export const fetchUser = userId => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${userId}`
  })
)

export const updateUser = (user, userId) => {
  console.log('api util user.id', user.id)
  return ($.ajax({
    method: 'PATCH',
    url: `/api/users/${userId}`,
    data: user
  })
)}

export const deleteUser = userId => (
  $.ajax({
    method: 'DELETE',
    url: `/api/users/${userId}`
  })
)
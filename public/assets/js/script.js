// LOGIN HANDLER
async function login (username, password, alertMsg) {

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      alert(alertMsg)
      window.location.href = '/dashboard'
    } else {
      // console.log(response)
      alert('Something went wrong. Please try again.')
    }

  } else {
    alert('Please fill out both username and password fields.')
  }
}

$('#login-button').on('click', (e) => {
  const username = $('#login-username').val()
  const password = $('#login-password').val()
  e.preventDefault()
  login(username, password, 'You are logged in') 
})


// SIGNUP HANDLER
async function signup (username, password) {

  if (username && password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      login(username, password, 'Your account has been created')
    } else {
      alert('Something went wrong. Please try again.')
    }

  } else {
    alert('Please fill out both username and password fields.')
  }
}

$('#signup-button').on('click', (e) => {
  const username = $('#signup-username').val()
  const password = $('#signup-password').val()
  e.preventDefault()
  signup(username, password) 
})


// LOGOUT HANDLER
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('You have been logged out')
    window.location.href = '/dashboard'
  } else {
    alert('Failed to log out.');
  }
};

$('#logout-link').on('click', (e) => {
  e.preventDefault()
  logout()
})


// TASK HANDLER
const postBlog = async () => {
  const userId = $('#hidden-user-id').val()
  const postTitle = $('#title-input').val()
  const postContent = $('#body-input').val()
  // console.log(userId, postTitle, postContent)
  // console.log(JSON.stringify({ user_id: userId, title: postTitle, content: postContent }))

  if (postTitle && postContent) {
    const response = await fetch(`/api/posts/`, {
      method: 'POST',
      body: JSON.stringify({ title: postTitle, content: postContent, user_id: userId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Task created')
      window.location.href = '/dashboard'
    } else {
      // console.log(response)
      alert('Failed to create post')
    }
  
  } else {
    alert('Please fill out both fields')
    return;
  }
} 

$('#post-blog-button').on('click', (e) => {
  e.preventDefault()
  postBlog()
})


// UPDATE TASK HANDLER
const updateBlog = async () => {
  const postId = $('#hidden-post-id').val()
  const userId = $('#hidden-user-id').val()
  const postTitle = $('#title-input').val()
  const postContent = $('#body-input').val()
  // console.log(postId, postTitle, postContent)

  if (postTitle && postContent) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title: postTitle, content: postContent }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Task updated')
      window.location.href = '/dashboard'
    } else {
      // console.log(response)
      alert('Failed to update task')
    }
  
  } else {
    alert('Please fill out both fields')
    return;
  }
} 

$('#update-blog-button').on('click', (e) => {
  e.preventDefault()
  updateBlog()
})


// DELETE TASK HANDLER
const deleteBlog = async (postId) => {
  const confirmResponse = confirm('Are you sure you would like to remove this task?')
  // console.log(confirmResponse)

  if (confirmResponse) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      alert('Task deleted')
      window.location.href = '/dashboard'
    } else {
      // console.log(response)
      alert('Something went wrong. Please try again.')
    }
    
  } else {
    return
  }
}

$('#delete-blog-button').on('click', (e) => {
  e.preventDefault()
  deleteBlog( $('#delete-blog-button').val() )
})




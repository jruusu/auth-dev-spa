const fetchConfig = async () => {
  const response = await fetch(`${window.location.origin}/config`)
  return await response.json()
}

window.addEventListener('load', async () => {
  const config = await fetchConfig()

  const webAuth = new auth0.WebAuth({
    audience: config.auth0.backendID,
    domain: config.auth0.domain,
    clientID: config.auth0.clientID,
    responseType: 'token id_token',
    scope: 'openid',
    redirectUri: window.location.href,
  })

  const loginBtn = document.getElementById('btn-login')
  const logoutBtn = document.getElementById('btn-logout')
  const loginStatus = document.getElementById('login-status')

  const isAuthenticated = () => {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  const displayStuffBasedOnProfile = () => {
    const userIdElement = document.getElementById('user-id')
    const accessToken = localStorage.getItem('access_token')

    if (accessToken) {
      webAuth.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          console.log('profile', profile)
          userIdElement.innerHTML = `Your user id is: <code>${profile.sub}</code>`
          userIdElement.style.display = 'block'
        }
      })
    } else {
      userIdElement.innerHTML = ''
      userIdElement.style.display = 'none'
    }
  }

  const displayStuffBasedOnLoginState = () => {
    if (isAuthenticated()) {
      console.log('is authenticated', webAuth.client)
      loginBtn.style.display = 'none'
      logoutBtn.style.display = 'inline-block'
      loginStatus.innerHTML = 'You are logged in!'
    } else {
      loginBtn.style.display = 'inline-block'
      logoutBtn.style.display = 'none'
      loginStatus.innerHTML =
        'You are not logged in! Please log in to continue.'
    }
    displayStuffBasedOnProfile()
  }

  const setSession = authResult => {
    console.log('set session', authResult)

    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
  }

  const handleAuthentication = () => {
    webAuth.parseHash({ hash: window.location.hash }, (err, authResult) => {
      console.log('parse hash', err, authResult)

      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = ''
        setSession(authResult)
      } else if (err) {
        console.log(err)
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        )
      }
      displayStuffBasedOnLoginState()
    })
  }

  const logout = () => {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    displayStuffBasedOnLoginState()
  }

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault()
    webAuth.authorize()
  })

  logoutBtn.addEventListener('click', logout)

  document.getElementById('btn-backend')
    .addEventListener('click', async () => {
      const accessToken = localStorage.getItem('access_token')

      const response = await fetch(
        `${window.location.origin}/backend`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      const payload = await response.json()
      document.getElementById('backend-result').innerHTML = JSON.stringify(payload)
    })

  handleAuthentication()
})

export const getConfig = (token: string, username: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}:${username}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        charset: 'utf-8',
      },
    }
    return config
  }
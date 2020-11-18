export const getConfig = (token: string) => {
    const config = {
      headers: {
        Authorization: `${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        charset: 'utf-8',
      },
    }
    return config
  }
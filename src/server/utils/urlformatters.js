const appendQueryString = (url, queryVars) => {
    const firstSeperator = url.indexOf('?') === -1 ? '?' : '&'
    const queryStringParts = []

    for (const key in queryVars) {
      if (queryVars[key]) {
        if (Array.isArray(queryVars[key])) {
          const array = queryVars[key]
          for (const item of array) {
            queryStringParts.push(key + '=' + item)
          }
        } else {
          queryStringParts.push(key + '=' + queryVars[key])
        }
      }
    }

    const queryString = queryStringParts.join('&')
    
    return url + firstSeperator + queryString
}

  exports.appendQueryString = appendQueryString

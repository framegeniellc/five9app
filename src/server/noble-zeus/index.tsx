/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-prototype-builtins */
require('./noble-zeus')

exports.getNobleZeusHandler = async (req, res) => {
  const url = req.params['0']

  if (url) {
    try {
      const response = await getNobleZeusTransport().get(url, { params: req.query })

      res.json(response.data)
    } catch (e) {
      console.error(e)
      return res.json({ error: true })
    }
  } else {
    res.status(400)
    res.json({ error: true, message: 'Missing info.' })
    return
  }
}

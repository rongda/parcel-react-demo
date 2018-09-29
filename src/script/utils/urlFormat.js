import querystring from 'querystring'
import url from 'url'
import { oaservice, pathname } from '../config'

// create url for authentication
export default referer => oaservice + url.format(
  {
    pathname: '/', // /qrcode
    query: {
      response_type: 'code',
      client_id: 'b9a52fcf416e4d6888a3e43b8a10c3a9',
      redirect_url: url.format({
        host: window.location.host,
        protocol: window.location.protocol,
        port: window.location.port,
        pathname,
        search: querystring.stringify({
          referer
        })
      })
    }
  }
)

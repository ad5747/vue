import basicUrl from 'axios'

const contentType = {
  formData: 'application/x-www-form-urlencoded; charset=UTF-8',
  json: 'application/json; charset=UTF-8'
}

const defalultConfig = {
  // 设置传输内容的类型和编码
  headers: {'Content-Type': contentType.json},
  // 指定某个请求应该发送凭据。允许客户端携带跨域cookie，也需要此配置
  withCredentials: true,
  responseType: 'json',
  timeout: 30 * 1000
}

// 匯率網
// 使用說明 https://fixer.io/quickstart
const rterApi = basicUrl.create({
  baseURL: '/fixerApi'
})
rterApi.defaults = defalultConfig

rterApi.interceptors.request.use(function (config) {
  console.log('發出請求前')
  console.log(config)
  return config
})
rterApi.interceptors.response.use((res) => {
  console.log('獲得回應')
  console.log(res)
  return res
})

export const rterApiNowGet = (base = '', symbols = '') => {
  let url = '/api/latest?access_key=203fe57d25b717d966831737b1fa5902'
  if (base !== '') url = url.concat(`&base=${base}`)
  if (symbols !== '') url = url.concat(`&symbols=${symbols}`)
  return rterApi.get(url)
}
export const rterApiHistoryGet = (date) => rterApi.get(`/api/${date}?access_key=203fe57d25b717d966831737b1fa5902`, defalultConfig)

// 台灣股市觀測站
// 一秒鐘內發起三次連線會被ban
const stockApi = basicUrl.create({
  baseURL: '/stockApi'
})
stockApi.defaults = defalultConfig
export const stockApiGetStockInfo = (stockCodeList) => {
  if (Array.isArray(stockCodeList)) {
    let queryString = stockCodeList.reduce((a, b) => { return a.concat(`|${b}`) })
    let url = `/api/getStockInfo.jsp?ex_ch=${queryString}`
    return stockApi.get(url)
  } else {
    return '參數輸入錯誤'
  }
}

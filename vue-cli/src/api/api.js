import basicUrl from 'axios'

/* const contentType = {
  formData: 'application/x-www-form-urlencoded; charset=UTF-8',
  json: 'application/json; charset=UTF-8'
} */

// 全球匯率網
const rterApi = basicUrl.create({
  baseURL: 'rterApi'
})

export const getRter = () => rterApi.get('/capi.php')

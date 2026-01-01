import axios from 'axios'

axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(
  async res => {
    return [200].includes(res.status) ? res.data : res
  },
  () => {
    // console.error(error)
    return Promise.reject(null)
  },
)

const runRequest =
  method =>
  (url, data = {}, options = {}) =>
    axios.request({
      [method.toLowerCase() === 'get' ? 'params' : 'data']: data,
      url,
      method,
      ...options,
    })

export default {
  get: runRequest('get'),
  post: runRequest('post'),
  put: runRequest('put'),
  patch: runRequest('patch'),
  delete: runRequest('delete'),
  downloadExcel: async (method, url, data, fileNm = '', ext = '.xlsx') => {
    const response = await runRequest(method)(url, data, { responseType: 'blob' })
    if ([200, 204].includes(response.status)) {
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${(fileNm === '' ? new Date().toISOString() : fileNm) + ext}`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return blob
    }
  },
}

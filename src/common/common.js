import axios from 'axios'

// eslint-disable-next-line new-cap
const api = new axios.create(
  {
    baseURL: process.env.BACKEND_URL,
    withCredentials: true
  }
)

// Response Interceptor: 응답을 받은 후에 실행됩니다.
api.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공하거나 추가적인 작업을 수행할 수 있습니다.
    return response
  },
  (error) => {
    if (error.response) {
      // 서버에서 응답한 상태 코드가 2xx가 아닌 경우
      alert('HTTP Error : ' + error.response.status + '\n' +
                'Error Data : ' + error.response.data
      )
    } else if (error.request) {
      // 서버로의 요청이 전송되지 않은 경우
      alert('No response received :' + error.request)
    } else {
      // 요청 설정을 구성하는 중에 에러가 발생한 경우
      alert('Request Error : ' + error.message)
    }
    window.location = '/'
    return Promise.reject(error)
  }
)

export { api }

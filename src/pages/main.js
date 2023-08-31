import { useEffect } from 'react'
import { api } from '../common/common'

function Main () {
  useEffect(() => {
  }, [])

  async function test () {
    const result = await api.delete('/user', { withCredentials: true })
    console.log(result)
  }

  return (
        <>
            <div>
                <h1>메인 페이지 공사중 🛠️</h1>
                <p>자유게시판으로 가세요 🚀</p>
                <button onClick={test}>test</button>
            </div>
        </>
  )
}

export default Main

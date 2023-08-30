import { useEffect } from 'react'
import { api } from '../common/common'

function Main () {
  useEffect(() => {
  }, [])

  async function test () {
    const result = await api.get('/user', { withCredentials: true })
    console.log(result)
  }

  return (
        <>
            <div>
                <h1>안녕하세오. 자유게시판으로 가세오.</h1>
                <p>현재 개발중인니다.</p>
                <button onClick={test}>test</button>
            </div>
        </>
  )
}

export default Main

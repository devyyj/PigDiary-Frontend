import React from 'react'
import Board from '../../components/board'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export default function List () {
  const navigate = useNavigate()
  const [cookies] = useCookies(['isLogged'])
  const handleWriteButtonClick = () => {
    // 여기에서 로그인 상태를 확인하고 로그인되지 않은 경우 로그인 페이지로 이동하도록 로직을 추가해야 합니다.
    // 예를 들어, 사용자가 로그인되어 있는지 확인하는 함수가 있다고 가정합니다.

    if (cookies.isLogged) {
      // 로그인 상태라면 글쓰기 페이지로 이동
      navigate('/freeboard/create')
    } else {
      // 로그인되지 않은 경우 로그인 페이지로 이동 또는 로그인 모달을 표시할 수 있습니다.
      if (confirm('로그인이 필요해요. 🐷 로그인 하시겠어요?')) {
        navigate('/login') // 로그인 페이지로 이동
      }
    }
  }

  return (
        <>
            <Board></Board>
            <div className="d-flex justify-content-end">
                <button
                    className={'btn btn-outline-primary float-right'}
                    onClick={handleWriteButtonClick}
                >
                    글쓰기
                </button>
            </div>
        </>
  )
}

import React from 'react'

const Login = () => {
  return (
        <div className={'login-container'}>
            <h1>1초만에 로그인 🚀</h1>
            <a href={`${process.env.REACT_APP_BACK_URL}/oauth2/authorization/google`}>
                <img className={'login-button'} src="/google_btn.png" alt="Google 로그인"/>
            </a>
            <a href={`${process.env.REACT_APP_BACK_URL}/oauth2/authorization/kakao`}>
                <img className={'login-button'} src="/kakao_btn.png" alt="카카오 로그인"/>
            </a>
            <h6 className={'mt-3'}>🐽 돼지일기는 개인 정보를 수집하지 않아요!</h6>
            <h6>ex) 이메일, 사진, 닉네임 등</h6>
        </div>
  )
}

export default Login

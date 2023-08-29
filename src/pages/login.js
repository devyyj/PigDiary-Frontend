import React from 'react';

const Login = () => {
    return (
        <div className={"login-container"}>
            <a href={"http://localhost:8080/oauth2/authorization/google"}>
                <img className={"login-button"} src="/google_btn.png" alt="Google 로그인"/>
            </a>
            <a href={"http://localhost:8080/oauth2/authorization/kakao"}>
                <img className={"login-button"} src="/kakao_btn.png" alt="카카오 로그인"/>
            </a>
        </div>
    );
};

export default Login;

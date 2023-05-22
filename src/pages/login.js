import React, {useEffect} from 'react';
import axios from "axios";

const Login = () => {
    useEffect(() => {
        const kakao = window.Kakao;
        if (kakao.isInitialized()) {
            // kakao.init('ccc3f29c5a122654960761cb279c2f05'); // 카카오 JavaScript SDK 키 초기화
            kakao.Auth.authorize({
                redirectUri: 'http://localhost:3000',
            });
        }
    }, []);

    return (
        <div>
            카카오 로그인
        </div>
    );
};

export default Login;
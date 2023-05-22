import {Button} from "react-bootstrap";
import {useEffect} from "react";
import axios from "axios";
import {api} from "../common/common";

function Main() {
    const Kakao = window.Kakao;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');

        if (authorizationCode) {
            const getToken = async () => {
                try {
                    const data = new URLSearchParams();
                    data.append('grant_type', 'authorization_code');
                    data.append('client_id', '3905671b61c8b3dd943beda7a3b86bb5');
                    data.append('redirect_uri', 'http://localhost:3000');
                    data.append('code', authorizationCode);

                    const response = await axios.post(
                        'https://kauth.kakao.com/oauth/token',
                        data.toString(),
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                            },
                        }
                    );

                    console.log(response.data)

                    Kakao.Auth.setAccessToken(response.data.access_token);

                    // const accessToken = response.data.access_token;
                    // const refreshToken = response.data.refresh_token;
                    // 토큰을 사용하여 원하는 작업 수행
                    const userData = await Kakao.API.request({url: '/v2/user/me'})
                    console.log(userData);
                    const nick_name = await api.post("/user", {socialId: userData.id, nickName: userData.id})
                    console.log(nick_name);
                } catch (error) {
                    console.log(error);
                }
            };
            getToken();
        }
    }, []);


    function cls() {
        if (Kakao.isInitialized()) {
            console.log('!!' + Kakao.Auth.getAccessToken())
        } else {
            console.log('2')
        }
    }

    function logout() {
        if (Kakao.isInitialized()) {
            Kakao.Auth.logout()
                .then(function (response) {
                    console.log(Kakao.Auth.getAccessToken()); // null
                })
                .catch(function (error) {
                    console.log('Not logged in.');
                });
        } else {
            console.log('no init')
        }
    }

    return (
        <>
            <div>
                <h1>안녕하세오. 자유게시판으로 가세오.</h1>
                <p>현재 개발중인니다.</p>
            </div>
            <Button onClick={cls}>console</Button>
            <Button onClick={logout}>logout</Button>
        </>
    );
}

export default Main;
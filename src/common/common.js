import axios from "axios";

const kakao = window.Kakao;

const api = new axios.create({baseURL: process.env.REACT_APP_BE_URL});
const login = () => {
    if (kakao.isInitialized()) {
        kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000',
        });
    }
}
const setUserInfoAction = userInfo => {
    return {
        type: 'SET_USER',
        payload: userInfo,
    };
};
const getUserInfo = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');
    if (authorizationCode) {
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

            kakao.Auth.setAccessToken(response.data.access_token);

            // const accessToken = response.data.access_token;
            // const refreshToken = response.data.refresh_token;
            // 토큰을 사용하여 원하는 작업 수행
            const userData = await kakao.API.request({url: '/v2/user/me'})
            console.log(userData);
            const nick_name = await api.post("/user", {socialId: userData.id, nickName: userData.id})
            console.log(nick_name.data);
            return nick_name.data;
        } catch (error) {
            console.log(error);
        }
    }
};

const initialState = {
    userInfo: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                userInfo: action.payload,
            };
        default:
            return state;
    }
};

export {api, login, setUserInfoAction, getUserInfo, reducer}
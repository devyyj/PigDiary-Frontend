import {useEffect} from "react";
import {getUserInfo} from "../common/common";

function Main() {
    // const dispatch = useDispatch();

    useEffect(() => {
        getUserInfo().then(userInfo => {
            // dispatch(setUserInfoAction(userInfo));
        });
    }, []);

    return (
        <>
            <div>
                <h1>안녕하세오. 자유게시판으로 가세오.</h1>
                <p>현재 개발중인니다.</p>
            </div>
        </>
    );
}

export default Main;
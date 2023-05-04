import {api} from "../common/common";

function Main() {
  async function getAll() {
    const result = await api.get("/all")
    console.log(result.data)
  }

  async function getMember() {
    const result = await api.get("/member")
    console.log(result.data)
  }

  async function getAdmin() {
    const result = await api.get("/admin")
    console.log(result.data)
  }

  return (
    <div>
      <p onClick={getAll}>권한 필요</p>
      <p onClick={getMember}>회원만 가능</p>
      <p onClick={getAdmin}>관리자만 가능</p>
    </div>
  );
}

export default Main;
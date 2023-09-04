import Table from 'react-bootstrap/Table'
import React, { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../common/common'
import { Pagination } from 'react-bootstrap'

const Board = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [pageList, setPageList] = useState([1, 2, 3, 4, 5])
  const [prev, setPrev] = useState(false)
  const [next, setNext] = useState(true)

  useLayoutEffect(() => {
    const fetchData = async () => {
      const response = (await api.get(`/freeboard?page=${page}`)).data
      setData(response.dtoList)
      setPageList(response.pageList)
      setPrev(response.prev)
      setNext(response.next)
    }
    fetchData()
  }, [page])

  return (
        <div>
            <Table hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th style={{ whiteSpace: 'nowrap' }}>제목</th>
                    {/* whiteSpace 속성을 'nowrap'로 설정하여 텍스트 줄바꿈을 방지 */}
                    <th>작성자</th>
                    <th>등록 시간</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>
                            {/* whiteSpace 속성과 ellipsis로 텍스트 오버플로우 제어 */}
                            <Link to={`/freeboard/${item.id}`}>{item.title}</Link>
                        </td>
                        <td>{item.nickName}</td>
                        <td>{new Date(item.createdAt).toLocaleTimeString()}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.Prev disabled={!prev} onClick={() => setPage(page - 1)} />
                    {pageList.map((pageNumber) => (
                        <Pagination.Item
                            key={pageNumber}
                            active={pageNumber === page}
                            onClick={() => setPage(pageNumber)}
                        >
                            {pageNumber}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next disabled={!next} onClick={() => setPage(page + 1)} />
                </Pagination>
            </div>
        </div>
  )
}

export default Board

import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { api } from '../common/common'

export default function Diary () {
  const [pageResponse, setPageResponse] = useState({
    dtoList: [],
    totalPage: 0,
    page: 0,
    size: 10, // 페이지당 아이템 수
    start: 0,
    end: 0,
    prev: false,
    next: false,
    pageList: []
  })

  const [loading, setLoading] = useState(false)

  const [newDiary, setNewDiary] = useState({
    foodName: '',
    mealDate: '',
    mealTime: ''
  })

  useEffect(() => {
    // 초기 데이터 로딩
    fetchData(1)
  }, [])

  useEffect(() => {
    // 페이지가 변경될 때마다 새로운 페이지 데이터 로딩
    if (pageResponse.page > 1) {
      fetchData(pageResponse.page)
    }
  }, [pageResponse.page])

  const fetchData = (page) => {
    setLoading(true)
    // 페이지 데이터를 서버에서 가져오는 API 호출
    api
      .get(`/diary?page=${page}`)
      .then((response) => {
        const { dtoList, totalPage, page, size, start, end, prev, next, pageList } = response.data
        setPageResponse({
          dtoList: [...pageResponse.dtoList, ...dtoList],
          totalPage,
          page,
          size,
          start,
          end,
          prev,
          next,
          pageList
        })
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data: ', error)
        setLoading(false)
      })
  }

  const handleLoadMore = () => {
    setPageResponse({
      ...pageResponse,
      page: pageResponse.page + 1
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewDiary({
      ...newDiary,
      [name]: value
    })
  }

  const handleAddDiary = () => {
    // 서버로 새로운 일기 데이터를 보내는 API 호출
    api
      .post('/diary', newDiary)
      .then((response) => {
        // 새로운 일기가 성공적으로 추가된 경우
        // 페이지를 다시 로드하여 업데이트된 데이터를 표시
        fetchData(1)
        // 입력 필드 초기화
        setNewDiary({
          foodName: '',
          mealDate: '',
          mealTime: ''
        })
      })
      .catch((error) => {
        console.error('Error adding diary: ', error)
      })
  }

  return (
        <>
            <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                {/* 첫 번째 Card는 글쓰기 폼을 포함 */}
                <Col>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Food Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="foodName"
                                        value={newDiary.foodName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Meal Date</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="mealDate"
                                        value={newDiary.mealDate}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Meal Time</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="mealTime"
                                        value={newDiary.mealTime}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Button onClick={handleAddDiary}>글 쓰기</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* 나머지 Card에는 응답받은 데이터를 출력 */}
                {pageResponse.dtoList.map((item, index) => (
                    <Col key={index}>
                        <Card>
                            <Card.Body>
                                {/* 여기에서 각 아이템의 데이터를 표시 */}
                                <Card.Title>{item.foodName}</Card.Title>
                                <Card.Subtitle>{item.mealDate}</Card.Subtitle>
                                <Card.Text>{item.mealTime}</Card.Text>
                                <Card.Link href="#">수정</Card.Link>
                                <Card.Link href="#">삭제</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="text-center">
                {loading && <p>Loading...</p>}
                {!loading && (pageResponse.next || pageResponse.page < pageResponse.end) && (
                    <Button onClick={handleLoadMore}>Load More</Button>
                )}
            </div>
        </>
  )
}

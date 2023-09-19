import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { api } from '../common/common'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export default function Diary () {
  const [cookies] = useCookies(['isLogged'])
  const navigate = useNavigate()

  const [pageResponse, setPageResponse] = useState({
    dtoList: [],
    page: 1,
    end: 0,
    next: false
  })
  const [loading, setLoading] = useState(false)
  const [foodName, setFoodName] = useState('')
  const [mealDate, setMealDate] = useState(new Date())
  const [mealTime, setMealTime] = useState(0)

  const foodNameMinLength = 1 // 최소 길이
  const foodNameMaxLength = 20 // 최대 길이
  const mealTimeOptions = ['아침', '점심', '저녁', '야식', '간식'] // 시간 옵션

  useEffect(() => {
    if (!cookies.isLogged) {
      navigate(-1)
      console.log(-1)
    }
    fetchData(pageResponse.page)
  }, [pageResponse.page])

  const fetchData = async (paramPage) => {
    setLoading(true)
    const response = await api.get(`/diary?page=${paramPage}`)
    const { dtoList, page, end, next } = response.data
    if (paramPage === 1) {
      pageResponse.dtoList = []
    }
    setPageResponse({
      dtoList: [...pageResponse.dtoList, ...dtoList],
      page,
      end,
      next
    })
    setLoading(false)
  }

  const handleLoadMore = () => {
    setPageResponse({ ...pageResponse, page: pageResponse.page + 1 })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'foodName') {
      setFoodName(value)
    } else if (name === 'mealTime') {
      setMealTime(value)
    }
  }

  const handleAddDiary = async () => {
    // foodName 길이 검사
    if (foodName.length < foodNameMinLength || foodName.length > foodNameMaxLength) {
      alert(`Food Name should be between ${foodNameMinLength} and ${foodNameMaxLength} characters.`)
      return
    }

    setLoading(true)
    const newDiaryEntry = {
      foodName,
      mealDate,
      mealTime
    }
    await api.post('/diary', newDiaryEntry)
    await fetchData(1)
  }

  return (
        <>
            <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Food Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="foodName"
                                        value={foodName}
                                        onChange={handleInputChange}
                                        minLength={foodNameMinLength}
                                        maxLength={foodNameMaxLength}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Meal Date</Form.Label>
                                    <Col>
                                        <DatePicker
                                            className="form-control"
                                            selected={mealDate}
                                            onChange={(date) => setMealDate(date)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Meal Time</Form.Label>
                                    <Form.Select name="mealTime" value={mealTime} onChange={handleInputChange}>
                                        {mealTimeOptions.map((option, index) => (
                                            <option key={index} value={index}>
                                                {option}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Button onClick={handleAddDiary}>일기 쓰기</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {pageResponse.dtoList.map((item, index) => (
                    <Col key={index}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.foodName}</Card.Title>
                                <Card.Subtitle>{item.mealDate}</Card.Subtitle>
                                <Card.Text>{item.mealTime}</Card.Text>
                                <Card.Link href="#">Edit</Card.Link>
                                <Card.Link href="#">Delete</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="text-center mt-3">
                {loading && <p>Loading...</p>}
                {!loading && (pageResponse.next || pageResponse.page < pageResponse.end) && (
                    <Button onClick={handleLoadMore}>더 보기</Button>
                )}
            </div>
        </>
  )
}

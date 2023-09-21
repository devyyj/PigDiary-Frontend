// DiaryForm.js

import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Col from 'react-bootstrap/Col'
import { api } from '../common/common'

export default function DiaryForm ({ parentFunc, diaryData }) {
  const today = new Date()

  const [foodName, setFoodName] = useState('')
  const [mealDate, setMealDate] = useState(today)
  const [mealTime, setMealTime] = useState(0)
  const [buttonName, setButtonName] = useState('다이어리 쓰기')

  const foodNameMinLength = 1 // 최소 길이
  const foodNameMaxLength = 20 // 최대 길이
  const mealTimeOptions = ['아침', '점심', '저녁', '간식', '야식'] // 시간 옵션

  const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())

  useEffect(() => {
    if (diaryData) {
      console.log(diaryData)
      setFoodName(diaryData.foodName)
      setMealDate(new Date(diaryData.mealDate))
      setMealTime(mealTimeOptions.indexOf(diaryData.mealTime))
      setButtonName('다이어리 수정')
    }
  }, [])

  const handleInputChange = (e) => {
    if (e.target) {
      const { name, value } = e.target
      if (name === 'foodName') {
        setFoodName(value)
      } else if (name === 'mealTime') {
        setMealTime(value)
      }
    } else {
      setMealDate(e)
    }
  }

  const handleAddDiary = async () => {
    // foodName 길이 검사
    if (foodName.length < foodNameMinLength || foodName.length > foodNameMaxLength) {
      alert(`음식 이름은 최소 ${foodNameMinLength} 자리에서 최대 ${foodNameMaxLength} 자리여야 해요.`)
      return
    }

    // setLoading(true)
    const newDiaryEntry = {
      foodName: foodName.replace(/\s+/g, ''),
      mealDate,
      mealTime
    }
    if (diaryData) {
      newDiaryEntry.diaryId = diaryData.id
      await api.put('/diary', newDiaryEntry)
    } else {
      await api.post('/diary', newDiaryEntry)
    }

    setFoodName('')
    setMealDate(today)
    setMealTime(0)

    await parentFunc.fetchData(1)
    parentFunc.setShowDiaryForm(false)
  }

  return (
        <Card>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>음식 이름</Form.Label>
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
                        <Form.Label>식사 날짜</Form.Label>
                        <Col>
                            <DatePicker
                                className="form-control"
                                name="mealDate"
                                selected={mealDate}
                                onChange={handleInputChange}
                                minDate={oneYearAgo}
                                maxDate={today}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>식사 시간</Form.Label>
                        <Form.Select name="mealTime" value={mealTime} onChange={handleInputChange}>
                            {mealTimeOptions.map((option, index) => (
                                <option key={index} value={index}>
                                    {option}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button onClick={handleAddDiary}>{buttonName}</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
  )
}

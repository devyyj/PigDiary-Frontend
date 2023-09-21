import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Modal } from 'react-bootstrap'
import { api } from '../common/common'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import DiaryForm from '../components/diaryForm'

export default function Diary () {
  const [cookies] = useCookies(['isLogged'])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [pageResponse, setPageResponse] = useState({
    dtoList: [],
    page: 1,
    end: 0,
    next: false
  })
  const [showDiaryForm, setShowDiaryForm] = useState(false) // 팝업 표시 상태
  const [editItem, setEditItem] = useState(null) // 수정할 Card의 데이터를 저장할 상태

  useEffect(() => {
    if (!cookies.isLogged) {
      navigate(-1)
    } else {
      fetchData(pageResponse.page)
    }
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

  async function deletePost (e, postId) {
    e.preventDefault()

    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await api.delete(`/diary/${postId}`)
        await fetchData(1)
      } catch (error) {
        console.error(error)
      }
    }
  }

  // '수정' 링크를 클릭했을 때 호출되는 함수
  const handleEditDiary = (item) => {
    setEditItem(item) // 클릭한 Card의 데이터를 저장
    setShowDiaryForm(true) // 팝업 열기
  }

  return (
        <>
            <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                <Col>
                    <DiaryForm parentFunc={{ fetchData, setShowDiaryForm }}/>
                </Col>

                {pageResponse.dtoList.map((item, index) => (
                    <Col key={index}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{'#' + item.foodName}</Card.Title>
                                <Card.Text>{item.mealTime + ' / ' + item.mealDate}</Card.Text>
                                <div className="d-flex justify-content-end">
                                    <Card.Link href="#" onClick={() => handleEditDiary(item)}>
                                        수정
                                    </Card.Link>
                                    <Card.Link href="#" onClick={(e) => deletePost(e, item.id)}>
                                        삭제
                                    </Card.Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* 팝업 */}
            <Modal show={showDiaryForm} onHide={() => setShowDiaryForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>다이어리 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* 수정할 Card의 데이터를 DiaryForm 컴포넌트에 전달 */}
                    <DiaryForm parentFunc={{ fetchData, setShowDiaryForm }} diaryData={editItem} />
                </Modal.Body>
            </Modal>

            <div className="text-center mt-3">
                {loading && <p>Loading...</p>}
                {!loading && (pageResponse.next || pageResponse.page < pageResponse.end) && (
                    <Button onClick={handleLoadMore}>더 보기</Button>
                )}
            </div>
        </>
  )
}

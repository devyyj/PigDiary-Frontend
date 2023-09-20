import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button, Badge } from 'react-bootstrap'

function Test () {
  const [hashtags, setHashtags] = useState([])
  const [newHashtag, setNewHashtag] = useState('')

  const handleAddHashtag = () => {
    if (newHashtag.trim() !== '') {
      setHashtags([...hashtags, newHashtag])
      setNewHashtag('')
    }
  }

  const handleRemoveHashtag = (index) => {
    const updatedHashtags = [...hashtags]
    updatedHashtags.splice(index, 1)
    setHashtags(updatedHashtags)
  }

  return (
        <div className="container mt-5">
            <h1>해시태그 입력 및 삭제 예제</h1>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="해시태그 입력"
                    value={newHashtag}
                    onChange={(e) => setNewHashtag(e.target.value)}
                />
                <Button variant="primary" onClick={handleAddHashtag}>
                    추가
                </Button>
            </Form.Group>

            <div className="mt-3">
                {hashtags.map((hashtag, index) => (
                    <Badge
                        key={index}
                        pill
                        variant="info"
                        className="mr-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleRemoveHashtag(index)}
                    >
                        {hashtag} x
                    </Badge>
                ))}
            </div>
        </div>
  )
}

export default Test

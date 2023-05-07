import React, {useEffect, useState} from 'react';
import {api} from '../common/common.js'
import {useNavigate} from "react-router-dom";
import {Button, FloatingLabel, Form} from "react-bootstrap";

const PostEdit = ({postNumber}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [user, setUser] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get("/freeboard/" + postNumber);

            setTitle(result.data.title);
            setContent(result.data.content);
            setUser(result.data.user);
        }

        if (postNumber) fetchData();
    }, [postNumber]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('user', user);
        try {
            if (postNumber) await api.put('/freeboard/' + postNumber, formData);
            else await api.post('/freeboard', formData);
            navigate("/freeboard")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="이름"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        placeholder=" "
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="제목"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        placeholder=" "
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel className="mb-3" controlId="floatingTextarea" label="내용">
                    <Form.Control
                        as="textarea"
                        placeholder=" "
                        style={{height: '300px'}}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </FloatingLabel>

                <div className="d-grid gap-2">
                    <Button variant="outline-primary" type="submit">게시글 작성</Button>
                </div>
            </form>
        </div>);
};

export default PostEdit;

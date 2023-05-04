import React, {useState} from 'react';
import {api} from '../common/common.js'
import {useNavigate} from "react-router-dom";
import {FloatingLabel, Form} from "react-bootstrap";

const PostCreate = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [user, setUser] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('user', user);
        try {
            const response = await api.post('/freeboard', formData);
            console.log(response.data);
            navigate("/freeboard")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="user">User:</label>
                    <input
                        type="text"
                        id="user"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>

            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{height: '300px'}}
                />
            </FloatingLabel>
        </div>);
};

export default PostCreate;

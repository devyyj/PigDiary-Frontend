import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const PostUpdate = ({postNumber}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/freeboard/" + postNumber);

      setTitle(result.data.title);
      setContent(result.data.content);
      setUser(result.data.user);
    };

    fetchData();
  }, [postNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('user', user);
    try {
      const response = await axios.put('http://localhost:8080/freeboard/' + postNumber, formData);
      console.log(response.data);
      navigate("/freeboard")
    } catch (error) {
      console.error(error);
    }
  };
  return (
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
  );
}

export default PostUpdate;

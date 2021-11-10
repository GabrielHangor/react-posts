import React, { useState } from 'react';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Javascript', body: 'Description' },
    { id: 2, title: 'Javascript', body: 'Description' },
    { id: 3, title: 'Javascript', body: 'Description' },
  ]);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNewPost = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      title,
      body,
    };

    setPosts([...posts, newPost]);
    setTitle('');
    setBody('');
  };

  return (
    <div className="App">
      <form>
        <MyInput
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="Название поста"
        />
        <MyInput
          onChange={(e) => setBody(e.target.value)}
          value={body}
          type="text"
          placeholder="Описание поста"
        />
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title={'Список постов'} />
    </div>
  );
}

export default App;

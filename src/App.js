import React, { useMemo, useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyInput from './components/UI/input/MyInput';
import MySelect from './components/UI/select/MySelect';

import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Javascript',
      body: 'Динамически типизированный язык программирования',
    },
    {
      id: 2,
      title: 'Java',
      body: 'Статически типизированный язык программирования',
    },
    {
      id: 3,
      title: 'C#',
      body: 'Более низкоуровневый язык',
    },
  ]);
  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const getSortedPosts = () => {
    if (selectedSort) {
      return [...posts].sort((a, b) =>
        a[selectedSort].localeCompare(b[selectedSort])
      );
    }
    return posts;
  };
  const sortedPosts = useMemo(() => {}, [selectedSort, posts]);

  const createPost = (newPost) => setPosts([...posts, newPost]);
  const removePost = (post) => setPosts(posts.filter((p) => p.id !== post.id));
  const sortPosts = (sortValue) => setSelectedSort(sortValue);

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>
        <MyInput
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          options={[
            {
              value: 'title',
              name: 'По названию',
            },
            {
              value: 'body',
              name: 'По описанию',
            },
          ]}
          defaultValue="Сортировка"
        />
      </div>
      {posts.length !== 0 ? (
        <PostList
          posts={sortedPosts}
          remove={removePost}
          title="Список постов"
        />
      ) : (
        <h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>
      )}
    </div>
  );
}

export default App;

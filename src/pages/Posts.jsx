import React, { useEffect, useState, useRef } from 'react';
import PostFilter from './../components/PostFilter';
import PostForm from './../components/PostForm';
import PostList from './../components/PostList';
import MyButton from './../components/UI/button/MyButton';
import MyModal from './../components/UI/MyModal/MyModal';
import { usePosts } from './../hooks/usePosts';
import './../styles/App.css';
import PostService from './../API/PostService';
import Loader from './../components/UI/Loader/Loader';
import { useFetching } from './../hooks/useFetching';
import { getPageCount } from './../utils/pages';
import Pagination from './../components/UI/pagination/Pagination';
import { useObserver } from './../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, arePostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(lastElement, page < totalPages, arePostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [limit, page]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => setPosts(posts.filter((p) => p.id !== post.id));
  const changePage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: -1, name: 'Показать все' },
        ]}
      />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <PostList
        posts={sortedAndSearchedPosts}
        remove={removePost}
        title="Список постов"
      />
      {arePostsLoading && <Loader />}
      <div ref={lastElement} style={{ height: '10px' }} />
      <Pagination page={page} totalPages={totalPages} changePage={changePage} />
    </div>
  );
}

export default Posts;

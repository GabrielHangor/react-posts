import React, { useEffect, useState } from 'react';
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

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, arePostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts(response.data);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useEffect(() => {
    fetchPosts(limit, page);
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => setPosts(posts.filter((p) => p.id !== post.id));
  const changePage = (pageNumber) => {
    setPage(pageNumber);
    fetchPosts(limit, pageNumber);
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
      <Pagination page={page} totalPages={totalPages} changePage={changePage} />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      {arePostsLoading ? (
        <Loader />
      ) : (
        <PostList
          posts={sortedAndSearchedPosts}
          remove={removePost}
          title="Список постов"
        />
      )}
    </div>
  );
}

export default Posts;
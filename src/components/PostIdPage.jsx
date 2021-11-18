import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useFetching } from './../hooks/useFetching';
import PostService from './../API/PostService';
import Loader from './UI/Loader/Loader';

function PostIdPage() {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostsById, arePostsLoading, postError] = useFetching(
    async (id) => {
      const response = await PostService.getById(id);
      setPost(response.data);
    }
  );

  const [fetchComments, areCommentsLoading, commentsError] = useFetching(
    async (id) => {
      const response = await PostService.getCommentsByPostId(id);
      setComments(response.data);
    }
  );

  useEffect(() => {
    fetchPostsById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1>Вы открыли страницу поста {params.id}</h1>
      {arePostsLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h1>Комментарии</h1>
      {areCommentsLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((el) => (
            <div style={{ marginTop: '15px' }}>
              <h5>{el.email}</h5>
              <div>{el.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostIdPage;

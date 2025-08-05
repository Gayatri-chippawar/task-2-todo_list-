import React, { useEffect, useState } from 'react';
import api from '../api';

function CommentSection({ taskId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Fetch comments for this task
  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/task/${taskId}`);
      setComments(res.data);
    } catch (err) {
      console.error('Failed to load comments:', err.message);
    }
  };

  // Add new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await api.post('/comments/', {
        task_id: taskId,
        content: newComment,
      });
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Failed to add comment:', err.message);
    }
  };

  // Delete comment
  const handleDelete = async (id) => {
    try {
      await api.delete(`/comments/${id}`);
      fetchComments();
    } catch (err) {
      console.error('Failed to delete comment:', err.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [taskId]);

  return (
    <div style={{ marginTop: '10px' }}>
      <h4>Comments</h4>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            {c.content}
            <button onClick={() => handleDelete(c.id)} style={{ marginLeft: '10px' }}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddComment}>
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add comment"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CommentSection;

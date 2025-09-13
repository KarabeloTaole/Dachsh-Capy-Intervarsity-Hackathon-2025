//this is the social feed where users can interact with eachh other
import { useState } from 'react';

const SocialFeed = ({ onBack }) => {
  const [newPost, setNewPost] = useState(''); // the useState for posts
  const [filter, setFilter] = useState('all');
  const [showCommentBox, setShowCommentBox] = useState(null);
  const [newComment, setNewComment] = useState('');

};

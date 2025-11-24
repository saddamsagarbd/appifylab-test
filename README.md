# News Feed Application

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black)](https://nextjs.org/)

---

## Overview

This is a **News Feed application** built using **Next.js**, **React**, and **TypeScript**. Users can create, like, and comment on posts, and reply to comments. The application mimics social media interactions and provides real-time updates for comments and replies.

---

## Features

* **Post Creation**: Users can create text posts with optional media.
* **Post Visibility**: Posts can be public (everyone can see) or private (only the author).
* **Likes**: Users can like/unlike posts, comments, and replies.
* **Comments & Replies**:

  * Comment on posts.
  * Reply to comments.
  * Display username of creators.
  * Automatically updates the UI after adding a comment or reply.
* **Time Ago Display**: Relative time (seconds, minutes, hours, days) for posts and comments.
* **Responsive Design**: Mobile-friendly layout.
* **Notifications**: Toast notifications for actions like comment or reply.

---

## Technologies Used

* **Frontend**: Next.js, React, TypeScript, Axios
* **Styling**: CSS Modules / Global CSS
* **Notifications**: react-toastify
* **Image Handling**: Next.js `Image` component
* **Backend**: REST API (assumed Node.js/Express or similar)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/saddamsagarbd/appifylab-test
cd appifylab-test/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

```
/pages
  index.tsx       # Main feed page
/components
  NewsFeed.tsx    # News feed component
  Comment.tsx     # Comment component
  Reply.tsx       # Reply component
/utils
  api.ts          # Axios configuration
  helpers.ts      # Utility functions like timeAgo
```

---

## Data Structure

```ts
type Post = {
  id: number;
  content: string;
  file_name?: string;
  visibility: number;
  author: number;
  created_at: Date;
  first_name: string;
  last_name: string;
  liked_by_user: boolean;
  total_likes: number;
  comments: CommentType[];
};

type CommentType = {
  id: number;
  user_id: number;
  user_name: string;
  content: string;
  total_likes: number;
  liked_by_user: boolean;
  replies: ReplyType[];
};

type ReplyType = {
  id: number;
  user_id: number;
  user_name: string;
  content: string;
  total_likes: number;
  liked_by_user: boolean;
};
```

---

## Key Functions

### `handleComment(postId)`

* Validates comment input.
* Sends a POST request to `/posts/comment`.
* Updates the post state immediately to show the new comment.
* Clears the input field.

### `handleReply(commentId, postId)`

* Validates reply input.
* Sends a POST request to `/posts/reply`.
* Updates the comment state immediately to show the new reply.
* Clears the input field.

### `toggleLikePost(postId)`

* Sends POST request to toggle like.
* Updates like count and UI immediately.

### `timeAgo(date)`

* Converts timestamps into relative time (seconds, minutes, hours, days).
* Uses fallback `toLocaleDateString()` for older posts.

---

## Deployment

* Ensure the backend API is running and `.env.local` is configured.
* Run locally with `npm run dev`.
* Optional: Deploy to **Vercel**, **Netlify**, or any server.

---

## Video Walkthrough

[Upload an unlisted/private video demonstrating the app features and share the link here.](https://www.awesomescreenshot.com/video/46726684?key=de770a54cae5613ea60b3e6d90c9d582)

---

## Notes & Recommendations

* Ensure backend always returns `replies` as an array.
* Use `key` props when mapping lists to avoid React warnings.
* Pagination or infinite scroll can improve performance with large feeds.

---

## Contact

* Author: Md. Saddam Hossain
* GitHub: [https://github.com/saddamsagarbd/](https://github.com/saddamsagarbd)

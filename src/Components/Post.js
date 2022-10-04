import React from 'react'

export default function Post({posts, info}) {
    const {name: author} = info;
  return (
    <div>
        <h2>Danh sách bài viết</h2>
        {posts.map(({title, content}, index) => {
            return (
                <div key={index}>
                    <h3>{title}</h3>
                    <p>Author: {author}</p>
                    <p>{content}</p>
                </div>
            )
        }) }
    </div>
  )
}

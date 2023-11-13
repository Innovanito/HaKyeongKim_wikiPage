"use client"
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

const  BoardUpdate: React.FC= ()=> {
  const router = useRouter();
  const id = useParams().id
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')


  useEffect(() => {
    axios.get(`http://localhost:8080/getBoardInfo/${id}`)
    .then(res => {
      setTitle(res.data.title)
      setContent(res.data.content)
    })
  }, [])

  const handleUpdate = async () => {
    try {
      const updatedData = {
        title: title,
        content: content,
      };


      const response = await axios.put(`http://localhost:8080/updateBoard/${id}`, updatedData);

      console.log("response data after put method execute: ", response.data)

      // 게시판 페이지로 이동
      router.push('/board');
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };

  

  
  console.log('title and content : ', title, content)

  return (
    <div className="max-w-2xl mx-auto mt-20 bg-white p-8 rounded shadow-md">
      <div className=' text-center text-3xl'>
        <h1>게시글 수정</h1>
      </div>
      <form>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">제목</h3>
          <input name="title" type="text" className="w-full border p-2" defaultValue={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">내용</h3>
          <textarea name="content" className="w-full border p-2" rows={5} defaultValue={content} onChange={e => setContent(e.target.value)} ></textarea>
        </div>
        <p className="text-sm text-gray-500">1MB 이하의 파일만 업로드 해주세요.</p>
        <input type="file" name="file" className="mt-2" />
        <div className="mt-4">
          <button type="button" onClick={handleUpdate} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">작성</button>
        </div>
      </form>
    </div>
  )
}

export default BoardUpdate;
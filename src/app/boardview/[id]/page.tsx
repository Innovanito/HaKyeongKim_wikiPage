"use client"
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

interface Board {
  id: number;
  title: string;
  content: string;
}

const BoardView: React.FC = (props) => {
  const [board, setBoard] = useState<Board | null>(null);
  const router = useRouter();
  const id = useParams().id

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getBoardById/${id}`);
        const data = response.data;
        setBoard(data);
      } catch (error) {
        console.error('Error fetching board data:', error);
      }
    };

    if (id != null || undefined) {
      fetchBoardData();
    }
  }, [id]); 

  function updateClick() {
    router.push(`/boardupdate/${id}`)
    return
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/deleteBoard/${id}`);
      console.log("response data after delete method execute: ", response.data);

      // 게시판 페이지로 이동
      router.push('/board');
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  console.log("id in boardview", id)
  console.log("board data in boardview", board);

  return (
     <div className=" mt-10">
      {board ? (
        <div >
          <div>
            <h1 className='text-center text-4xl mb-5'>게시글 상세 페이지</h1>
          </div>
          <div className='flex flex-col  justify-center items-center  bg-slate-50'>
            <div className='w-[800px] h-[800px] bg-slate-100 border-2 border-black'>
              <div className='m-4'>
                <div className="mt-2 text-gray-500 textsm"><span>작성자 아이디</span> :  {board.id}</div>
              </div>
              <div className='m-4 '>
                <div className='text-xl'>게시글 제목</div>
                <h1 className="text-md font-medium mt-3">{board.title}</h1>
              </div>
              <div className='m-4 '>
                <div className=' mt-3 text-xl'>게시글 내용</div>
                <p className="mt-4 text-gray-700 font-medium">{board.content}</p>
              </div>
              <div className='mt-[300px] m-4'>
                <div className=''></div>
                <button onClick={updateClick} className=' bg-green-200 rounded-lg text-gray-600 text-3xl mr-10' >수정</button>
                <button onClick={handleDelete} className=' bg-red-200 rounded-lg text-gray-600 text-3xl'>삭제</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BoardView;

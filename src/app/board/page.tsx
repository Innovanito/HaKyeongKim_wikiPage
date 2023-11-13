// "use client"
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// interface Board {
//   id: number;
//   title: string;
//   content: string;
//   // Add other properties if needed
// }

// const MainBoard = () => {
//   const [boardData, setBoardData] = useState<Board[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredBoardData, setFilteredBoardData] = useState<Board[]>([])


//   const ITEMS_PER_PAGE = 15;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/getAll');
//         const data = await response.json();
//         setBoardData(data);
//       } catch (error) {
//         console.error('Error fetching board data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSearch = () => {
//     const filteredData = boardData.filter((board) =>
//       board.title.includes(searchTerm) || board.content.includes(searchTerm)
//     );
//     console.log("filteredData : ", filteredData)
//     setFilteredBoardData(filteredData)
//   };

  
//   let  totalPages = Math.ceil(boardData.length / ITEMS_PER_PAGE);
//   // 여기서 currentBoardData를 업데이트
//   let startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
//   let endIdx = startIdx + ITEMS_PER_PAGE;

//   // 필터링된 데이터를 기반으로 페이징 계산
//   let currentBoardData = filteredBoardData.slice(startIdx, endIdx);


  

//   console.log("BoardData:  ", boardData )

//   console.log("currentBoardData", currentBoardData);
  
//   return (
//     <div className='flex flex-col'>
//       <div className='text-4xl text-center mt-10'>
//         <h1>게시판</h1>
//       </div>

//       <div className="h-[600px] bg-gray-50 mt-5 overflow-y-scroll text-center flex flex-col justify-center items-center">
//         <div className="flex mt-4 space-x-4 -mr-[640px] mb-2 ">
//           <label htmlFor="search" className="text-lg mt-2">
//             제목 검색: 
//           </label>
//           <input
//             type="text"
//             id="search"
//             placeholder="키워드 검색"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border-2 p-2 rounded"
//           />
//           <button onClick={handleSearch} className='bg-slate-200 rounded w-10'>검색</button>
//         </div>
//         <table className='border-2 w-[1000px]'>
//           <thead>
//             <tr className='border-2'>
//               <th className='border-2'>글번호</th>
//               <th>제목</th>
//             </tr>
//           </thead>
//           <tbody> 
//             {currentBoardData.map((board) => (
//               <tr key={board.id} className="tableRow border-2 ">
//                 <td className="tableId border-2 ">{board.id}</td>
//                 <td>
//                   <Link className="boardName pl-2" href={`/boardview/${board.id}`}>
//                     {board.title}
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className='flex justify-center items-center'>
//         <div></div>
//         <div className="flex justify-center mt-4">
//           {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
//             <Link key={page} href={`/board?page=${page}`} onClick={() => setCurrentPage(page)} className={`px-2 py-1 mx-1 ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
//               {page}
//             </Link>
//           ))}
//         </div>
//         <div className='flex items-center justify-center mt-2 ml-60 bg-slate-400 text-gray-900 h-10 w-24 rounded-md text-center'>
//           <Link href="/boardcreate">새 글 생성</Link>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default MainBoard;

"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Board {
  id: number;
  title: string;
  content: string;
  // Add other properties if needed
}

const MainBoard = () => {
    const ITEMS_PER_PAGE = 15;

  const [boardData, setBoardData] = useState<Board[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBoardData, setFilteredBoardData] = useState<Board[]>([])
  const [currentBoardData, setCurrentBoardData] = useState<Board[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/getAll');
        const data = await response.json();
        setBoardData(data);

        // 데이터를 가져온 후에 totalPages 설정
        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching board data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredBoardData.length / ITEMS_PER_PAGE));
  }, [filteredBoardData]);


    // 여기서 currentBoardData를 업데이트
  let startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  let endIdx = startIdx + ITEMS_PER_PAGE;



  const handleSearch = () => {
    const filteredData = boardData.filter((board) =>
      board.title.includes(searchTerm) || board.content.includes(searchTerm)
    );
    console.log("filteredData : ", filteredData);
    setFilteredBoardData(filteredData);

    // 검색 결과로 인해 페이지를 초기화하고, 첫 페이지 데이터 설정
    setCurrentPage(1);
    setCurrentBoardData(filteredData.slice(0, ITEMS_PER_PAGE));

    // 필터된 데이터를 기반으로 페이징 계산
    setTotalPages(Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  };

  useEffect(() => {
    setCurrentBoardData(boardData.slice(startIdx, endIdx));
  }, [currentPage, boardData]);

  console.log("total pages", totalPages);
  console.log("boardData", boardData)
  console.log("filterdboarddata", filteredBoardData)
  console.log("currentBoardData", currentBoardData)
  
  return (
    <div className='flex flex-col'>
      <div className='text-4xl text-center mt-10'>
        <h1>게시판</h1>
      </div>

      <div className="h-[600px] bg-gray-50 mt-5 overflow-y-scroll text-center flex flex-col justify-center items-center">
        <div className="flex mt-4 space-x-4 -mr-[640px] mb-2 ">
          <label htmlFor="search" className="text-lg mt-2">
            제목 검색: 
          </label>
          <input
            type="text"
            id="search"
            placeholder="키워드 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 p-2 rounded"
          />
          <button onClick={handleSearch} className='bg-slate-200 rounded w-10'>검색</button>
        </div>
        <table className='border-2 w-[1000px]'>
          <thead>
            <tr className='border-2'>
              <th className='border-2'>글번호</th>
              <th>제목</th>
            </tr>
          </thead>
          <tbody> 
            {currentBoardData.map((board) => (
              <tr key={board.id} className="tableRow border-2 ">
                <td className="tableId border-2 ">{board.id}</td>
                <td>
                  <Link className="boardName pl-2" href={`/boardview/${board.id}`}>
                    {board.title}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-center items-center'>
        <div></div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <Link key={page} href={`/board?page=${page}`} onClick={() => setCurrentPage(page)} className={`px-2 py-1 mx-1 ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
            {page}
          </Link>
        ))}
        </div>
        <div className='flex items-center justify-center mt-2 ml-60 bg-slate-400 text-gray-900 h-10 w-24 rounded-md text-center'>
          <Link href="/boardcreate">새 글 생성</Link>
        </div>
      </div>

    </div>
  );
}

export default MainBoard;

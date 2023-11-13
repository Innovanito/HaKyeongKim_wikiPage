"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ServerResponse } from 'http';



export default function Login() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        memberId: '',
        password: '',
    });

    const { memberId, password } = formData;

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };

  const handleLogin = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const memberDto = {
        memberId,
        password,
    };

    // Send a POST request to the server
    try {
        const response = await axios.post('http://localhost:8080/LoginProcess2', memberDto);
        console.log('Data sent to the server:', memberDto);
        console.log('Response from the server:', response.data);

        if (response.data === 'Member not found') {
            alert('등록된 회원이 아닙니다.');
        } else if (response.data === 'Incorrect password') {
            alert('비밀번호가 일치하지 않습니다.');
        } else {
            // Handle successful login
            const tokenValue = response.data

            document.cookie = `memberId=${memberId}; path=/`;
            document.cookie = `password=${password}; path=/`;
            document.cookie = `tokenValue=${tokenValue}; path=/`;

            router.push('/board');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
  };
    
  console.log('id and pw in login page', memberId, password )

  return (
    <div className="display flex justify-center items-center mx-auto mt-40">
      <div className="bg-gray-50 custom-width w-[600px] p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="font-semibold">아이디</label>
              <input
                type="text"
                name="memberId"
                placeholder="아이디를 입력하세요."
                required
                className="p-2 border rounded"
                value={memberId}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">비밀번호</label>
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                required
                className="p-2 border rounded"
                value={password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600">
              로그인
            </button>
          </div>
        </form>

        <div className="mt-4">
          <Link href="/signup" className="text-blue-500">
            회원가입
          </Link>
          <span className="mx-2">|</span>
          <a href="#" className="text-blue-500">
            비밀번호 찾기
          </a>
        </div>
      </div>
    </div>
  );
}

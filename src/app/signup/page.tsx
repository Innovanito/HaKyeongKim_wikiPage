"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function Signup() {
  const router = useRouter();


  const [formData, setFormData] = useState({
    memberId: '',
    password: '',
    loginPwConfirm: '',
  });

  const [existingMemberIds, setExistingMemberIds] = useState<string[]>([]); 

  const { memberId, password, loginPwConfirm } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const memberDto = {
    memberId,
    password,
    };
    
    if (memberId === '' || password === '' || loginPwConfirm === '') {
      alert('Please fill in all fields.');
      return;
    };
    if (password != loginPwConfirm) {
      alert('Passwords do not match.')
      return;
    };

    // Send a POST request to your server
    try {
      const response = await axios.post('http://localhost:8080/memberCreate2', memberDto);
      console.log('Form data sent to the server:', response.data);
      router.push('/login')
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };


  console.log("memberId, password, loginPwConfirm :  ",memberId, password, loginPwConfirm );

  return (
    <form action="/memberCreate" method="POST" className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md mt-60" onSubmit={handleSubmit}>

      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <div className="mb-4">
        <input name="memberId" type="text" className="w-full py-2 px-4 border rounded" placeholder="아이디" value={memberId} onChange={handleChange} />
      </div>
      <div className="mb-4">
        <input name="password" type="password" className="w-full py-2 px-4 border rounded" placeholder="비밀번호" value={password} onChange={handleChange} />
      </div>
      <div className="mb-4">
        <input name="loginPwConfirm" type="password" className="w-full py-2 px-4 border rounded" placeholder="비밀번호 확인" value={loginPwConfirm} onChange={handleChange} />
      </div>
      <input type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" value="J O I N" />
    </form>
  );
}

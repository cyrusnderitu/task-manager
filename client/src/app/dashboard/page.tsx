'use client'
import React from 'react';
import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

type User = {
  _id: string;
  name: string;
  email: string;
};

type Props = {
  user: User | null;
};

export default function Dashboard({ user }: Props) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setMessage(`Welcome, ${user.name}!`);
    }
  }, [user]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <p>{message}</p>
      ) : (
        <p>Unauthorized. Please log in.</p>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const cookies = req.headers.cookie
    ? parse(req.headers.cookie)
    : {};
  const token = cookies.token;

  if (!token) {
    // No token found, redirect to login
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    // Call the backend to get user info
    const res = await axios.get('http://localhost:5000/api/auth/me', {
      headers: {
        Cookie: `token=${token}`,
      },
      withCredentials: true,
    });

    return {
      props: {
        user: res.data.user,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};


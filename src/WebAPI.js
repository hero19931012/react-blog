import { getAuthToken } from './utils';

const BASE_URL = 'https://student-json-api.lidemy.me';

export function register({ username, nickname, password }) {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  })
    .then(res => res.json());
}

export function getPosts() {
  // 一次只拿 5 筆
  // _start=0&_end=5 => 會取到結果中 index=5-8 的 post
  // 但是為了拿到全部 post 的數量，所以採用發一次 API，之後控制顯示的 5 筆
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`)
    .then(res => res.json());
}

export function getPost(id) {
  return fetch(`${BASE_URL}/posts/${id}/?_expand=user`)
    .then(res => res.json());
}

export function login(username, password) {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then(res => res.json());
}

export function getMe() {
  const token = getAuthToken();
  if (token) {
    return fetch(`${BASE_URL}/me`, {
      headers: {
        // get token from localStorage
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .catch(err => { console.log(err) })
  }
}

export function addPost(title, body) {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body,
    }),
  })
    .then(res => res.json());
}

export function deletePost(id) {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })
    .then(res => res.json());
}

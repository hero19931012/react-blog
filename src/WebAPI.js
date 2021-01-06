import { getAuthToken } from './utils';

const BASE_URL = 'https://agile-everglades-72905.herokuapp.com';

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

export function getPosts(offset) {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc&_start=${offset}&_end=${offset + 5}`)
    // 由於不是直接 return res.json() 的話就不會自動 json.parse()
    // 所以到後面再 parse
    .then(res => res);
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

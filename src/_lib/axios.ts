'use client';

import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://206.42.51.75:8081/manage_store/v1/',
});

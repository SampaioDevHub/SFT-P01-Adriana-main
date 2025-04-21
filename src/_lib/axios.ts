'use client';

import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://manage-store-showroom-sf-test.up.railway.app/manage_store/v1/',
});

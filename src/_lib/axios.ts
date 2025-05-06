'use client';

import axios from 'axios';

export const api = axios.create({
  baseURL: "https://manage-store-showroom-production.up.railway.app/manage_store/v1",
});
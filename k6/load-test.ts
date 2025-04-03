/* eslint-disable import/no-anonymous-default-export */
import http from 'k6/http';
import { sleep, check } from 'k6';

// Configuração do test
export const options = {
  stages: [
    { duration: '10s', target: 50 },
    { duration: '30s', target: 60 },
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  const res = http.get('https://web-adriana-showroom.vercel.app/sign-in');

  check(res, {
    'status 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}

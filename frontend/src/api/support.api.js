import axios from 'axios';

const API_BASE = import.meta.env.VITE_BASE_URL; // adjust to however you store your backend URL

export const sendUserChatMessage = async (message, rideId, token) => {
  const res = await axios.post(
    `${API_BASE}/support/chat`,
    { message, rideId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const sendCaptainChatMessage = async (message, rideId, token) => {
  const res = await axios.post(
    `${API_BASE}/support/captain-chat`,
    { message, rideId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
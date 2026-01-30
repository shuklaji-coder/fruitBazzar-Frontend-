import axios from 'axios';
import api from "../utils/api";

export async function fetchfruitDetails(id) {
  try {
    const res = await api.get(`/fruit/${id}`);
    return res.data;
  } catch (err) {
    // rethrow so caller can handle and show toast
    throw err;
  }
}

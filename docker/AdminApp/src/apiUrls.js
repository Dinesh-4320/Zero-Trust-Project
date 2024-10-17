const BASE_URL = "https://af67a1e979d104242a0121bc2f5415bb-bfcefccd6df36bbe.elb.us-east-1.amazonaws.com/backend";

export const API_URLS = {
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  PENDING_USERS: `${BASE_URL}/admin/pending-users`,
  UPDATE_ROLE: `${BASE_URL}/admin/update-role`,
  DELETE_USER: `${BASE_URL}/admin/delete-user`,
  GET_USERS: `${BASE_URL}/api/users`,
};
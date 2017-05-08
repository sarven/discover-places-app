const BASE_URL = 'http://discoverplaces-api.sarvendev.com/';
const API_URL = 'front/api/';
const MESSAGE_UPLOAD_URL = 'uploads/message/';
const COMMENT_UPLOAD_URL = 'uploads/comment/';

function createApiUrl(endpoint) {
  return BASE_URL + API_URL + endpoint;
}

export function getMessageUploadUrl(photo) {
  return BASE_URL + MESSAGE_UPLOAD_URL + photo;
}

export function getCommentUploadUrl(photo) {
  return BASE_URL + COMMENT_UPLOAD_URL + photo;
}

export function getMessages(lat, long) {
  return fetch(createApiUrl(`message/list/${lat}/${long}`), {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });
}

export function createMessage(message) {
  return fetch(createApiUrl('message'), {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({message: message})
  });
}

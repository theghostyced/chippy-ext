import { Storage } from '@plasmohq/storage';
import type { UserType } from './types';
import { API_URL } from './constants';

export const UserInfoKey = 'chippy_userInfo';
export const IdTokenKey = 'chippy_idToken';
export const MessageTokenKey = 'chippy_messageToken';

const storage = new Storage();

export async function saveIdToken(token: string) {
  return storage.set(IdTokenKey, token);
}

export async function getIdToken(): Promise<string | null> {
  return storage.get(IdTokenKey);
}

export async function saveMessageToken(token: string) {
  return storage.set(MessageTokenKey, token);
}

export async function getMessageToken(): Promise<string | null> {
  return storage.get(MessageTokenKey);
}

export async function getTemporaryToken(): Promise<string> {
  const url = `${API_URL}/auth/token`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { token } = await response.json();
  return token;
}

export async function getUserInfo(): Promise<UserType> {
  const url = `${API_URL}/user`;
  let idToken = await getIdToken();
  // If we don't have an id token, generate a temp token
  if (!idToken) {
    idToken = await getTemporaryToken();
    await saveIdToken(idToken);
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${idToken}`,
    },
  });
  const userType: UserType = await response.json();
  await saveMessageToken(userType.messagesToken);
  return userType;
}

export async function logout() {
  await storage.remove(IdTokenKey);
}

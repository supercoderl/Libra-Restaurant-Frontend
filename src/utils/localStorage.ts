import { Employee } from "@/type/Employee"

export const keys = {
  KEY_TOKEN: 'token',
  KEY_CURRENT_USER: 'current_user',
  KEY_REFRESH_TOKEN: 'refresh_token'
}

export function set(key: string, data: string) {
  localStorage.setItem(key, data)
}

export function get(key: string): string | null {
  return localStorage.getItem(key)
}

export function remove(key: string) {
  return localStorage.removeItem(key);
}

export function clear() {
  return localStorage.clear();
}

export function getUser(): Employee | undefined {
  const userString = localStorage.getItem(keys.KEY_CURRENT_USER)
  if (userString) {
    return JSON.parse(userString)
  }
  return undefined
}

export function setUser(user: Employee) {
  localStorage.setItem(keys.KEY_CURRENT_USER, JSON.stringify(user))
}

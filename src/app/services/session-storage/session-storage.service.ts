import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {
  constructor() {}

  saveData(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getData(key: string) {
    return sessionStorage.getItem(key);
  }

  removeData(key: string) {
    sessionStorage.removeItem(key);
  }

  clearData() {
    sessionStorage.clear();
  }
}

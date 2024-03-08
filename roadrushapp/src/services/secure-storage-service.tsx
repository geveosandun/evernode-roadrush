import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

export default class AppSecureStorageService {
  static async setItem(key: string, value: any) {
    await RNSecureStorage.setItem(key, JSON.stringify(value), {
      accessible: ACCESSIBLE.ALWAYS,
    });
  }

  static async updateItem(key: string, value: any) {
    await AppSecureStorageService.setItem(key, value);
  }

  static async getItem(key: string) {
    let value = await RNSecureStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  static async removeItem(key: string) {
    await RNSecureStorage.removeItem(key);
  }

  static async removeAllItems() {
    await RNSecureStorage.clear();
  }
}

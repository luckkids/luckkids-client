import LuckKidsStorage from './storage.app';
import Storage from './storage.base';

/**
 * 하나의 아이템 (배열이 아닌) 을 관리하는 Storage
 */
class SafeStorage<T> extends Storage {
  public getItem(): T | null {
    try {
      const raw = LuckKidsStorage.getString(this.key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public setItem(item: T): T | null {
    try {
      LuckKidsStorage.set(this.key, JSON.stringify(item));
      return item;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async removeItem(): Promise<void> {
    LuckKidsStorage.delete(this.key);
  }
}

export default SafeStorage;

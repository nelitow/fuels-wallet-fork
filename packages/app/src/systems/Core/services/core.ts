import { db } from '../utils/database';
import { Storage } from '../utils/storage';

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class CoreService {
  static async clear() {
    await db.clear();
    await Storage.clear();
  }
}

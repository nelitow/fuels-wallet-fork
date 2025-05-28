// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import { EventEmitter } from 'events';
import { LocalStorage } from '@nelitow-fuel/local-storage';

const emitter = new EventEmitter();
export const Storage = new LocalStorage('fuel_', emitter);

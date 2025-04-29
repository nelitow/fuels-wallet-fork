import { useIsPreviewEnv } from './useIsPreviewEnv';

export function useExtensionTitle() {
  const isPreview = useIsPreviewEnv();

  return isPreview ? 'Jason Wallet Development' : 'Jason Wallet';
}

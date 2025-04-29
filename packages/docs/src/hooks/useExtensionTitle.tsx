import { useIsPreviewEnv } from './useIsPreviewEnv';

export function useExtensionTitle() {
  const isPreview = useIsPreviewEnv();

  return isPreview ? 'Bacon Wallet Development' : 'Bacon Wallet';
}

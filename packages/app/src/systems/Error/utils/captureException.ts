import type { SentryExtraErrorData } from '@nelitow-fuel/types';
import * as Sentry from '@sentry/react';

export function captureException(error: Error, extra: SentryExtraErrorData) {
  Sentry.captureException(error, {
    extra,
    tags: { manual: true },
  });
}

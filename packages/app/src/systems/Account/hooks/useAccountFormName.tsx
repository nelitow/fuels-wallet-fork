import type { Account } from '@nelitow-fuel/types';
import { useMemo } from 'react';
import * as yup from 'yup';

export function useAccountFormName(accounts: Account[]) {
  return useMemo(() => {
    const names = (accounts || []).map((account) => account.name);

    return yup
      .string()
      .trim()
      .notOneOf(names, 'Name is already in use')
      .required('Name is required');
  }, [accounts]);
}

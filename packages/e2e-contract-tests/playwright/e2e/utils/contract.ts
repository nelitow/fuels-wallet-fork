import type { FuelWalletTestHelper } from '@nelitow-fuel/playwright-utils';
import {
  expect,
  getButtonByText,
  getByAriaLabel,
  hasText,
} from '@nelitow-fuel/playwright-utils';
import type { Page } from '@playwright/test';

export const connect = async (
  page: Page,
  fuelWalletTestHelper: FuelWalletTestHelper,
  walletName = 'Jason Wallet Development'
) => {
  const connectButton = getButtonByText(page, 'Connect');
  await connectButton.click();
  await getByAriaLabel(page, `Connect to ${walletName}`, true).click();
  await fuelWalletTestHelper.walletConnect();

  await expect
    .poll(
      () =>
        hasText(page, 'Status: Connected')
          .then(() => true)
          .catch(() => false),
      { timeout: 15000 }
    )
    .toBeTruthy();
  await page.waitForTimeout(3000);
};

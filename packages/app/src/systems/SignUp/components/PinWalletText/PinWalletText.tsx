import { cssObj } from '@fuel-ui/css';
import { Box, Image, Text } from '@fuel-ui/react';

export function PinWalletText() {
  return (
    <Box.Stack css={styles.root}>
      <Text>Click the extension button in the browser menu.</Text>
      <Image src="/pin-img1.svg?url" />
      <Text>Find Jason Wallet in the list and click the pin icon.</Text>
      <Image src="/pin-img2.svg?url" />
    </Box.Stack>
  );
}

const styles = {
  root: cssObj({
    '.fuel_Text': {
      color: '$intentsBase8',
    },
    '.fuel_Text:last-of-type': {
      mt: '$4',
    },
  }),
};

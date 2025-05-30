import type { ThemeUtilsCSS } from '@fuel-ui/css';
import { cssObj } from '@fuel-ui/css';
import { Box, Copyable, Text, Tooltip } from '@fuel-ui/react';
import { bn } from 'fuels';
import { isValidEthAddress, shortAddress } from '~/systems/Core';

export type EthAddressProps = {
  address: string;
  css?: ThemeUtilsCSS;
};

export const EthAddress = ({ address, css }: EthAddressProps) => {
  const isValidAddress = isValidEthAddress(address);
  const ethAddress = isValidAddress ? bn(address).toHex(20) : '';

  return (
    <Box.Flex align="center" gap="$0" css={styles.root}>
      <Copyable value={ethAddress} css={styles.copyable} aria-label={address}>
        <Text className="address" css={css}>
          {shortAddress(ethAddress)}
        </Text>
      </Copyable>
    </Box.Flex>
  );
};

const styles = {
  root: cssObj({
    '.address_tooltip': cssObj({
      fontSize: '$sm',
      lineHeight: '$4',
      maxWidth: 125,
      textAlign: 'center',
      wordWrap: 'break-word',
    }),
    '.address': {
      userSelect: 'none',
    },
  }),
  copyable: cssObj({
    // to make sure we're using same text format, we just hide the copy icon but still use Copyable.
    '&[data-invalid-address="true"]': {
      '.fuel_copyable-icon': {
        display: 'none',
      },
    },
  }),
};

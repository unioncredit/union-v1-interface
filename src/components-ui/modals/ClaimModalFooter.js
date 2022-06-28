import { Box, Label, Button } from "@unioncredit/ui";
import { formatUnits } from "@ethersproject/units";

import format from "util/formatValue";
import useToken from "hooks/useToken";
import useTokenBalance from "hooks/data/useTokenBalance";
import { ZERO } from "constants/variables";
import { UnwrapButton } from "components-ui";
import { Union } from "components-ui/Union";
import { withUnsupportedChains } from "providers/UnsupportedChain";
import useIsSupportedFeature from "hooks/useIsSupportedFeature";

const ClaimUnWrapped = withUnsupportedChains(
  function () {
    const WRAPPED_UNION = useToken("WRAPPED_UNION");
    const supportedFeature = useIsSupportedFeature();

    const { data: wrappedUnionBalance = ZERO } = useTokenBalance(WRAPPED_UNION);

    if (!supportedFeature) return null;

    return (
      <Box align="center">
        <Box direction="vertical" fluid>
          <div>
            <Union value={format(formatUnits(wrappedUnionBalance), 2)} />
          </div>
          <Label m={0}>arbUnion to unwrap</Label>
        </Box>
        <UnwrapButton
          variant="pill"
          label="Unwrap"
          disabled={wrappedUnionBalance.lte(0)}
        />
      </Box>
    );
  },
  [421611, 42161]
);

const ClaimBridge = withUnsupportedChains(
  function () {
    const UNION = useToken("UNION");
    const supportedFeature = useIsSupportedFeature();

    const { data: balance = ZERO } = useTokenBalance(UNION);

    if (!supportedFeature) return null;

    return (
      <Box align="center">
        <Box direction="vertical" fluid>
          <div>
            <Union value={format(formatUnits(balance), 2)} />
          </div>
          <Label m={0}>arbUnion in wallet</Label>
        </Box>
        <Button
          as="a"
          label="Bridge"
          variant="pill"
          target="_blank"
          href="https://bridge.arbitrum.io/"
        />
      </Box>
    );
  },
  [1, 42, 4]
);

export function ClaimModalFooter() {
  return (
    <>
      <ClaimUnWrapped />
      <ClaimBridge />
    </>
  );
}

import {
  Text,
  Grid,
  Row,
  Col,
  Box,
  Button,
  Heading,
  Label,
  Skeleton,
  Card,
} from "@unioncredit/ui";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { defaultAbiCoder } from "@ethersproject/abi";
import { ReactComponent as ArrowRight } from "@unioncredit/ui/lib/icons/arrowRight.svg";

import {
  VotingCard,
  View,
  AddressLabel,
  ProposalHistoryCard,
} from "components-ui";
import useChainId from "hooks/useChainId";
import createArray from "util/createArray";
import getEtherscanLink from "util/getEtherscanLink";
import { options, switchChain } from "util/switchChain";
import useProposalData from "hooks/governance/useProposalData";
import { withUnsupportedChains } from "providers/UnsupportedChain";

import styles from "./proposal.module.css";

function ProposalView() {
  const chainId = useChainId();
  const { chainId: actualChainId, library } = useWeb3React();

  const { hash: proposalHash } = useParams();

  const data = useProposalData(proposalHash);

  const unsupportedFeature = actualChainId && actualChainId !== chainId;

  const {
    proposer,
    hash,
    description = "-",
    actionItems = "-",
    abstract = "-",
    title = "-",
    targets = [],
    signatures = [],
    calldatas = [],
  } = !!data && data;

  const isLoading = !data;

  const handleSwitchChain = () => {
    switchChain(options[0], library.provider);
  };

  return (
    <View>
      <Grid>
        <Row>
          <Col>
            <Box mb="30px">
              <Link to="/governance/proposals">
                <Button
                  variant="lite"
                  label={
                    <>
                      <ArrowRight className="flip" width="24px" height="24px" />
                      Back to proposals
                    </>
                  }
                />
              </Link>
            </Box>
          </Col>
        </Row>
        <Row>
          <Col md={8} className={styles.contentCol}>
            {isLoading ? (
              <Skeleton height={20} width={280} mb="16px" shimmer />
            ) : (
              <Heading size="xlarge" mb="12px" grey={800}>
                {title}
              </Heading>
            )}
            {isLoading ? (
              <>
                <Skeleton height={16} width={220} shimmer mb="8px" />
                <Skeleton height={16} width={220} shimmer mb="8px" />
              </>
            ) : (
              <>
                <Label as="p" size="small" grey={400}>
                  PROPOSED BY
                </Label>
                {proposer ? <AddressLabel address={proposer} /> : "-"}
              </>
            )}
            <Box direction="vertical" mt="36px">
              <Heading level={3}>Action Items</Heading>
              {isLoading
                ? createArray(3).map((_, i) => (
                    <Skeleton
                      key={i}
                      height={16}
                      width={320}
                      shimmer
                      mb="8px"
                    />
                  ))
                : targets.map((target, i) => {
                    const signature = signatures[i];
                    const calldata = calldatas[i];

                    const args = signature
                      .match(/\((.*?)\)/)?.[0]
                      .replace("(", "")
                      .replace(")", "")
                      .split(",");

                    const decoded =
                      args &&
                      calldata &&
                      defaultAbiCoder.decode(args, calldata);
                    const argumentString =
                      decoded &&
                      decoded.map((item) => item.toString()).join(",");
                    // const numbers = [1, 2, 3, 4, 5];
                    // const listItems = numbers.map((number) =>
                    //   <li key={{'Contract': target}}>
                    //     {argumentString}
                    //   </li>
                    // );
                    // return (
                    //   <ul>
                    //     {listItems}
                    //   </ul>
                    // );
                    // return (
                    //   <li key={1}>
                    //     {}
                    //   </li>
                    // );
                    return (
                      <Fragment key={`${target}${signature}${calldata}`}>
                        <Label
                          as="a"
                          w="100%"
                          m={0}
                          grey={800}
                          href={getEtherscanLink(chainId, target, "ADDRESS")}
                          target="_blank"
                          rel="noreferrer"
                          style={{ wordWrap: "break-word" }}
                        >
                        Contract: {target},
                        </Label>
                        <Label
                          as="p"
                          w="100%"
                          style={{ wordWrap: "break-word" }}
                        >
                          Function: {signature.replace(/(\(=?)(.*)$/, "")}(
                          {argumentString})
                        </Label>
                      </Fragment>
                    );
                  })}
            </Box>

            <Box mt="0px">
              <a
                href={getEtherscanLink(chainId, hash, "TRANSACTION")}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="pill" label="View bytecode" />
              </a>
            </Box>
            <Box direction="vertical" mt="36px">
              <Heading level={3}>Abstract</Heading>
              {isLoading ? (
                createArray(3).map((_, i) => (
                  <Skeleton key={i} height={16} width={320} shimmer mb="8px" />
                ))
              ) : (
                <ReactMarkdown
                  renderers={{
                    link: (props) => (
                      <Link to={props.href}>
                        <Text as="a" {...props} color="blue600" />
                      </Link>
                    ),
                    heading: (props) => (
                      <Text
                        size="large"
                        grey={800}
                        {...props}
                        mb="8px"
                        mt="24px"
                      />
                    )
                  }}
                >
                  {abstract}
                </ReactMarkdown>
              )}
            </Box>
            <Box direction="vertical" mt="24px">
              <Heading level={3}>Description</Heading>
              {isLoading ? (
                createArray(3).map((_, i) => (
                  <Skeleton key={i} height={16} width={320} shimmer mb="8px" />
                ))
              ) : (
                <ReactMarkdown
                  renderers={{
                    link: (props) => (
                      <Link to={props.href}>
                        <Text as="a" {...props} color="blue600" />
                      </Link>
                    ),
                    heading: (props) => (
                      <Text
                        size="large"
                        grey={800}
                        {...props}
                        mb="8px"
                        mt="12px"
                      />
                    ),
                    paragraph: (props) => <Text {...props} mb="8px" />,
                    listItem: (props) => <Text as="li" {...props} />,
                  }}
                >
                  {description}
                </ReactMarkdown>
              )}
            </Box>
          </Col>
          <Col md={4}>
            <VotingCard {...data} />
            {unsupportedFeature && (
              <Card variant="blue" packed mb="12px">
                <Label as="p" my="12px" align="center" size="small">
                  Voting only supported on Ethereum
                </Label>
                <Button
                  fluid
                  packed
                  mb="12px"
                  onClick={handleSwitchChain}
                  label="Switch Network to Ethereum"
                />
              </Card>
            )}
            <ProposalHistoryCard {...data} />
          </Col>
        </Row>
      </Grid>
    </View>
    
  );
}

export default withUnsupportedChains(ProposalView, [421611, 42161]);

import Button from "@components/button";
import { getTestToken } from "@lib/contracts/getTestToken";
import useCurrentToken from "@hooks/useCurrentToken";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";

export default function Faucet() {
    const { library, chainId } = useWeb3React();

    const curToken = useCurrentToken();

    const onGetToken = async () => {
        try {
            await getTestToken(curToken, 10000, library.getSigner(), chainId);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="mt-10">
            <Head>
                <title>Faucet | Union</title>
            </Head>

            <Button invert onClick={onGetToken}>
                Give me 10000 test token
            </Button>
        </div>
    );
}

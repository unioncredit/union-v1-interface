import utf8 from 'utf8';

export const hexToUtf8 = function(hex: string) {
    // if (!isHexStrict(hex))
    //     throw new Error('The parameter "'+ hex +'" must be a valid HEX string.');

    let str = "";
    let code = 0;
    hex = hex.replace(/^0x/i,'');

    // remove 00 padding from either side
    hex = hex.replace(/^(?:00)*/,'');
    hex = hex.split("").reverse().join("");
    hex = hex.replace(/^(?:00)*/,'');
    hex = hex.split("").reverse().join("");

    let l = hex.length;

    for (let i=0; i < l; i+=2) {
        code = parseInt(hex.substr(i, 2), 16);
        // if (code !== 0) {
        str += String.fromCharCode(code);
        // }
    }

    return utf8.decode(str);
};

const randomId = () => Math.floor(Math.random() * 10000000000);

export const send = (provider: any, method: string, params?: any[]) => new Promise<any>((resolve, reject) => {
  const payload = {
    id: randomId(),
    method,
    params,
  };
  const callback = (err: any, result: any) => {
    if (err) {
      reject(err);
    } else if (result.error) {
      console.error(result.error);
      reject(result.error);
    } else {
      resolve(result.result);
    }
  };

  let _provider = provider.provider || provider

  if (_provider.sendAsync) {
    _provider.sendAsync(payload, callback);
  } else {
    _provider.send(payload, callback).catch((error: any) => {
      if (
        error.message ===
        "Hardhat Network doesn't support JSON-RPC params sent as an object"
      ) {
        _provider
          .send(method, params)
          .then((r: any) => resolve(r))
          .catch((e: any) => reject(e));
      } else {
        throw error;
      }
    });
  }
});

export interface RSV {
  r: string;
  s: string;
  v: number;
}

export const signData = async (provider: any, fromAddress: string, typeData: any): Promise<RSV> => {
  const typeDataString = typeof typeData === 'string' ? typeData : JSON.stringify(typeData);
  console.log('signing', fromAddress, typeDataString)
  const result = await send(provider, 'eth_signTypedData_v4', [fromAddress, typeDataString])
    .catch((error: any) => {
      if (error.message === 'Method eth_signTypedData_v4 not supported.') {
        return send(provider, 'eth_signTypedData', [fromAddress, typeData]);
      } else {
        throw error;
      }
    });

  return {
    r: result.slice(0, 66),
    s: '0x' + result.slice(66, 130),
    v: parseInt(result.slice(130, 132), 16),
  };
};

let chainIdOverride: null | number = null;
export const setChainIdOverride = (id: number) => { chainIdOverride = id };
export const getChainId = async (provider: any): Promise<any> => chainIdOverride || send(provider, 'eth_chainId');

export const call = (provider: any, to: string, data: string) => send(provider, 'eth_call', [{
  to,
  data,
}, 'latest']);

const MAX_INT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

interface DaiPermitMessage {
  holder: string;
  spender: string;
  nonce: number;
  expiry: number | string;
  allowed?: boolean;
}

interface ERC2612PermitMessage {
  owner: string;
  spender: string;
  value: number | string;
  nonce: number | string;
  deadline: number | string;
}

interface Domain {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
}

const EIP712Domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

const createTypedDaiData = (message: DaiPermitMessage, domain: Domain) => {
  const typedData = {
    types: {
      EIP712Domain,
      Permit: [
        { name: "holder", type: "address" },
        { name: "spender", type: "address" },
        { name: "nonce", type: "uint256" },
        { name: "expiry", type: "uint256" },
        { name: "allowed", type: "bool" },
      ],
    },
    primaryType: "Permit",
    domain,
    message,
  };

  return typedData;
};

const createTypedERC2612Data = (message: ERC2612PermitMessage, domain: Domain) => {
  const typedData = {
    types: {
      EIP712Domain,
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    },
    primaryType: "Permit",
    domain,
    message,
  };

  return typedData;
};

const NONCES_FN = '0x7ecebe00';
const NAME_FN = '0x06fdde03';

const zeros = (numZeros: number) => ''.padEnd(numZeros, '0');

const getTokenName = async (provider: any, address: string) =>
  hexToUtf8((await call(provider, address, NAME_FN)).substr(130));


const getDomain = async (provider: any, token: string | Domain): Promise<Domain> => {
  if (typeof token !== 'string') {
    return token as Domain;
  }

  const tokenAddress = token as string;

  const [name, chainId] = await Promise.all([
    getTokenName(provider, tokenAddress),
    getChainId(provider),
  ]);

  const domain: Domain = { name, version: '1', chainId, verifyingContract: tokenAddress };
  return domain;
};

export const signDaiPermit = async (
  provider: any,
  token: string | Domain,
  holder: string,
  spender: string,
  expiry?: number,
  nonce?: number,
): Promise<DaiPermitMessage & RSV> => {
  const tokenAddress = (token as Domain).verifyingContract || token as string;

  const message: DaiPermitMessage = {
    holder,
    spender,
    nonce: nonce || await call(provider, tokenAddress, `${NONCES_FN}${zeros(24)}${holder.substr(2)}`),
    expiry: expiry || MAX_INT,
    allowed: true,
  };

  const domain = await getDomain(provider, token);
  const typedData = createTypedDaiData(message, domain);
  const sig = await signData(provider, holder, typedData);

  return { ...sig, ...message };
};

export const signERC2612Permit = async (
  provider: any,
  token: string | Domain,
  owner: string,
  spender: string,
  value: string | number = MAX_INT,
  deadline?: number,
  nonce?: number,
): Promise<ERC2612PermitMessage & RSV> => {
  const tokenAddress = (token as Domain).verifyingContract || token as string;

  const message: ERC2612PermitMessage = {
    owner,
    spender,
    value,
    nonce: nonce || await call(provider, tokenAddress, `${NONCES_FN}${zeros(24)}${owner.substr(2)}`),
    deadline: deadline || MAX_INT,
  };

  const domain = await getDomain(provider, token);
  const typedData = createTypedERC2612Data(message, domain);
  const sig = await signData(provider, owner, typedData);

  return { ...sig, ...message };
};

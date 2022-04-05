import web3
from web3.middleware import geth_poa_middleware
import json
import requests


def get_metadata(token_id):
    f = open('../artifacts/contracts/HHNFT_flat.sol/HHNFT.json')

    hhnft_abi = json.load(f)
    w3 = web3.Web3(web3.HTTPProvider('https://speedy-nodes-nyc.moralis.io/fb1841515bcc2b1e0aed0509/eth/rinkeby'))
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)
    address = w3.toChecksumAddress('0xebb9ab99daa8fd90b00bcef0e95275e86db8b499')
    hhnft = w3.eth.contract(address=address, abi=hhnft_abi['abi'])
    token_uri = hhnft.functions.tokenURI(token_id).call()

    response = requests.get(f"https://ipfs.io/ipfs/{token_uri.split('ipfs://').pop()}")
    metadata = response.json()

    print(metadata)
    return metadata


if __name__ == '__main__':
    get_metadata(0)

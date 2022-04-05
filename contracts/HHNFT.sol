// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HHNFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter public totalSupply;
    string baseUri;
    mapping(uint256 => string) private _uris;

    constructor() ERC721("HHNFT", "HNFT") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = totalSupply.current();
        totalSupply.increment();
        setTokenURI(tokenId, uri);
        _safeMint(to, tokenId);
    }

    function setTokenURI(uint256 _id, string memory _uri) public onlyOwner {
        _uris[_id] = string(abi.encodePacked(_uri, ".json"));
    }
}

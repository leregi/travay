const address = '0xd61f9331ce61eb27e0ab7d9b9bc75402ea5db7f8';
const ABI = [
  {
    constant: false,
    inputs: [
      {
        name: '_number',
        type: 'uint256'
      }
    ],
    name: 'bet',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'houseEdge',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: '_houseEdge',
        type: 'uint256'
      }
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: '_status',
        type: 'bool'
      },
      {
        indexed: false,
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'Won',
    type: 'event'
  }
];

export { address, ABI };

[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "creditLimit",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "ALERADY_REGISTERED",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NOT_AUTHORISED_BY_OWNER",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NOT_OWNER",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NOT_REGISTERED",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "accessCreditInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "creditScore",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "creditLimit",
              "type": "uint256"
            },
            {
              "internalType": "enum CreditInfo.Type",
              "name": "_type",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "creditInquiry",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "IsPresent",
              "type": "bool"
            }
          ],
          "internalType": "struct CreditInfo.Info",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "accessCreditInfo_Owner",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "creditScore",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "creditLimit",
              "type": "uint256"
            },
            {
              "internalType": "enum CreditInfo.Type",
              "name": "_type",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "creditInquiry",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "IsPresent",
              "type": "bool"
            }
          ],
          "internalType": "struct CreditInfo.Info",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_typeIndex",
          "type": "uint256"
        }
      ],
      "name": "addCreditInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "authoriseUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "calculateCreditScore",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isAuthorised",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "paymentHistory",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_typeIndex",
          "type": "uint256"
        }
      ],
      "name": "updateCreditInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_creditScore",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_creditLimit",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_typeIndex",
          "type": "uint256"
        }
      ],
      "name": "updateCreditInfo_Owner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_paymentHistory",
          "type": "uint256"
        }
      ],
      "name": "updatePaymentHistory",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
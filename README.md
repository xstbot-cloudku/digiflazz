# Digiflazz SDK

Unofficial Digiflazz API SDK - Simple and easy-to-use wrapper for Digiflazz PPOB API.

[![npm version](https://img.shields.io/npm/v/@xstbot/digiflazz.svg)](https://www.npmjs.com/package/@xstbot/digiflazz)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- ✅ Easy-to-use API wrapper
- ✅ Full TypeScript support (coming soon)
- ✅ Promise-based (async/await)
- ✅ Comprehensive error handling
- ✅ Support for all Digiflazz endpoints:
  - Balance checking
  - Deposit management
  - Price list (Prepaid & Postpaid)
  - Transactions (Top-up)
  - Transaction status
  - Postpaid bill inquiry
  - Postpaid bill payment

## Installation

```bash
npm install @xstbot/digiflazz
```

or using yarn:

```bash
yarn add @xstbot/digiflazz
```

## Requirements

- Node.js >= 16

## Quick Start

```javascript
const Digiflazz = require('@xstbot/digiflazz');

// Initialize the client
const client = new Digiflazz('your-username', 'your-api-key');

// Check your balance
async function checkBalance() {
  try {
    const balance = await client.saldo();
    console.log('Your balance:', balance);
  } catch (error) {
    console.error('Error:', error);
  }
}

checkBalance();
```

## API Documentation

### Initialization

```javascript
const Digiflazz = require('@xstbot/digiflazz');

const client = new Digiflazz(username, apiKey, options);
```

**Parameters:**
- `username` (string, required): Your Digiflazz username
- `apiKey` (string, required): Your Digiflazz API key
- `options` (object, optional):
  - `baseURL` (string): Custom API base URL (default: `https://api.digiflazz.com`)

### Methods

#### 1. Check Balance

Get your current account balance.

```javascript
await client.saldo();
```

**Returns:** Promise with balance information

**Example:**
```javascript
const balance = await client.saldo();
console.log(balance);
// Response example:
// {
//   data: {
//     deposit: 1000000,
//     ...
//   }
// }
```

---

#### 2. Deposit

Request a deposit to your account.

```javascript
await client.deposit(amount, bank, ownerName);
```

**Parameters:**
- `amount` (number, required): Deposit amount
- `bank` (string, optional): Bank name (default: 'BCA')
- `ownerName` (string, optional): Account owner name (default: 'XSTBOT')

**Returns:** Promise with deposit information

**Example:**
```javascript
const deposit = await client.deposit(100000, 'BCA', 'John Doe');
console.log(deposit);
```

---

#### 3. Price List - Prepaid

Get price list for prepaid products.

```javascript
await client.pricelistPrepaid(options);
```

**Parameters:**
- `options` (object, optional): Additional query parameters

**Returns:** Promise with prepaid price list

**Example:**
```javascript
const priceList = await client.pricelistPrepaid();
console.log(priceList.data);

// Filter by specific product
const filteredList = await client.pricelistPrepaid({
  filter_type: 'pulsa'
});
```

---

#### 4. Price List - Postpaid

Get price list for postpaid products.

```javascript
await client.pricelistPasca(options);
```

**Parameters:**
- `options` (object, optional): Additional query parameters

**Returns:** Promise with postpaid price list

**Example:**
```javascript
const priceList = await client.pricelistPasca();
console.log(priceList.data);
```

---

#### 5. Top-up / Transaction

Perform a top-up transaction.

```javascript
await client.topup(buyerSkuCode, customerNo, refId, options);
```

**Parameters:**
- `buyerSkuCode` (string, required): Product SKU code
- `customerNo` (string, required): Customer number (phone number, meter number, etc.)
- `refId` (string, required): Unique reference ID for this transaction
- `options` (object, optional): Additional parameters (e.g., testing mode)

**Returns:** Promise with transaction result

**Example:**
```javascript
// Top-up pulsa
const transaction = await client.topup(
  'pulsa-telkomsel-10000',
  '081234567890',
  'TRX-' + Date.now()
);
console.log(transaction);

// With additional options
const transaction = await client.topup(
  'pulsa-telkomsel-10000',
  '081234567890',
  'TRX-' + Date.now(),
  { testing: true }
);
```

---

#### 6. Check Transaction Status

Check the status of a transaction.

```javascript
await client.status(buyerSkuCode, customerNo, refId);
```

**Parameters:**
- `buyerSkuCode` (string, required): Product SKU code
- `customerNo` (string, required): Customer number
- `refId` (string, required): Transaction reference ID

**Returns:** Promise with transaction status

**Example:**
```javascript
const status = await client.status(
  'pulsa-telkomsel-10000',
  '081234567890',
  'TRX-1234567890'
);
console.log(status);
```

---

#### 7. Check Postpaid Bill

Inquire postpaid bill (PLN, PDAM, etc.).

```javascript
await client.cekTagihan(buyerSkuCode, customerNo, refId, options);
```

**Parameters:**
- `buyerSkuCode` (string, required): Product SKU code
- `customerNo` (string, required): Customer number (meter number, customer ID, etc.)
- `refId` (string, required): Unique reference ID
- `options` (object, optional): Additional parameters

**Returns:** Promise with bill information

**Example:**
```javascript
const bill = await client.cekTagihan(
  'plnpasca',
  '123456789012',
  'INQ-' + Date.now()
);
console.log(bill);
// Response will include bill amount, admin fee, etc.
```

---

#### 8. Pay Postpaid Bill

Pay postpaid bill.

```javascript
await client.bayarTagihan(buyerSkuCode, customerNo, refId, options);
```

**Parameters:**
- `buyerSkuCode` (string, required): Product SKU code
- `customerNo` (string, required): Customer number
- `refId` (string, required): Unique reference ID
- `options` (object, optional): Additional parameters

**Returns:** Promise with payment result

**Example:**
```javascript
const payment = await client.bayarTagihan(
  'plnpasca',
  '123456789012',
  'PAY-' + Date.now()
);
console.log(payment);
```

## Complete Usage Examples

### Example 1: Check Balance and Top-up

```javascript
const Digiflazz = require('@xstbot/digiflazz');

const client = new Digiflazz(
  process.env.DIGIFLAZZ_USERNAME,
  process.env.DIGIFLAZZ_API_KEY
);

async function topupPulsa() {
  try {
    // Check balance first
    const balance = await client.saldo();
    console.log('Current balance:', balance.data.deposit);

    // Perform top-up
    const refId = 'TRX-' + Date.now();
    const transaction = await client.topup(
      'pulsa-telkomsel-10000',
      '081234567890',
      refId
    );

    console.log('Transaction successful:', transaction);

    // Check transaction status
    const status = await client.status(
      'pulsa-telkomsel-10000',
      '081234567890',
      refId
    );
    console.log('Transaction status:', status);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

topupPulsa();
```

### Example 2: Pay Electric Bill (PLN Postpaid)

```javascript
async function payElectricBill(meterNumber) {
  try {
    const refId = 'PLN-' + Date.now();

    // Step 1: Check bill
    console.log('Checking bill...');
    const inquiry = await client.cekTagihan(
      'plnpasca',
      meterNumber,
      refId
    );

    console.log('Bill information:', inquiry);

    // Step 2: If bill exists, proceed with payment
    if (inquiry.data && inquiry.data.rc === '00') {
      const paymentRefId = 'PAY-' + Date.now();
      
      console.log('Processing payment...');
      const payment = await client.bayarTagihan(
        'plnpasca',
        meterNumber,
        paymentRefId
      );

      console.log('Payment successful:', payment);
      return payment;
    } else {
      console.log('No bill found or error occurred');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

payElectricBill('123456789012');
```

### Example 3: Get and Filter Price List

```javascript
async function getPriceList() {
  try {
    // Get all prepaid products
    const prepaid = await client.pricelistPrepaid();
    console.log('Total prepaid products:', prepaid.data.length);

    // Filter Telkomsel products only
    const telkomselProducts = prepaid.data.filter(product => 
      product.brand.toLowerCase().includes('telkomsel')
    );

    console.log('Telkomsel products:');
    telkomselProducts.forEach(product => {
      console.log(`${product.product_name}: Rp ${product.price}`);
    });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

getPriceList();
```

## Error Handling

Always wrap your API calls in try-catch blocks:

```javascript
async function safeTransaction() {
  try {
    const result = await client.topup(
      'pulsa-telkomsel-10000',
      '081234567890',
      'TRX-' + Date.now()
    );
    
    // Check response code
    if (result.data && result.data.rc === '00') {
      console.log('Transaction successful!');
    } else {
      console.log('Transaction failed:', result.data.message);
    }
    
  } catch (error) {
    // Network error or other issues
    console.error('Error occurred:', error.message);
  }
}
```

## Best Practices

1. **Use Environment Variables** for credentials:
   ```javascript
   const client = new Digiflazz(
     process.env.DIGIFLAZZ_USERNAME,
     process.env.DIGIFLAZZ_API_KEY
   );
   ```

2. **Always use unique Reference IDs**:
   ```javascript
   const refId = 'TRX-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
   ```

3. **Check balance before transactions**:
   ```javascript
   const balance = await client.saldo();
   if (balance.data.deposit < requiredAmount) {
     throw new Error('Insufficient balance');
   }
   ```

4. **Verify transaction status** after completion:
   ```javascript
   await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds
   const status = await client.status(sku, customerNo, refId);
   ```

5. **Implement retry logic** for critical transactions:
   ```javascript
   async function retryTransaction(maxRetries = 3) {
     for (let i = 0; i < maxRetries; i++) {
       try {
         return await client.topup(sku, customerNo, refId);
       } catch (error) {
         if (i === maxRetries - 1) throw error;
         await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
       }
     }
   }
   ```

## Response Structure

All API calls return a response in the following format:

```javascript
{
  data: {
    rc: '00',           // Response code ('00' = success)
    message: 'Success', // Response message
    // ... other data specific to the endpoint
  }
}
```

Common response codes:
- `00`: Success
- `01`: Invalid credentials
- `02`: Insufficient balance
- `03`: Product not found
- `04`: Transaction failed
- ... (refer to Digiflazz documentation for complete list)

## Testing

You can use the testing mode by passing `testing: true` in options:

```javascript
const transaction = await client.topup(
  'pulsa-telkomsel-10000',
  '081234567890',
  'TRX-TEST-' + Date.now(),
  { testing: true }
);
```

## Troubleshooting

### Connection Issues

If you're experiencing connection issues:

```javascript
const client = new Digiflazz(username, apiKey, {
  baseURL: 'https://api.digiflazz.com' // Make sure the URL is correct
});
```

### Invalid Signature

If you get "Invalid signature" errors:
- Verify your username and API key are correct
- Ensure there are no extra spaces in credentials
- Check that you're using the production credentials (not development)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Disclaimer

This is an unofficial SDK and is not affiliated with or endorsed by Digiflazz. Use at your own risk.

## Support

For issues related to this SDK, please open an issue on the repository.

For Digiflazz API issues, please contact Digiflazz support at https://t.me/xstbot_npm

## Links

- [Homepage](https://github.com/xstbot-cloudku/digiflazz)
- [Repository](https://github.com/xstbot-cloudku/digiflazz.git)
- [Bug Reports](https://t.me/xstbot_npm)

---

Made with ❤️ by XSTBOT

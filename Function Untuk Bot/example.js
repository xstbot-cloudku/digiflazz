// ==========================================
// DIGIFLAZZ EVAL COMMANDS - READY TO USE
// ==========================================

// ==========================================
// COMMAND 1: CEK SALDO
// ==========================================
(async () => {
    require("./setting.js");
    const DigiflazzService = require('./digiflazz');
    global.digiflazz = new DigiflazzService(global.username, global.apikey);

    let result = await digiflazz.cekSaldo();
    if (result.success) {
        await reply(`💰 *Saldo Digiflazz*\n\n${result.data.formatted}\nRaw: ${result.data.deposit}`);
    } else {
        await reply(`❌ Error: ${result.error}`);
    }
})();

// ==========================================
// COMMAND 2: TOPUP PULSA
// ==========================================
(async () => {
    require("./setting.js");
    const DigiflazzService = require('./digiflazz');
    global.digiflazz = new DigiflazzService(global.username, global.apikey);

    let sku = "mlcek"; // Ganti dengan SKU produk
    let nomor = "08123456789"; // Ganti dengan nomor tujuan
    let result = await digiflazz.topup(sku, nomor);

    if (result.success) {
        let pesan = `✅ *Transaksi Prabayar*\n\n`;
        pesan += `Ref ID: ${result.data.refId}\n`;
        pesan += `SKU: ${result.data.sku}\n`;
        pesan += `Nomor: ${result.data.customerNo}\n`;
        pesan += `Status: ${result.data.status}\n`;
        pesan += `RC: ${result.data.rc}\n`;
        pesan += `Harga: Rp ${result.data.price.toLocaleString('id-ID')}\n`;
        pesan += `SN: ${result.data.sn}\n`;
        pesan += `\n_${result.data.message}_`;
        await reply(pesan);
    } else {
        await reply(`❌ Error: ${result.error}`);
    }
})();

// ==========================================
// COMMAND 3: CEK STATUS PRABAYAR
// ==========================================
(async () => {
    require("./setting.js");
    const DigiflazzService = require('./digiflazz');
    global.digiflazz = new DigiflazzService(global.username, global.apikey);

    let sku = "mlcek";
    let nomor = "105012723013199";
    let refId = "TRX1773282361498583";
    let result = await digiflazz.statusPrabayar(sku, nomor, refId);

    if (result.success) {
        let pesan = `📊 *Status Prabayar*\n\n`;
        pesan += `Ref ID: ${result.data.refId}\n`;
        pesan += `SKU: ${result.data.sku}\n`;
        pesan += `Nomor: ${result.data.customerNo}\n`;
        pesan += `Status: ${result.data.status}\n`;
        pesan += `SN: ${result.data.sn}\n`;
        pesan += `\n_${result.data.message}_`;
        await reply(pesan);
    } else {
        await reply(`❌ Error: ${result.error}`);
    }
})();

// ==========================================
// COMMAND 4: CEK TAGIHAN PLN
// ==========================================
(async () => {
    require("./setting.js");
    const DigiflazzService = require('./digiflazz');
    global.digiflazz = new DigiflazzService(global.username, global.apikey);

    let sku = "pln";
    let nomor = "530000000001";
    let result = await digiflazz.cekTagihan(sku, nomor);

    if (result.success) {
        let pesan = `📄 *Info Tagihan*\n\n`;
        pesan += `Pelanggan: ${result.data.customerName}\n`;
        pesan += `Nomor: ${result.data.customerNo}\n`;
        pesan += `SKU: ${result.data.sku}\n`;
        pesan += `Periode: ${result.data.periode}\n`;
        pesan += `Admin: ${result.data.formatted.admin}\n`;
        pesan += `Total: ${result.data.formatted.total}\n`;
        pesan += `\n_Ref ID: ${result.data.refId}_`;
        await reply(pesan);
    } else {
        await reply(`❌ Error: ${result.error}`);
    }
})();

// ==========================================
// COMMAND 5: BAYAR TAGIHAN PLN
// ==========================================
(async () => {
    require("./setting.js");
    const DigiflazzService = require('./digiflazz');
    global.digiflazz = new DigiflazzService(global.username, global.apikey);

    let sku = "pln";
    let nomor = "530000000001";
    let refId = "INQ123456"; // Dari hasil cek tagihan
    let result = await digiflazz.bayarTagihan(sku, nomor, refId);

    if (result.success) {
        let pesan = `✅ *Pembayaran Sukses*\n\n`;
        pesan += `Pelanggan: ${result.data.customerName}\n`;
        pesan += `Ref ID: ${result.data.refId}\n`;
        pesan += `Status: ${result.data.status}\n`;
        pesan += `RC: ${result.data.rc}\n`;
        pesan += `Harga: ${result.data.formatted.price}\n`;
        pesan += `SN: ${result.data.sn}\n`;
        pesan += `\n_${result.data.message}_`;
        await reply(pesan);
    } else {
        await reply(`❌ Error: ${result.error}`);
    }
})();

// ==========================================
// COMMAND 6: CEK STATUS PASCABAYAR
// ==========================================
(async () => {
    require("./setting.js");
    const DigiflazzService = require('./digiflazz');
    global.digiflazz = new DigiflazzService(global.username, global.apikey);

    let sku = "pln";
    let nomor = "530000000001";
    let refId = "INQ123456";
    let result = await digiflazz.statusPascabayar(sku, nomor, refId);

    if (result.success) {
        let pesan = `📊 *Status Pascabayar*\n\n`;
        pesan += `Pelanggan: ${result.data.customerName}\n`;
        pesan += `Ref ID: ${result.data.refId}\n`;
        pesan += `Status: ${result.data.status}\n`;
        pesan += `RC: ${result.data.rc}\n`;
        pesan += `SN: ${result.data.sn}\n`;
        pesan += `\n_${result.data.message}_`;
        await reply(pesan);
    } else {
        await reply(`❌ Error: ${result.error}`);
    }
})();

// ==========================================
// COMMAND 7: REQUEST DEPOSIT
// ==========================================
(async () => {
    require("./setting.js");
    const DigiflazzService = require('./digiflazz');
    global.digiflazz = new DigiflazzService(global.username, global.apikey);

    let amount = 1000000;
    let bank = "BCA";
    let ownerName = "John Doe";
    let result = await digiflazz.deposit(amount, bank, ownerName);

    if (result.success) {
        let pesan = `💳 *Request Deposit*\n\n`;
        pesan += `Bank: ${result.data.bank}\n`;
        pesan += `Metode: ${result.data.paymentMethod}\n`;
        pesan += `No. Rekening: ${result.data.accountNo}\n`;
        pesan += `Nominal: Rp ${Number(result.data.amount).toLocaleString('id-ID')}\n`;
        pesan += `Notes: ${result.data.notes}\n`;
        pesan += `\n_${result.message}_`;
        await reply(pesan);
    } else {
        await reply(`❌ Error: ${result.error}`);
    }
})();

// ==========================================
// COMMAND 8: PRICELIST PRABAYAR (SEMUA)
// ==========================================
(async () => {
    require("./setting.js");
    const DigiflazzService = require('./digiflazz');
    global.digiflazz = new DigiflazzService(global.username, global.apikey);

    let result = await digiflazz.pricelistPrepaid();

    if (result.success) {
        let pesan = `📋 *Pricelist Prabayar*\n\n`;
        pesan += `Total: ${result.total} produk\n\n`;
        
        // Tampilkan 10 produk pertama
        result.data.slice(0, 10).forEach((p, i) => {
            pesan += `${i + 1}. ${p.productName}\n`;
            pesan += `   SKU: ${p.sku}\n`;
            pesan += `   Harga: ${p.priceFormatted}\n`;
            pesan += `   Status: ${p.isActive ? '✅' : '❌'}\n\n`;
        });
        
        await reply(pesan);
    } else {
        await reply(`❌ Error: ${result.error}`);
    }
})();

// ==========================================
// COMMAND 9: PRICELIST PRABAYAR (FILTER TELKOMSEL)
// ==========================================
(async () => {
    require("./setting.js");
    const DigiflazzService = require('./digiflazz');
    global.digiflazz = new DigiflazzService(global.username, global.apikey);

    let result = await digiflazz.pricelistPrepaid();

    if (result.success) {
        // Filter hanya produk Telkomsel yang aktif
        let pulsa = result.data.filter(p => 
            p.brand === 'TELKOMSEL' && 
            p.category === 'Pulsa' && 
            p.isActive
        );
        
        let pesan = `📱 *Pulsa Telkomsel*\n\n`;
        pesan += `Total: ${pulsa.length} produk\n\n`;
        
        pulsa.forEach((p, i) => {
            pesan += `${i + 1}. ${p.productName}\n`;
            pesan += `   SKU: ${p.sku}\n`;
            pesan += `   Harga: ${p.priceFormatted}\n\n`;
        });
        
        await reply(pesan);
    } else {
        await reply(`❌ Error: ${result.error}`);
    }
})();

// ==========================================
// COMMAND 10: PRICELIST PASCABAYAR (SEMUA)
// ==========================================
(async () => {
    require("./setting.js");
    const DigiflazzService = require('./digiflazz');
    global.digiflazz = new DigiflazzService(global.username, global.apikey);

    let result = await digiflazz.pricelistPascabayar();

    if (result.success) {
        let pesan = `📋 *Pricelist Pascabayar*\n\n`;
        pesan += `Total: ${result.total} produk\n\n`;
        
        // Tampilkan 10 produk pertama
        result.data.slice(0, 10).forEach((p, i) => {
            pesan += `${i + 1}. ${p.productName} (${p.brand})\n`;
            pesan += `   SKU: ${p.sku}\n`;
            pesan += `   Admin: ${p.formatted.admin}\n`;
            pesan += `   Komisi: ${p.formatted.commission}\n`;
            pesan += `   Status: ${p.isActive ? '✅' : '❌'}\n\n`;
        });
        
        await reply(pesan);
    } else {
        await reply(`❌ Error: ${result.error}`);
    }
})();

// ==========================================
// COMMAND 11: PRICELIST PASCABAYAR (FILTER PLN)
// ==========================================
(async () => {
    require("./setting.js");
    const DigiflazzService = require('./digiflazz');
    global.digiflazz = new DigiflazzService(global.username, global.apikey);

    let result = await digiflazz.pricelistPascabayar();

    if (result.success) {
        // Filter hanya produk PLN yang aktif
        let pln = result.data.filter(p => 
            p.brand === 'PLN' && 
            p.isActive
        );
        
        let pesan = `⚡ *Tagihan PLN*\n\n`;
        pesan += `Total: ${pln.length} produk\n\n`;
        
        pln.forEach((p, i) => {
            pesan += `${i + 1}. ${p.productName}\n`;
            pesan += `   SKU: ${p.sku}\n`;
            pesan += `   Admin: ${p.formatted.admin}\n`;
            pesan += `   Komisi: ${p.formatted.commission}\n\n`;
        });
        
        await reply(pesan);
    } else {
        await reply(`❌ Error: ${result.error}`);
    }
})();

// ==========================================
// COMMAND 12: CEK & BAYAR TAGIHAN (COMBO)
// ==========================================
(async () => {
    require("./setting.js");
    const DigiflazzService = require('./digiflazz');
    global.digiflazz = new DigiflazzService(global.username, global.apikey);

    let sku = "pln";
    let nomor = "530000000001";

    // Step 1: Cek tagihan
    let cek = await digiflazz.cekTagihan(sku, nomor);

    if (!cek.success) {
        return await reply(`❌ Gagal cek tagihan: ${cek.error}`);
    }

    let pesan = `📄 *Info Tagihan*\n\n`;
    pesan += `Pelanggan: ${cek.data.customerName}\n`;
    pesan += `Periode: ${cek.data.periode}\n`;
    pesan += `Total: ${cek.data.formatted.total}\n\n`;
    await reply(pesan + '_Memproses pembayaran..._');

    // Step 2: Bayar tagihan
    let bayar = await digiflazz.bayarTagihan(sku, nomor, cek.data.refId);

    if (bayar.success) {
        let pesanBayar = `✅ *Pembayaran Sukses*\n\n`;
        pesanBayar += `Pelanggan: ${bayar.data.customerName}\n`;
        pesanBayar += `Status: ${bayar.data.status}\n`;
        pesanBayar += `SN: ${bayar.data.sn}\n`;
        pesanBayar += `Harga: ${bayar.data.formatted.price}`;
        await reply(pesanBayar);
    } else {
        await reply(`❌ Gagal bayar: ${bayar.error}`);
    }
})();

// ==========================================
// COMMAND 13: SEARCH PRODUK BY KEYWORD
// ==========================================
(async () => {
    require("./setting.js");
    const DigiflazzService = require('./digiflazz');
    global.digiflazz = new DigiflazzService(global.username, global.apikey);

    let keyword = "TELKOMSEL"; // Kata kunci pencarian
    let result = await digiflazz.pricelistPrepaid();

    if (result.success) {
        let produk = result.data.filter(p => 
            p.productName.toLowerCase().includes(keyword.toLowerCase()) ||
            p.sku.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (produk.length === 0) {
            return await reply(`❌ Tidak ada produk dengan keyword "${keyword}"`);
        }
        
        let pesan = `🔍 *Hasil Pencarian: ${keyword}*\n\n`;
        pesan += `Ditemukan: ${produk.length} produk\n\n`;
        
        produk.slice(0, 15).forEach((p, i) => {
            pesan += `${i + 1}. ${p.productName}\n`;
            pesan += `   SKU: ${p.sku}\n`;
            pesan += `   Harga: ${p.priceFormatted}\n`;
            pesan += `   Status: ${p.isActive ? '✅' : '❌'}\n\n`;
        });
        
        await reply(pesan);
    } else {
        await reply(`❌ Error: ${result.error}`);
    }
})();

// ==========================================
// COMMAND 14: GET PRODUK BY SKU
// ==========================================
(async () => {
    require("./setting.js");
    const DigiflazzService = require('./digiflazz');
    global.digiflazz = new DigiflazzService(global.username, global.apikey);

    let targetSku = "mlcek"; // SKU yang dicari
    let result = await digiflazz.pricelistPrepaid();

    if (result.success) {
        let produk = result.data.find(p => p.sku === targetSku);
        
        if (!produk) {
            return await reply(`❌ Produk dengan SKU "${targetSku}" tidak ditemukan`);
        }
        
        let pesan = `📦 *Detail Produk*\n\n`;
        pesan += `Nama: ${produk.productName}\n`;
        pesan += `SKU: ${produk.sku}\n`;
        pesan += `Brand: ${produk.brand}\n`;
        pesan += `Kategori: ${produk.category}\n`;
        pesan += `Harga: ${produk.priceFormatted}\n`;
        pesan += `Status: ${produk.isActive ? '✅ Aktif' : '❌ Nonaktif'}`;
        
        await reply(pesan);
    } else {
        await reply(`❌ Error: ${result.error}`);
    }
})();

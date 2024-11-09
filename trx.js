const { TronWeb } = require('tronweb');

const scam_address = ''; //Адрес с которого выводим
const real_private_key = '';//Адрес приватного ключа в private key 
const send_to = ''; //Адрес на который выводим

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

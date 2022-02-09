let globalNs;
let home;
let fileNameToCopyAndRun;

export function myPrint(toPrint) {
    globalNs.tprint(toPrint);
}

/** @param {NS} ns **/
export async function main(ns) {
    globalNs = ns;
    home = "home";
    fileNameToCopyAndRun = 'hackHome.js';
    let nbServerToBuy = 25;

    myPrint(globalNs);
    myPrint(home);

    let myMoney = ns.getServerMoneyAvailable(home);
    myPrint(myMoney);

    for (let i = 0; i < nbServerToBuy; i++) {
        let serverNameToBuy = '1to-' + i;
        myPrint('serveur Name to buy : ' + serverNameToBuy);

        ns.purchaseServer(serverNameToBuy, 1024);
        await ns.scp(fileNameToCopyAndRun, home, serverNameToBuy);
        ns.exec(fileNameToCopyAndRun, serverNameToBuy, 330, home);

        myPrint('BUY COPY and RUN OK');
    }
    
    myPrint('All serveur BUY !!!');
    
    // purchaseServer(hostname, ram);
    // run(script, numThreads, args);

// purchaseServeurHackAndRunIt.js: 
// {"gang":{},"bladeburner":{},"codingcontract":{},"sleeve":{},"corporation":{},"stanek":{},
// "ui":{},"formulas":{"skills":{},"hacking":{},"hacknetNodes":{},"hacknetServers":{},
// "gang":{}},"stock":{},"args":["home"],"hacknet":{},"heart":{}}
// purchaseServeurHackAndRunIt.js: home
}

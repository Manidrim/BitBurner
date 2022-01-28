let globalNs;
let argsZero;
let alreadyHack;

export function myPrint(toPrint) {
    globalNs.tprint(toPrint);
}

/** @param {NS} ns **/
export async function main(ns) {

    globalNs = ns;
    argsZero = ns.args[0];
    alreadyHack = [];

    myPrint('The START on ' + argsZero);

    let hostName = globalNs.getHostname();
    let scans = globalNs.scan();
    myPrint(hostName);
    myPrint(scans);

    await scanTarget(argsZero);
}

export async function scanTarget(targetStart) {
    let scans = globalNs.scan(targetStart);
    myPrint("IN scan target");
    myPrint(scans);

    for (let i = 0; i < scans.length; i++) {
        let target = scans[i];
        myPrint("Target -> " + target);
        if (target === "home" || target === "darkweb") {
            myPrint("Continues !");
            continue;
        }

        var moneyThresh = globalNs.getServerMaxMoney(target) * 0.75;
        var securityThresh = globalNs.getServerMinSecurityLevel(target) + 5;
        
        globalNs.brutessh(target);
        globalNs.ftpcrack(target)
        globalNs.relaysmtp(target);   

        globalNs.nuke(target);
        if (globalNs.getServerSecurityLevel(target) > securityThresh) {
            myPrint('weaken');
            await globalNs.weaken(target);
        } else if (globalNs.getServerMoneyAvailable(target) < moneyThresh) {
            myPrint('grow');
            await globalNs.grow(target);
        } else {
            myPrint('hack');
            await globalNs.hack(target);
        }

        if (find(target, alreadyHack) == false) {
            myPrint('NOT found ' + target + ' scan and add !');
            addInArray(target, alreadyHack);
            await scanTarget(target, alreadyHack);
        } else {
            myPrint('I found ' + target + ', NO add !');
        }
        myPrint('alreadyHack');
        myPrint(alreadyHack);
    }
    myPrint("END scan target");
}

export function addInArray(add) {
    alreadyHack[alreadyHack.length] = add;
    myPrint('Add to table :');
    myPrint(alreadyHack);
}

export function find(toFind) {
    for (let i = 0; i < alreadyHack.length; i++) {
        if (alreadyHack[i] == toFind) {
            return true;
        }
    }

    return false;
}

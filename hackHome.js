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
        if (globalNs.fileExists("BruteSSH.exe", "home")) {
            globalNs.brutessh(target);
        }
        if (globalNs.fileExists("FTPCrack.exe", "home")) {
            globalNs.ftpcrack(target);
        }
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

        if (!alreadyHack.find(target)) {
            myPrint('not found scan and add !')
            await scanTarget(target);
            alreadyHack.push(target);
        }
    }
    myPrint("END scan target");
}

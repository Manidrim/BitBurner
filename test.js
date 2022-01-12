export async function main(ns) {
	myPrint(ns, 'START ma super fonction');
	let hostName = ns.getHostname();
	let scan = ns.scan();

	myPrint(ns, hostName);
	myPrint(ns, scan);

	while(true) {
		for(let i = 0; i < scan.length; i++) {
			let serverToHack = scan[i];
			myPrint(ns, serverToHack);
			await myHack(ns, serverToHack);
		}

		let hackingLevel = ns.getHackingLevel();
		myPrint(ns, hackingLevel);

		myPrint(ns, 'END ma super fonction');
	}
}

export function myPrint(ns, toPrint) {
	// ns.tprint(toPrint);
}

export async function myHack(ns, serveur) {
	var target = serveur;
    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    var securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    if (ns.fileExists("BruteSSH.exe", "home")) {
        ns.brutessh(target);
    }
    ns.nuke(target);
    if (ns.getServerSecurityLevel(target) > securityThresh) {
		myPrint(ns, 'weaken');
        await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
		myPrint(ns, 'grow');
        await ns.grow(target);
    } else {
		myPrint(ns, 'hack');
        await ns.hack(target);
		ns.run('Nuke.exe');
    }
}

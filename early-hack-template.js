// import * as namespace from "script filename"; //Import all functions from script
// import {fn1, fn2, ...} from "script filename"; //Import specific functions from script

import * as fileName from "fileName.js";

let globalNs;
let argsZero;


export function myPrint(toPrint) {
	globalNs.tprint(toPrint);
}

export async function main(ns) {
	
	globalNs = ns;
    argsZero = ns.args[0];
	
	myPrint('The START on ' + argsZero);
	let earlyHackFileName = fileName.getEarlyHackFileName();
	let hackFileName = fileName.getHackFileName();

	myPrint('The START on ' + argsZero);
	myPrint('The START on ' + argsZero);
	
	let hostName = globalNs.getHostname();
	let scans = globalNs.scan();
	let isFileExist = false;


    this.toPrint
	myPrint(hostName);
	myPrint(scans);

	for(let i = 0; i < scans.length; i++) {
		let serverToHack = scans[i];
		myPrint(serverToHack);
		isFileExist = globalNs.fileExists(hackFileName, serverToHack);
		if (isFileExist) {
			myPrint('File exist -> ' + hackFileName);
			continue;
		}

		myPrint('File doesn\'t exist -> ' + hackFileName);
		let securityLevel = globalNs.getServerSecurityLevel(serverToHack);
		myPrint('securityLevel : ' + securityLevel);
		
		// scp();
		

/*
		if (ns.fileExists("BruteSSH.exe", "home")) {
			ns.brutessh(serverToHack);
		}
		if (ns.fileExists("FTPCrack.exe", "home")) {
			ns.brutessh(serverToHack);
		}
*/
		
/*
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
*/
	}
	

	myPrint('The END on ' + argsZero);
}

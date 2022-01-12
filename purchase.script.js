function myMoney() {
    return getServerMoneyAvailable("home");
}

function isAllSameThanFirst() {
    var nodeStats = hacknet.getNodeStats(0);
    var level = nodeStats.level;
    var ram = nodeStats.ram;
    var cores = nodeStats.cores;

    for (var i = 1; i < cnt; i++) {
        var nodeStatsOthers = hacknet.getNodeStats(i);
        var levelOther = nodeStatsOthers.level;
        var ramOther = nodeStatsOthers.ram;
        var coresOther = nodeStatsOthers.cores;
        if (level != levelOther || ram != ramOther || cores != coresOther) {
            return false;
        }
    }
    return true;
}

function mySleep()
{
    sleep(10000);
}

function upgrade() {
    for (var i = 0; i < cnt; i++) {
        while (hacknet.getNodeStats(i).level < level) {
            var cost = hacknet.getLevelUpgradeCost(i, 1);
            while (myMoney() < cost) {
                print("Lvl Need $" + cost + " . Have $" + myMoney());
                mySleep();
            }
            res = hacknet.upgradeLevel(i, 1);
        };
        while (hacknet.getNodeStats(i).ram < ram) {
            var cost = hacknet.getRamUpgradeCost(i, 1);
            while (myMoney() < cost) {
                print("RAM Need $" + cost + " . Have $" + myMoney());
                mySleep();
            }
            res = hacknet.upgradeRam(i, 1);
        };
        while (hacknet.getNodeStats(i).cores < cores) {
            var cost = hacknet.getCoreUpgradeCost(i, 1);
            while (myMoney() < cost) {
                print("CORE Need $" + cost + " . Have $" + myMoney());
                mySleep();
            }
            res = hacknet.upgradeCore(i, 1);
        };
    };
}

disableLog("getServerMoneyAvailable");
disableLog("sleep");

var cnt = 10;
var level = 150;
var ram = 32;
var cores = 8;
while (true) {
    var cnt = hacknet.numNodes();
    var level = hacknet.getNodeStats(0).level;
    var ram = hacknet.getNodeStats(0).ram;
    var cores = hacknet.getNodeStats(0).cores;
    var levelCost = hacknet.getLevelUpgradeCost(0, 1);
    var tenLevelCost = hacknet.getLevelUpgradeCost(0, 10);
    var ramCost = hacknet.getRamUpgradeCost(0, 1);
    var coresCost = hacknet.getCoreUpgradeCost(0, 1)
    var hacknetCost = hacknet.getPurchaseNodeCost();

    if (isAllSameThanFirst()) {
        if (hacknetCost < tenLevelCost) {
            cnt++;
            while (hacknet.numNodes() < cnt) {
                res = hacknet.purchaseNode();
                print("Purchased hacknet Node with index " + res);
            };
        } else {
            if (tenLevelCost < coresCost) {
                level = level + 10;
            }
            if (ramCost < coresCost && ram < 64) {
                ram = ram * 2;
            } else if (coresCost < hacknetCost) {
                cores++;
            }
        }
    }

    print("init cnt : " + cnt);
    print("init level : " + level);
    print("init ram : " + ram);
    print("init cores : " + cores);

    upgrade();

    print("All nodes upgraded to level " + level);
    print("All nodes upgraded to " + ram + "GB RAM");
    print("All nodes upgraded to " + cores + " cores");
}

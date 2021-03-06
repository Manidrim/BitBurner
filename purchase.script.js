function myMoney() {
    return getServerMoneyAvailable("home");
}

function isAllSameThanFirst() {
    var cnt = hacknet.numNodes();
    var nodeStats = hacknet.getNodeStats(0);
    var level = nodeStats.level;
    var ram = nodeStats.ram;
    var cores = nodeStats.cores;

    for (var i = 1; i < cnt - 1; i++) {
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
    var cnt = hacknet.numNodes();
    for (var i = 0; i < cnt; i++) {
        while (hacknet.getNodeStats(i).level < level) {
            var cost = hacknet.getLevelUpgradeCost(i, 1);
            while (myMoney() < cost) {
                print("Lvl Need $" + cost + " . Have $" + myMoney());
                sleepTimeToCost(cost);
            }
            res = hacknet.upgradeLevel(i, 1);
        };
        while (hacknet.getNodeStats(i).ram < ram) {
            var cost = hacknet.getRamUpgradeCost(i, 1);
            while (myMoney() < cost) {
                print("RAM Need $" + cost + " . Have $" + myMoney());
                sleepTimeToCost(cost);
            }
            res = hacknet.upgradeRam(i, 1);
        };
        while (hacknet.getNodeStats(i).cores < cores) {
            var cost = hacknet.getCoreUpgradeCost(i, 1);
            while (myMoney() < cost) {
                print("CORE Need $" + cost + " . Have $" + myMoney());
                sleepTimeToCost(cost);
            }
            res = hacknet.upgradeCore(i, 1);
        };
    };
}

function sleepTimeToCost(cost)
{
    var money = myMoney();
    sleep(1000);
    var moneyPlusOneSecond = myMoney();
    hacknetLastTOCost = cost - moneyPlusOneSecond;

    var moneyPerSeconde = moneyPlusOneSecond - money;
    var timeSleep = hacknetLastTOCost / moneyPerSeconde * 1000;
    print("Money per second: " + moneyPerSeconde);
    print("Time before purchase : " + timeSleep);
    sleep(timeSleep);
}

disableLog("getServerMoneyAvailable");
disableLog("sleep");

if (hacknet.numNodes() == 0) {
    hacknet.purchaseNode();
    hacknet.purchaseNode();
}

var cnt = 2;
var level = 10;
var ram = 1;
var cores = 1;
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
        if ((hacknetCost < coresCost * 5 && hacknetCost < tenLevelCost) || cores == 16) {
            cnt++;
            while (hacknet.numNodes() < cnt) {
                res = hacknet.purchaseNode();
                print("Purchased hacknet Node with index " + res);
                // TODO faire une fonction qui calcule le temps de sleep + 1s
                sleepTimeToCost(hacknetCost)
            };
        } else {
            if (tenLevelCost < coresCost && level < 200) {
                level = level + 10;
                if (level > 200) {
                    level = 200;
                }
            }
            if (ramCost < coresCost && ram < 64) {
                ram = ram * 2;
            } else if (coresCost < hacknetCost && cores < 16) {
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

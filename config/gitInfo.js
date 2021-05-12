const getRepoInfo = require('git-repo-info');
const gitInfo = getRepoInfo();
const os = require('os');
const getLocalHost = () => {
    const netWork = os.networkInterfaces();
    const IPS = {
        IPV4: [],
        IPV6: [],
        localhost: '',
        publicNet: ''
    };
    Object.keys(netWork).forEach(itemIPName => {
        netWork[itemIPName].forEach(item => {
            if (item.family === 'IPv4') {
                IPS.IPV4.push(item);
            } else if (item.family === 'IPv6') {
                IPS.IPV6.push(item);
            }
        });
    });
    IPS.IPV4.forEach(item => {
        if (/^127/g.test(item.address)) {
            IPS.localhost = item.address;
        }
        if (/^(10|192)/g.test(item.address)) {
            IPS.publicNet = item.address;
        }
    });
    return {
        localhost: IPS.localhost,
        publicNet: IPS.publicNet,
        port: 2020
    };
};

const shellInfo = {
    run: `You application is running here http://${getLocalHost().publicNet}:${getLocalHost().port}`,
    branch: `当前分支是:${gitInfo.branch}`,
    committer: `提交人:${gitInfo.committer}`,
    committerDate: `提交日期:${gitInfo.committerDate}`,
    commitMessage: `提交信息:${gitInfo.commitMessage}`,
    commonGitDir: `项目目录:${gitInfo.commonGitDir}`
};

const info = () => {
    let result = [];
    Object.keys(shellInfo).forEach(i => {
        result.push(shellInfo[i]);
    });
    return result;
};
module.exports = {
    info,
    getLocalHost
};

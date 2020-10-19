const path = require('path');
const semver = require('semver');
const runSync = require('../../utils/runSync');

class CRARunner {
    constructor(generatorInst, generatorRootPath, ) {
        this.generatorInst = generatorInst;
        this.spawn = generatorInst.spawnCommandSync.bind(generatorInst);
        this.generatorRootPath = generatorRootPath;
        this.craPath = this._getCRAPath();
        this._checkCRAVersion();
    }

    run(projectName, options) {
        runSync(this.spawn, this.craPath, [
            projectName,
            ...this._getCraArgsFromOptions(options)
        ]);
    }

    _getCraArgsFromOptions(options) {
        const args = [];

        if (options.template) {
            args.push('--template', options.template);
        }

        if (options.useNpm) {
            args.push('--use-npm');
        }

        return args;
    }

    _getCRAPath() {
        return require.resolve('create-react-app');
    }

    _checkCRAVersion() {
        const craPkg = require(path.resolve(path.dirname(this.craPath), 'package.json'));
        const generatorPkg = require(path.resolve(this.generatorRootPath, 'package.json'));

        const requiredV = generatorPkg.dependencies['create-react-app'];

        if (!semver.satisfies(craPkg.version, requiredV)) {
            throw new Error(`"create-react-app" must match ${requiredV} version, got ${craPkg.version}`);
        }
    }
}

module.exports = CRARunner;

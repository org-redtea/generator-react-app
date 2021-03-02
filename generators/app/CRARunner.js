const path = require('path');
const semver = require('semver');
const runSync = require('../../utils/runSync');

class CRARunner {
    constructor(generatorInst) {
        this.spawn = generatorInst.spawnCommandSync.bind(generatorInst);
    }

    run(projectName, options) {
        const manager = options.useNPM ?
          'npx'
          : 'yarn';

        this._checkBinary(manager);

        if (manager === 'npx') {
            runSync(this.spawn, 'npx', [
                'create-react-app@4.0.x',
                projectName,
                ...this._getCraArgsFromOptions(options)
            ]);
        } else if (manager === 'yarn') {
            const {stdout} = runSync(this.spawn, 'yarn', [
                'info',
                '--json',
                'create-react-app'
            ], {stdio: 'pipe'});

            const info = JSON.parse(stdout);
            const latestVersion = info.data['dist-tags'].latest;

            if (!semver.satisfies(latestVersion, '4.0.x')) {
                throw new Error(`The generator does not support yarn of version ${latestVersion}`);
            }

            runSync(this.spawn, 'yarn', [
                'create',
                'react-app',
                projectName,
                ...this._getCraArgsFromOptions(options)
            ]);
        }
    }

    _getCraArgsFromOptions(options) {
        const args = [];

        if (options.template) {
            args.push('--template', options.template);
        }

        if (options.useNPM) {
            args.push('--use-npm');
        }

        return args;
    }

    _checkBinary(name) {
        try {
            runSync(this.spawn, name, [
                '--version'
            ]);
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new Error(`${name} does not exists. Install it first.`)
            }

            throw error;
        }
    }
}

module.exports = CRARunner;

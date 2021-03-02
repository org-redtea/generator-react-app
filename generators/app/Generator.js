const path = require('path');
const pkg = require('../../package.json');
const YoGenerator = require('yeoman-generator');
const CRARunner = require('./CRARunner');


class Generator extends YoGenerator {
    constructor(args, opts) {
        super(args, opts);
        this.generatorRootPath = path.resolve(__dirname, '../../');
        this.craRunner = new CRARunner(this, this.generatorRootPath);
        // Список пакетов, устанавливаемых дополнительно
        this.dependencies = [
            'axios@0.19.1',
            '@types/classnames@2.2.9',
            'classnames@2.2.6',
            'history@4.10.1',
            'inversify@5.0.1',
            'reflect-metadata@0.1.13',
            '@redtea/react-inversify@1.0.1',
            'react-router-dom@5.1.2',
            '@types/react-router-dom@5.1.3',
            'mobx@5.15.2',
            'mobx-react@6.1.5'
        ];
        this.devDependencies = [];
        this.argument('projectName', {
            description: 'Project name',
            type: String,
            require: true
        });
        this.option('use-npm', {
            description: 'Tell create-react-app use npm',
            type: Boolean,
            default: false
        });
        this.projectName = this.options.projectName;
        this.useNPM = this.options['use-npm'];
        this.staticServer = 'nodejs';
    }

    async prompting() {
        const q = [
            {
                type: 'list',
                name: 'staticServer',
                message: 'What engine to use as app static server?',
                choices: [
                    {name: 'NodeJS', value: 'nodejs'},
                    {name: 'Nginx', value: 'nginx'}
                ],
                default: this.staticServer
            }
        ];

        const answers = await this.prompt(q);

        this.staticServer = answers.staticServer;
    }

    configuring() {
        this.log('Run create-react-app...');
        this.craRunner.run(this.projectName, {
            template: 'cra-template-pwa-typescript',
            useNPM: this.useNPM
        });

        this.destinationRoot(this.destinationPath(this.projectName));
    }

    writing() {
        this.log('Overwriting template');
        // Don`t ask user to confirm overwriting files
        this.conflicter.force = true;

        const toDelete = [];

        this.fs.delete(toDelete);

        this.fs.copyTpl(
          this.templatePath('base'),
          this.destinationPath(),
          null,
          null,
          {
              globOptions: {
                  dot: true,
                  ignore: [
                      this.templatePath('base/tsconfig.json')
                  ]
              }
          }
        );

        this.fs.extendJSON(
          this.destinationPath('tsconfig.json'),
          this.fs.readJSON(
            this.templatePath('base/tsconfig.json')
          )
        );

        if (this.staticServer === 'nginx') {
            this.fs.delete([
                this.destinationPath('serve.json')
            ]);
            this.fs.copyTpl(
              this.templatePath('nginx-extension'),
              this.destinationPath(),
              null,
                null,
                { globOptions: { dot: true } }
            );
        }
    }

    install() {
        if (this.useNPM) {
            this.npmInstall(this.dependencies);
            this.npmInstall(this.devDependencies, { dev: true });
        } else {
            this.yarnInstall(this.dependencies);
            this.yarnInstall(this.devDependencies, { dev: true });
        }
    }

    end() {
        this.spawnCommandSync('git', ['add', '.']);
        this.spawnCommandSync('git', ['commit', '-m', 'Update template by ' + pkg.name + '@' + pkg.version ]);
    }
}

module.exports.Generator = Generator;

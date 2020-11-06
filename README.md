# Installing

Install yeoman

```bash
yarn global add yo
```

Install generator

```bash
yarn global add @redtea/generator-react-app
```

# Usage

Run generator

```bash
yo @redtea/react-app <project-name> --force
```

Go to project

```bash
cd <project-name>
yarn start
```

Print generator options
```bash
yo @redtea/react-app --help
```

# Features
 
 - Uses `create-react-app@4.0.0` with `cra-template-pwa-typescript` template
 - Choosing statics server engine:
    - NodeJS (serve)
    - Nginx
 - Preinstalled packages:
    - `axios@0.19.1`
    - `@types/classnames@2.2.9`
    - `classnames@2.2.6`
    - `history@4.10.1`
    - `inversify@5.0.1`
    - `reflect-metadata@0.1.13`
    - `@redtea/react-inversify@1.0.1`
    - `react-router-dom@5.1.2`
    - `@types/react-router-dom@5.1.3`
    - `mobx@5.15.2`
    - `mobx-react@6.1.5`
 - Components examples

import {Container} from 'inversify';

export const globalIOCContainer = new Container({
    defaultScope: 'Singleton',
    skipBaseClassChecks: true,
});

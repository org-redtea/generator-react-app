export const GLOBAL_IOC_TYPES = {
    browserHistory: Symbol.for('browserHistory'),
    states: {
        Example: Symbol.for('states.ExampleState'),
    },
    services: {
        SomeService: Symbol.for('services.SomeService')
    }
};

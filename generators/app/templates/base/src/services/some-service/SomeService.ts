import {injectable} from 'inversify';

@injectable()
export class SomeService {
    sayHello(): string {
        return 'Hello from SomeService!';
    }
}

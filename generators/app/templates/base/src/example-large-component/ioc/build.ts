import {Container} from "inversify";
import {globalIOCContainer} from "../../ioc/container";
import {State} from "../state/State";
import {LOCAL_IOC_TYPES} from "./iocTypes";

export function buildContainer() {
  const localContainer = new Container();

  localContainer.parent = globalIOCContainer;

  localContainer.bind<State>(LOCAL_IOC_TYPES.state).to(State);

  return localContainer;
}

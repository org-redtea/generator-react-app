import {buildContainer} from "./ioc";
import {View} from "./View";
import React from "react";
import {LOCAL_IOC_TYPES} from "./iocTypes";

export function LargeComponent(props: {}) {
  const container = buildContainer();

  return (
    <View
      state={container.get(LOCAL_IOC_TYPES.state)}
    />
  );
}

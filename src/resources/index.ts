import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName("./elements/scatter-plot"),
    PLATFORM.moduleName("./elements/bar-chart"),
    PLATFORM.moduleName("./elements/map")
  ]);
}

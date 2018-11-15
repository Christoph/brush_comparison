import { autoinject } from 'aurelia-dependency-injection';
import { connectTo, dispatchify  } from 'aurelia-store';
import { State } from 'store/state';

import { update } from 'store/actions/data';


@autoinject()
@connectTo()
export class App {
  public state: State;

  public plot_data = [[1,2],[2,3]]

  add() {
    dispatchify(update)([4,5]);
  }

  message = 'Hello World!';
}

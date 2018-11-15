import { autoinject } from 'aurelia-dependency-injection';
import { connectTo, dispatchify  } from 'aurelia-store';
import { State } from 'store/state';

import { update } from 'store/actions/data';


@autoinject()
@connectTo()
export class App {
  public state: State;

  add() {
    dispatchify(update)("asd");
  }

  message = 'Hello World!';
}

import { autoinject } from 'aurelia-dependency-injection';
import { DataStore } from 'data-store';

import { connectTo, dispatchify  } from 'aurelia-store';
import { State } from 'store/state';
import { selectProperty } from 'store/actions/data';


@autoinject()
@connectTo()
export class App {
  public state: State;
  public properties;
  public selected_property;

  constructor(public store: DataStore) {
    this.properties = this.store.getElectionFields()
    this.selected_property = this.properties[0]
    dispatchify(selectProperty)(this.selected_property);
  }

  PropertySelected() {
    dispatchify(selectProperty)(this.selected_property);
  }

  message = 'Hello World!';
}

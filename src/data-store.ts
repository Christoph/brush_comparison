import * as wahl from '../data/wahl.json';
import * as geojson from '../data/gemeinden_95_geo.json';
// import * as zoning from '../../../data/sf_geo.json';
// import * as zoning from '../../../data/zoning.json';
// import * as zoning from '../../../data/laender_95_geo.json';

export class DataStore{
  public data_election;
  public data_austria;
  
  constructor() {
    this.data_election = wahl["default"];
    this.data_austria = geojson["default"];
  }

  getElectionData(election="nrw2017") {
    return this.data_election[election];
  }

  getElectionFields(election="nrw2017") {
    return Object.keys(Object.values(this.data_election[election])[0]);
  }

  getGeoJson() {
    return this.data_austria;
  }
}

import * as wahl from '../data/wahl.json';
import * as geojson from '../data/gemeinden_95_geo.json';
// import * as zoning from '../../../data/sf_geo.json';
// import * as zoning from '../../../data/zoning.json';
// import * as zoning from '../../../data/laender_95_geo.json';
import * as d3 from "d3";

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

  getParties() {
    let parties = Object.keys(Object.values(this.data_election["nrw2017"])[0]);
    let values = Object.values(this.data_election["nrw2017"])
    let out = []

    for(const p of parties) {
      if(!["Wahlberechtigte", "abgegeben", "ungültig", "gültig"].includes(p)) {
        let total = d3.sum(values, function(d) {
          return +d[p]
        })

        out.push({
          "party": p,
          "total": total
        })
      }
    }

    return out
  }

  getElectionFields(election="nrw2017") {
    return Object.keys(Object.values(this.data_election[election])[0]);
  }

  getGeoJson() {
    return this.data_austria;
  }
}

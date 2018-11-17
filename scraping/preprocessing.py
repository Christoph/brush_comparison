import pandas as pd
import json


# Prepare election data
def prepare_election_data(election):
    wahl = pd.read_csv("../data/"+election+".csv", encoding="utf-8")
    wahl["gkz"] = wahl.apply(lambda x: x["GKZ"][1:], axis=1)
    wahl = wahl.drop(["GKZ"], axis=1)
    wahl.iloc[0][wahl.columns[0:-1]].to_dict()

    gkz_wahl = {row["gkz"]: row[wahl.columns[0:-1]].to_dict()
                for (index, row) in wahl.iterrows()}

    return gkz_wahl


# Save election data ready for D3
def save_election_data(wahlen=["nrw2017", "nrw2013", "nrw2008"]):
    output_wahl = {}

    for e in wahlen:
        output_wahl[e] = prepare_election_data(e)

    with open("../data/wahl.json", 'w') as fp:
        json.dump(output_wahl, fp)


# Save money data ready for D3
def save_money_data():
    # Load scraped data
    data = pd.read_csv("../data/STA_RA_data.csv").drop(["Unnamed: 0"], axis=1)

    # Create einnahmen_ausgaben json
    output_data = {}
    ausgaben_namen = data["haushaltskonto-hinweis-name"].unique().tolist()
    grouped = data.groupby("gkz")

    for gkz, group in grouped:
        element = {}
        rechnugngsliste = {}
        temp = []
        einnahmen_ausgaben = {}
        aggregation = {}
        for n in ausgaben_namen:
            aggregation[n] = 0

        for id, row in group.iterrows():
            temp.append(row)

            ausgaben_typ = row["haushaltskonto-hinweis-name"]
            aggregation[ausgaben_typ] = aggregation[ausgaben_typ] + float(
                row["soll-rj"].replace(",", "."))

        year = temp[0]["jahr"]
        rechnugngsliste[str(year)] = temp

        einnahmen_ausgaben[str(year)] = aggregation

        element["gkz"] = gkz
        element["rechnugngsliste"] = rechnugngsliste
        element["einnahmen_ausgaben"] = einnahmen_ausgaben

        output_data[str(gkz)] = element

    with open("../data/money.json", 'w') as fp:
        json.dump(output_data, fp)

save_money_data()

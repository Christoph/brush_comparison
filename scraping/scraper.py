import urllib3
import pandas as pd
import io
import certifi
import time

gkz_list = pd.read_csv("../data/gkz.csv", encoding="latin-1")["Gemeinde kennziffer"].tolist()
temp = pd.read_csv("../data/gkz.csv", encoding="latin-1")[["Gemeinde kennziffer", "Gemeindename"]]
gkz_name = {row["Gemeinde kennziffer"]: row["Gemeindename"] for (index, row) in temp.iterrows()}
wahl = pd.read_json("../data/wahl2017.json", encoding="utf-8").T.fillna(0).set_index("gebietsname")

http = urllib3.PoolManager(
    cert_reqs='CERT_REQUIRED',
    ca_certs=certifi.where())


def generate_url(gkz, year):
    return "https://www.offenerhaushalt.at/data/download/"+gkz+"_"+year+"_STA_RA"


def add(gkz, year):
    global data
    time.sleep(1)
    print(generate_url(gkz, year))
    try:
        r = http.request('GET', generate_url(gkz, year),
                         retries=2,
                         timeout=urllib3.Timeout(connect=3.0, read=10.0))
        c = pd.read_csv(io.StringIO(r.data.decode('utf-8')), sep=";")
        data = data.append(c)
    except:
        print("couldnt connect")
        missed.append(gkz)

# DO STUFF
data = pd.DataFrame()
missed = []
year = "2016"

for id in gkz_list:
    add(str(id), year)

pd.DataFrame(missed).to_csv("../data/STA_RA_missed"+year+".csv")
data.to_csv("../data/STA_RA"+year+".csv")

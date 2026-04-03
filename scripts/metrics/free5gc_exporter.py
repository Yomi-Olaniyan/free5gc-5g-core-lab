from pymongo import MongoClient
from prometheus_client import start_http_server, Gauge
import time

client = MongoClient('mongodb://localhost:27017/')
db = client['free5gc']

ue_connected = Gauge('free5gc_ue_connected_total', 'Total connected UEs')
ue_ambr_uplink = Gauge('free5gc_ue_ambr_uplink_mbps', 'UE uplink AMBR in Mbps', ['imsi'])
ue_ambr_downlink = Gauge('free5gc_ue_ambr_downlink_mbps', 'UE downlink AMBR in Mbps', ['imsi'])

def parse_mbps(value):
    try:
        return float(value.replace(' Mbps', '').replace(' Kbps', ''))
    except:
        return 0

def collect_metrics():
    while True:
        count = db['subscriptionData.contextData.amf3gppAccess'].count_documents({})
        ue_connected.set(count)
        for doc in db['policyData.ues.smData'].find():
            imsi = doc.get('ueId', '')
            try:
                slice_data = doc.get('smPolicySnssaiData', {})
                slice_010203 = slice_data.get('01010203', {}).get('smPolicyDnnData', {}).get('internet', {})
                slice_112233 = slice_data.get('01112233', {}).get('smPolicyDnnData', {}).get('internet', {})
                internet = slice_010203 if slice_010203.get('sessAmbr') else slice_112233
                ambr = internet.get('sessAmbr', {})
                ul = ambr.get('uplink', '0 Mbps')
                dl = ambr.get('downlink', '0 Mbps')
                ue_ambr_uplink.labels(imsi=imsi).set(parse_mbps(ul))
                ue_ambr_downlink.labels(imsi=imsi).set(parse_mbps(dl))
            except:
                pass
        time.sleep(30)

if __name__ == '__main__':
    start_http_server(8099)
    print("Exporter running on port 8099")
    collect_metrics()

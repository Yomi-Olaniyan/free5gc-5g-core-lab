// Free5GC PCF Policy Setup Script
// This script documents the MongoDB policy configurations
// applied to each subscriber in the lab

// Subscriber 1 — imsi-208930000000001 — Slice 01010203 — 5 Mbps
db.getSiblingDB('free5gc')['policyData.ues.smData'].updateOne(
  { ueId: 'imsi-208930000000001' },
  { $set: {
    'smPolicySnssaiData.01010203.smPolicyDnnData.internet.sessAmbr': {
      uplink: '5 Mbps',
      downlink: '5 Mbps'
    }
  }}
);

// Subscriber 3 — imsi-208930000000003 — Slice 01112233 — 17 Mbps
db.getSiblingDB('free5gc')['policyData.ues.smData'].updateOne(
  { ueId: 'imsi-208930000000003' },
  { $set: {
    'smPolicySnssaiData.01112233.smPolicyDnnData.internet.sessAmbr': {
      uplink: '17 Mbps',
      downlink: '17 Mbps'
    }
  }}
);

// Add remaining subscribers following same pattern

// Subscriber 2 — imsi-208930000000002 — Slice 01010203 — 5 Mbps
db.getSiblingDB('free5gc')['policyData.ues.smData'].updateOne(
  { ueId: 'imsi-208930000000002' },
  { $set: {
    'smPolicySnssaiData.01010203.smPolicyDnnData.internet.sessAmbr': {
      uplink: '5 Mbps',
      downlink: '5 Mbps'
    }
  }}
);

// Subscriber 4 — imsi-208930000000004 — Slice 01112233 — 22 Mbps
db.getSiblingDB('free5gc')['policyData.ues.smData'].updateOne(
  { ueId: 'imsi-208930000000004' },
  { $set: {
    'smPolicySnssaiData.01112233.smPolicyDnnData.internet.sessAmbr': {
      uplink: '22 Mbps',
      downlink: '22 Mbps'
    }
  }}
);

// Subscriber 5 — imsi-208930000000005 — Slice 01010203 — 13 Mbps
db.getSiblingDB('free5gc')['policyData.ues.smData'].updateOne(
  { ueId: 'imsi-208930000000005' },
  { $set: {
    'smPolicySnssaiData.01010203.smPolicyDnnData.internet.sessAmbr': {
      uplink: '13 Mbps',
      downlink: '13 Mbps'
    }
  }}
);

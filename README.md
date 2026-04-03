# Free5GC 5G Core Lab — Network Slicing, PCF Policy, CHF Charging and Observability

## Overview
A fully functional 5G Standalone (SA) core lab built on Ubuntu using Free5GC and UERANSIM demonstrating real operator-grade network behavior including network slicing, per-subscriber QoS policy, charging sessions and real-time observability.

## Background
This lab was conceived in October 2025 after completing Cloud/DevOps training — driven by one question: "Can 5G core be containerized?" Development was paused for a commercial Airtel-ZTE 5G NSA deployment in Nigeria, then resumed and completed in March 2026.

## What This Lab Demonstrates
- 5 concurrent UEs across 2 network slices
- Per-subscriber speed tiers (5, 13, 17, 22 Mbps) configured via PCF policy on N7
- CHF charging sessions via N40
- Real-time per-subscriber AMBR monitoring via Prometheus and Grafana
- Fault isolation testing — AMF, SMF, PCF, UDR failure behavior
- Network slicing with per-slice QoS differentiation (SST:1 SD:010203 and SST:1 SD:112233)

## Architecture
```
UE (UERANSIM) → gNB → AMF (N2/SCTP)
                         ↓ N11
                        SMF → UPF (N4/PFCP) → Internet (N6)
                         ↓ N7        ↓ N40
                        PCF         CHF
                         ↑ N28 ------↑
                        
UDM ← UDR (subscriber profiles)
AUSF (authentication)
NRF (service discovery)
NSSF (slice selection)

Prometheus → Grafana (observability)
```

## Network Slices
| Slice | SST | SD | Subscribers | Policy |
|---|---|---|---|---|
| Slice 1 | 1 | 010203 | imsi-001, 002, 005 | 5-13 Mbps |
| Slice 2 | 1 | 112233 | imsi-003, 004 | 17-22 Mbps |

## Subscriber Tiers
| Subscriber | Slice | Downlink AMBR |
|---|---|---|
| imsi-208930000000001 | 010203 | 5 Mbps |
| imsi-208930000000002 | 010203 | 5 Mbps |
| imsi-208930000000003 | 112233 | 17 Mbps |
| imsi-208930000000004 | 112233 | 22 Mbps |
| imsi-208930000000005 | 010203 | 13 Mbps |

## Known Free5GC Limitations
- CHF quota automation not fully implemented — workaround: manual PCF policy updates via MongoDB
- Slicing and PCF policy decoupled — workaround: manual slice differentiator configuration in UERANSIM yaml files

## Prerequisites
- Ubuntu 20.04 or 22.04
- Go 1.21+
- MongoDB 6.0+
- Free5GC v4.1.0
- UERANSIM v3.2.7
- Prometheus
- Grafana

## Setup
Refer to individual config files in the config/ directory.
MongoDB policy scripts in mongodb/policy_setup.js

## Next Steps
- Deploy Free5GC on Kubernetes using Helm charts
- Implement Open5GS for complete N28/CHF automation
- Integrate with real 5G radio equipment

## Author
Abayomi Olaniyan
RF & Network Optimization Engineer | 5G Core | Cloud-Native Telecom
Lagos, Nigeria

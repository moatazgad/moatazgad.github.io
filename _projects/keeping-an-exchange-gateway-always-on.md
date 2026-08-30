---
title: "Keeping an Exchange's Gateway Always On"
subtitle: "The AKS platform and observability behind the API gateway and integration layer a securities exchange ran all its traffic through — eight clusters, four environments."
role: "DevOps Engineer"
type: "Client Engagement"
cloud: "Azure"
order: 3
tags:
  - "Azure"
  - "AKS"
  - "ECK"
  - "Terraform"
  - "Helm"
  - "Elasticsearch"
diagram: "keeping-an-exchange-gateway-always-on"
built:
  - "Two AKS clusters per environment — one for the API gateway, one for the enterprise service bus — across four environments, each isolated in its own Azure subscription"
  - "NGINX Plus at the edge in production (open-source NGINX in lower environments) in front of the API gateway: TLS termination, routing, rate limiting"
  - "Elasticsearch, Kibana and Logstash on Kubernetes through the ECK operator — declarative and version-controlled, with zone-aware shard allocation and pod anti-affinity"
  - "An ILM policy that rolls indices over at 5 GB or one day and gates deletion on a successful snapshot, so data is never dropped before it's backed up"
  - "Nightly SLM snapshots to Azure Blob Storage with 30-day retention"
  - "Redis replicated across three availability zones — six replicas over three node pools — to survive a full zone loss"
  - "Template-based Azure DevOps pipelines: service repos trigger shared pipeline templates in one central repo — build and tag by commit SHA, push to ACR, helm upgrade behind a dry-run gate"
approach: |
  The platform was an API gateway and enterprise service bus that a securities exchange ran all
  of its client traffic through — market data, disclosures, gateway analytics. I inherited it and
  owned the Kubernetes platform and observability for about a year, working with one other DevOps
  engineer.

  Each environment runs two AKS clusters — the API gateway and the ESB — and lives in its own
  Azure subscription so environments can't reach into one another. The stateful workloads that
  aren't on the request path — the whole ELK stack — run on spot node pools to keep the bill
  down, with tolerations and anti-affinity so an eviction can't take a shard quorum with it.

  The observability stack was the piece I built from the ground up. Rather than run Elasticsearch
  on VMs I deployed it, Kibana and Logstash on Kubernetes through the ECK operator, so the whole
  stack is a manifest rather than a runbook. Retention is an ILM policy — roll over at 5 GB or a
  day — with the delete phase gated on a successful snapshot: the worst case is keeping an index
  slightly too long, never losing one that wasn't backed up. SLM takes a nightly snapshot to blob
  storage. Bringing the existing index data across meant a cross-cluster remote reindex; the
  first runs blew past Elasticsearch's HTTP buffer, so I capped the batch size and ran it
  incrementally by date range.
results:
  - stat: "8"
    description: "AKS clusters across four environments, isolated per subscription"
  - stat: "~30"
    description: "microservices behind the gateway"
  - stat: "Zero"
    description: "unplanned production outages"
---

A securities exchange's systems are either up or they're a problem that makes the news. I owned the
Kubernetes platform behind the API gateway that every client request flowed through, and built the
observability stack that kept all of it visible.

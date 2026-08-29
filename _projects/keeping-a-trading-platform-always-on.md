---
title: "Keeping a Trading Platform Always On"
subtitle: "AKS infrastructure and observability for a securities trading platform that couldn't afford downtime, across four environments from development to production."
role: "DevOps Engineer"
type: "Client Engagement"
cloud: "Azure"
order: 3
tags:
  - "Azure"
  - "AKS"
  - "Terraform"
  - "Helm"
  - "Elasticsearch"
  - "Kibana"
diagram: "keeping-a-trading-platform-always-on"
built:
  - "AKS clusters kept consistent across four environments, from development to production"
  - "Azure DevOps pipelines automating build, test, and release"
  - "Terraform managing provisioning and the full infrastructure lifecycle, so every environment is reproducible from code"
  - "Helm charts standardizing how each of ~30 microservices was packaged, configured, and released"
  - "Elasticsearch tuned for the log volume — index sharding, ILM retention policies, and SLM snapshot scheduling"
  - "Kibana dashboards giving the team real-time visibility into system and application health"
approach: |
  The platform ran as roughly 30 microservices on AKS, with the same cluster setup carried across all
  four environments — development, test, staging, and production — provisioned and kept in lifecycle
  by Terraform so no environment drifted into being a hand-maintained special case. Helm standardized
  how every microservice was packaged and released, with chart versioning so a deployment could be
  rolled back to a known-good release.

  On the observability side, the ELK stack was tuned for the volume a trading platform generates
  rather than run with defaults: data sharded across nodes, ILM policies moving indices through
  retention tiers, and SLM handling scheduled snapshots. Kibana dashboards gave the team a live view
  of system and application health, and Azure DevOps drove build, test, and release.
results:
  - stat: "~30"
    description: "microservices under management"
  - stat: "4"
    description: "environments on one consistent cluster setup"
  - stat: "Zero"
    description: "unplanned production outages"
---

A securities trading platform doesn't get graceful degradation — it's either up or it's an incident.
I was responsible for the Kubernetes infrastructure and the observability that kept it that way,
across every environment from development to production.

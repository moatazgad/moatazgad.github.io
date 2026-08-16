---
title: "Keeping a Trading Platform Always On"
subtitle: "AKS infrastructure and observability for a securities trading platform that couldn't afford downtime, across dev, test, and production."
role: "Cloud/DevOps Engineer"
type: "Client Engagement"
cloud: "Azure"
tags:
  - "Azure"
  - "AKS"
  - "Terraform"
  - "Helm"
  - "Elasticsearch"
  - "Kibana"
diagram: "keeping-a-trading-platform-always-on"
built:
  - "AKS clusters running consistently across dev, test, and production"
  - "Azure DevOps pipelines automating build, test, and release"
  - "Terraform managing infrastructure provisioning and its full lifecycle"
  - "Helm charts standardizing how each microservice was deployed and configured"
  - "Elasticsearch tuned for scale — sharded data, index lifecycle policies, and snapshot lifecycle management"
  - "Kibana dashboards giving the team real-time visibility into system and application health"
approach: |
  AKS clusters ran consistently across every environment, provisioned and kept in lifecycle by
  Terraform, with Helm standardizing how each microservice was deployed and configured. On the
  observability side, Elasticsearch was tuned for scale — sharded data, index lifecycle policies,
  snapshot lifecycle management — with Kibana dashboards giving the team real-time visibility into
  system and application health, and Azure DevOps driving build, test, and release.
---

A securities trading platform doesn't get graceful degradation — it's either up or it's a problem.
I was responsible for the Kubernetes infrastructure and observability that kept it that way across
development, test, and production.

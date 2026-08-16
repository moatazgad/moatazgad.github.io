---
title: "Running AI Without the Cloud"
subtitle: "On-premises LLM deployment and fully automated Elasticsearch, Kibana, and RabbitMQ clusters — no cloud dependency, no manual setup."
role: "Systems/DevOps Engineer"
type: "Client Engagement"
cloud: "On-Premises"
tags:
  - "Linux"
  - "Ansible"
  - "Elasticsearch"
  - "Kibana"
  - "RabbitMQ"
  - "LLM"
diagram: "running-ai-without-the-cloud"
built:
  - "LLMs deployed and validated directly on on-premises Linux servers, with no cloud dependency"
  - "Ansible playbooks automating the entire Elasticsearch, Kibana, and RabbitMQ install — repeatable and idempotent"
  - "Multi-node Elasticsearch cluster for availability, replication, and search performance"
  - "Clustered RabbitMQ for reliable messaging between services"
  - "Kibana dashboards built for real-time monitoring and log visibility"
  - "Linux hardening — access control, firewall rules, system-level security — baked into the same automation"
approach: |
  LLMs were deployed and validated directly on on-premises Linux servers. Ansible playbooks
  automated the entire install of Elasticsearch, Kibana, and RabbitMQ — repeatable and idempotent
  rather than hand-configured — with Elasticsearch running as a multi-node cluster for availability
  and search performance and RabbitMQ clustered for reliable messaging between services. Kibana
  dashboards gave real-time visibility into all of it, and Linux hardening — access control,
  firewall rules, system-level security — was baked into the same automation rather than treated as
  a separate pass.
---

Not every environment gets to depend on the cloud. This one needed LLM inference running entirely
on-premises, with the logging and messaging infrastructure around it automated the same way a
cloud-native stack would be.

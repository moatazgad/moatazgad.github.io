---
title: "Running AI Without the Cloud"
subtitle: "On-premises LLM inference with fully automated Elasticsearch, Kibana, and RabbitMQ clusters — no cloud dependency, no manual setup."
role: "Systems/DevOps Engineer"
type: "Client Engagement"
cloud: "On-Premises"
order: 1
tags:
  - "Linux"
  - "Ansible"
  - "Elasticsearch"
  - "Kibana"
  - "RabbitMQ"
  - "LLM"
diagram: "running-ai-without-the-cloud"
built:
  - "LLM inference deployed and validated directly on on-premises Linux servers, with no cloud dependency at run time"
  - "The entire stack — inference runtime, Elasticsearch, Kibana, RabbitMQ — installed by idempotent, version-controlled Ansible playbooks"
  - "A multi-node Elasticsearch cluster for availability, replication, and search performance"
  - "Clustered RabbitMQ for reliable messaging between services"
  - "Kibana dashboards for real-time monitoring and log visibility"
  - "Linux hardening — access control, firewall rules, system-level security — built into the same automation"
approach: |
  The constraint set the design: no external connectivity, and data that could not leave the
  premises. That ruled out managed services and anything with a run-time dependency on the cloud, so
  the inference runtime, search, and messaging all had to run on-site — and be automated to the same
  standard a cloud-native stack would be, not hand-built because it happened to live in a data centre.

  Every component was installed through idempotent Ansible playbooks rather than by hand, so
  rebuilding a node is a repeatable operation rather than a recovery project. Elasticsearch ran as a
  multi-node cluster for availability and replication, RabbitMQ was clustered for reliable
  inter-service messaging, and Linux hardening — access control, firewall rules, system-level
  security — was part of the same automation rather than a separate manual pass.
---

Not every environment gets to depend on the cloud. This one needed LLM inference running entirely
on-premises, with the logging and messaging infrastructure around it automated the same way a
cloud-native stack would be.

---
title: "An LLM Stack, Self-Hosted End to End"
subtitle: "LLM inference on GPUs, plus self-managed Elasticsearch and RabbitMQ — built air-gapped on-prem first, then moved to cloud VMs by re-running the same Ansible."
role: "Systems/DevOps Engineer"
type: "Client Engagement"
cloud: "On-prem · Azure VMs"
order: 1
tags:
  - "Ansible"
  - "NVIDIA GPU"
  - "LLM"
  - "Elasticsearch"
  - "RabbitMQ"
  - "Redis"
diagram: "self-hosted-llm-stack"
built:
  - "LLM inference served from GPU hosts — NVIDIA drivers, CUDA, the NVIDIA container toolkit, and Docker's NVIDIA runtime — with models and images pulled from a private registry"
  - "A 3-node Elasticsearch cluster in production, self-managed: TLS on transport and HTTP, node enrollment, discovery and seed hosts, JVM heap sized to the boxes"
  - "RabbitMQ clustering — shared Erlang cookie, disk and RAM node roles, the management plugin for visibility"
  - "Redis for caching and coordination between the services"
  - "The whole stack in one Ansible project: a role per component, an inventory per environment, group_vars, and Ansible Vault for every secret"
  - "Five environments — dev, stage, and a three-node production cluster — stood up from the same playbooks"
  - "Kibana for operational visibility into the search tier"
approach: |
  The platform serves a workplace-assistant chatbot: an LLM to answer with, Elasticsearch behind
  it for retrieval, RabbitMQ moving work between the pieces, Redis for caching. The first
  deployment was genuinely air-gapped — isolated hardware, a private registry, nothing managed
  and nothing reaching out.
  Later it moved onto GPU VMs in Azure. What made that a re-run rather than a rebuild is that it
  was already all in Ansible: a role each for Elasticsearch, Kibana and RabbitMQ, an inventory
  per environment, Ansible Vault holding the secrets. Standing up a new environment — or a new
  home for the whole thing — is `ansible-playbook` against a new inventory.

  The GPU side was the fiddly part: lining up NVIDIA driver, CUDA and kernel versions on Ubuntu,
  wiring the NVIDIA container toolkit into Docker so the model containers actually see the GPU,
  and pinning all of it so an unattended apt upgrade couldn't break inference overnight.

  Elasticsearch in production runs as three nodes — enrollment tokens to bring nodes in,
  discovery and seed hosts configured across all of them, heap sized to the hardware, TLS on both
  layers. RabbitMQ is clustered the same way, Erlang cookie synced and node roles set.
results:
  - stat: "3-node"
    description: "Elasticsearch cluster in production, self-managed"
  - stat: "5"
    description: "environments from one Ansible project"
  - stat: "GPU"
    description: "self-hosted model serving — CUDA, NVIDIA container toolkit, version-pinned"
---

A workplace-assistant chatbot needs a model to answer with, a search index to keep it grounded,
and a queue to hold the pieces together — and this one had to run entirely on infrastructure we
controlled. I built and automated that stack: the GPU hosts serving the model, the Elasticsearch
cluster behind it, and the RabbitMQ layer between them.

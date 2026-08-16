---
title: "Shipping AI at Production Speed"
subtitle: "AWS infrastructure and CI/CD built so new GenAI capabilities could go from idea to production without touching the platform underneath them."
role: "DevOps Engineer"
type: "Client Engagement"
cloud: "AWS"
tags:
  - "AWS"
  - "Terraform"
  - "ECS"
  - "Jenkins"
  - "HashiCorp Vault"
  - "Artifactory"
diagram: true
built:
  - "Terraform-based provisioning so every environment could be rebuilt from code, not tribal knowledge"
  - "GenAI services running as ECS-hosted containers, sized and scaled independently of each other"
  - "Jenkins pipelines automating build, test, and deploy end to end"
  - "Vault-managed secrets so API keys and credentials never sat in plaintext config"
  - "Artifactory as the single source of truth for build artifacts and container images"
  - "Bitbucket for source control and day-to-day team collaboration"
approach: |
  The build leaned on Terraform-based provisioning so every environment could be rebuilt from code
  rather than institutional memory, with GenAI services running as ECS-hosted containers sized and
  scaled independently of one another. Jenkins pipelines automated build, test, and deploy end to
  end, Vault kept secrets out of plaintext config, and Artifactory acted as the single source of
  truth for build artifacts and images — with Bitbucket underneath it all for source control and
  day-to-day collaboration.
---

Every new GenAI use case is easy to prototype and hard to operationalize — someone still has to get
it into production, keep it running, and make sure the next one doesn't require starting from
scratch. That's the layer I was responsible for: the infrastructure a GenAI platform runs on, not
the models themselves.

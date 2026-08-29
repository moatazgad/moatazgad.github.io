---
title: "Shipping AI at Production Speed"
subtitle: "AWS infrastructure and CI/CD built so new GenAI capabilities could go from idea to production without each one becoming its own infrastructure project."
role: "DevOps Engineer"
type: "Client Engagement"
cloud: "AWS"
order: 2
tags:
  - "AWS"
  - "Terraform"
  - "ECS"
  - "Jenkins"
  - "HashiCorp Vault"
  - "Artifactory"
diagram: "shipping-ai-at-production-speed"
built:
  - "Terraform provisioning for every environment, with existing hand-created resources imported into state and a sprawling root configuration refactored into reusable modules"
  - "GenAI services running as ECS-hosted containers, sized and scaled independently of each other"
  - "Jenkins multibranch pipelines automating build, test, and deploy across every environment"
  - "A dedicated repository and pipeline for Lambda code — closing the last place changes were still made by hand in the console"
  - "Vault-managed secrets so API keys and credentials never sat in plaintext config"
  - "Artifactory as the single registry for build artifacts and images, with promotion policies for traceable, reversible releases"
approach: |
  Infrastructure had started life in the AWS console, created by hand. Moving it onto Terraform meant
  routing every new resource through a request-and-review path, importing the existing manual ones
  into state, and breaking a large root configuration into reusable modules.

  The rule that no resource is created by hand came out of a real incident. A batch of infrastructure
  changes — an S3 and DynamoDB restructuring, updated ECS task definitions, new secrets — reached the
  dev environment outside the normal promotion flow, so a higher environment ended up running new
  application code against infrastructure that wasn't there yet. It came up, but didn't work. The call
  was to roll forward rather than revert: provision the missing resources through the modules, bring
  the environments back into parity, and run the pipeline end to end to confirm a clean deploy — since
  the changes were needed anyway and reverting would only put the environments out of sync again.

  The fix that stuck was structural. Infrastructure changes now ride the same promotion path as
  application code, not a separate manual one. Lambda functions had been the common exception —
  edited directly in the console — so that code moved into its own repository with a multibranch
  Jenkins pipeline, version-controlled and deployed automatically like everything else.
results:
  - stat: "40+"
    description: "containerized services across the platform"
  - stat: "6–7"
    description: "environments provisioned from reusable Terraform modules"
  - stat: "Multiple"
    description: "zero-downtime releases per week"
---

Every new GenAI use case is easy to prototype and hard to operationalize — someone still has to get
it into production, keep it running, and make sure the next one doesn't start from scratch. That was
the layer I owned: the infrastructure a GenAI platform runs on, and the path code takes to reach it —
not the models themselves.

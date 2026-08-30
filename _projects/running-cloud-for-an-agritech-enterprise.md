---
title: "Running Cloud for an AgriTech Enterprise"
subtitle: "One small team owning the infrastructure for a global agri-tech company's R&D software portfolio — a dozen product stacks across AWS and on-prem, under enterprise change control."
role: "DevOps Engineer"
type: "Client Engagement"
cloud: "AWS · Hybrid"
order: 4
tags:
  - "AWS"
  - "Terraform Cloud"
  - "GitLab CI"
  - "Lambda"
  - "ECS"
  - "FinOps"
diagram: "running-cloud-for-an-agritech-enterprise"
built:
  - "Infrastructure for 10+ product stacks under one enterprise account — the team owned everything on the infrastructure side across the R&D portfolio"
  - "A reference-data integration platform on AWS API Gateway and Lambda: five environments behind one gateway with stage-based routing, and a command/query split for bulk insert, update and relationship lookups"
  - "A serverless event pipeline — Lambda, SQS with dead-letter queues, DynamoDB, EventBridge Scheduler, S3, Secrets Manager — plus AWS Batch for scheduled jobs"
  - "ECS Fargate services with autoscaling and a Terraform lifecycle that ignores what the CD pipeline owns (task definitions, desired count), so the two don't fight"
  - "Terraform Cloud with a workspace per stack, GitLab-triggered, with drift detection"
  - "IAM tightened from broad wildcards down to per-resource policies with KMS via-service and encryption-context conditions"
  - "SonarCloud and third-party dependency (SCA) scanning wired into a multi-repo product's pipelines, with unit tests gated in CI"
  - "SELinux worked out on the RHEL CI runners — audit2allow policy modules so the GitLab runner could reach what it needed"
  - "CloudWatch rules and Lambda that stop non-production compute after hours and on weekends"
  - "An Oracle 12.1 → 19c upgrade across every database server, plus production → lower-environment data refreshes"
approach: |
  The team's remit was simple to state and broad in practice: anything infrastructure-side,
  across the whole portfolio, is ours — provisioning, cost, security, databases, delivery
  pipelines, and the change tickets that come with an enterprise that runs on ITIL. Everything
  went through Terraform Cloud, a workspace per stack, triggered from GitLab; production changes
  went through the client's ServiceNow change process. A tagging standard every resource had to
  meet drove backups, cost allocation, alarm routing and patch groups.

  Cost was a standing priority, not a project. We reviewed utilisation and rightsized instances
  on a cycle, and put the non-production compute on a schedule — CloudWatch rules triggering a
  Lambda to stop servers after hours and on weekends. Security ran the same way: weekly
  vulnerability triage, the high-severity findings fixed fast and the rest coordinated with the
  client's monthly patching, and a steady tightening of IAM — pipeline and Lambda roles moved off
  broad wildcards onto per-resource policies with KMS conditions.

  On the build side, one piece I owned end to end was standing up SonarCloud and dependency
  scanning across a multi-repo product and gating unit tests in CI. The trickiest recurring
  problem was ECS and Terraform disagreeing about desired state — the CD pipeline updates task
  definitions and scale, Terraform wants to revert them — solved by scoping `ignore_changes` to
  exactly the attributes the pipeline owns.
results:
  - stat: "10+"
    description: "product stacks under the team's infrastructure ownership"
  - stat: "5"
    description: "environments on the reference-data integration platform"
  - stat: "19c"
    description: "Oracle upgrade delivered across every database server"
---

A large agri-tech company runs its research software on dozens of AWS accounts and on-prem
servers and needs someone to own the infrastructure under all of it. That was my team — a handful
of us responsible for the whole portfolio from the infrastructure side: what gets provisioned,
what it costs, whether it's patched, and how it ships.

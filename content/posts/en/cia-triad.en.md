---
title: "The Core of Security: Understanding the CIA Triad"
date: 2026-09-26T10:00:00+03:00
draft: false
tags: ["fundamentals", "defense", "architecture"]
categories: ["Fundamentals"]
---

Every operational defense mechanism and adversary attack vector ultimately touches at least one pillar of the **CIA Triad** (Confidentiality, Integrity, Availability).

### 1. Confidentiality
Ensuring data is accessible only to authorized entities and processes.

* **Vectors:** Packet sniffing, unauthorized data exfiltration, MITM attacks.
* **Mitigation:** Robust encryption (AES-256), multi-factor authentication (MFA), and strict RBAC policies.

### 2. Integrity
Assurance that digital assets and system binaries have not been altered, wiped, or tampered with.

* **Vectors:** Unauthorized SQL modifications, malware injection, file manipulation.
* **Mitigation:** Cryptographic hashing (SHA-256), digital certificates, and File Integrity Monitoring (FIM).

### 3. Availability
Guaranteeing uninterrupted access to services and systems for legitimate users.

* **Vectors:** DDoS strikes, ransomware locking local filesystems, infrastructural failovers.
* **Mitigation:** Architectural redundancy, load balancing, and edge caching/DDoS mitigation.

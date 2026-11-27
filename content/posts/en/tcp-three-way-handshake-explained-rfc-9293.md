---
title: TCP Three-Way Handshake Explained (RFC 9293)
date: 2026-11-27T11:03:00
draft: false
categories:
  - Networking, Cybersecurity
tags:
  - SYN, ACK, TCP, RFC 9293, Three-Way Handshake
---

Before a single byte of application data crosses the network, TCP synchronizes both endpoints through the **Three-Way Handshake** defined in RFC 9293. 

[https://youtu.be/RbB_XT_upzA?si=RMqqX7DrRSEFHSYr](https://youtu.be/RbB_XT_upzA?si=RMqqX7DrRSEFHSYr)

Handshake Flow & State Transitions 

**1. Initial Setup (\`LISTEN\` & Ephemeral Port):** The server opens port \`443\` and enters the \`LISTEN\` state, while the client opens a random ephemeral port (\`54321\`). Both sides generate 32-bit Initial Sequence Numbers (ISN). 

**2. Step 1 — \`SYN\` (\`SYN-SENT\`):** The client transitions to \`SYN-SENT\` and transmits a \`SYN\` segment carrying its 32-bit sequence number. 

**3. Step 2 — \`SYN-ACK\` (\`SYN-RECEIVED\`):** The server moves to \`SYN-RECEIVED\`. Because the \`SYN\` flag consumes one logical sequence number, the server replies with \`SYN-ACK\`, sending its own ISN and acknowledging the client's ISN plus one (\`Client_ISN + 1\`). 

**4. Step 3 — \`ACK\` (\`ESTABLISHED\`):** The client enters \`ESTABLISHED\` and sends an \`ACK\` with \`Server_ISN + 1\`. Once the server receives this final \`ACK\`, it also transitions to \`ESTABLISHED\`, opening a full-duplex session for reliable data transfer. 

Verification with \`tshark\` Using a \`tshark\` packet capture, you can inspect the exact raw 32-bit sequence and acknowledgment numbers side by side with relative sequence numbers advancing from \`0\` to \`1\` on zero-payload handshake packets.

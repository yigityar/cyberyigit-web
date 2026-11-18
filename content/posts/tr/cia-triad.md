---
title: "Siber Güvenliğin Temeli: CIA Triad (Gizlilik, Bütünlük, Erişilebilirlik)"
date: 2026-09-25T17:00:00+03:00
draft: false
tags: ["temeller", "savunma", "guvenlik-mimarisi"]
categories: ["Teori & Temeller"]
---

Siber güvenlik operasyonlarında karşılaşılan her saldırı ve uygulanan her savunma mekanizması, temelde **CIA Triad** (Gizlilik, Bütünlük, Erişilebilirlik) üçlüsünden en az birini hedef alır veya korur.

### 1. Confidentiality (Gizlilik)
Verinin yalnızca yetkilendirilmiş kişiler, süreçler veya cihazlar tarafından erişilebilir olmasıdır.

* **Tehditler:** Ağ dinleme (sniffing), veri sızıntıları, MITM (Ortadaki Adam) saldırıları.
* **Savunma Mekanizmaları:** Güçlü şifreleme algoritmaları (AES-256), çok faktörlü kimlik doğrulama (MFA) ve rol tabanlı erişim kontrolü (RBAC).

### 2. Integrity (Bütünlük)
Verinin ve sistemlerin yetkisiz kişilerce değiştirilmediğinin, silinmediğinin veya tahrif edilmediğinin güvence altına alınmasıdır.

* **Tehditler:** Veri manipülasyonu, SQL Injection, zararlı yazılım enjeksiyonu.
* **Savunma Mekanizmaları:** Kriptografik özet fonksiyonları (SHA-256), dijital imzalar ve dosya bütünlük izleme (FIM) sistemleri.

### 3. Availability (Erişilebilirlik)
Sistemlerin, ağların ve verilerin yetkili kullanıcılar ihtiyaç duyduğu anda kesintisiz erişilebilir durumda olmasıdır.

* **Tehditler:** DDoS (Dağıtık Hizmet Engelleme) saldırıları, fidye yazılımları (ransomware), donanım arızaları.
* **Savunma Mekanizmaları:** Yedeklilik (redundancy), yük dengeleme (load balancing) ve Cloudflare gibi CDN/DDoS kalkanları.

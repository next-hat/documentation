---
slug: nanocl-0.16
title: Introducing Nanocl 0.16
description: Nanocl 0.16 is here with a range of changes and improvements across the Nanocl ecosystem. Dive into the details!
image: /img/logo.png
authors: [leone]
tags: [nanocl, release, 0.16]
keywords: [containerization, Docker, Kubernetes, Nanocl, NGINX, software development, deployment, release, 0.16]
---

We're excited to announce the release of **Nanocl 0.16**! This update brings a range of changes and improvements across the Nanocl ecosystem. Although this update may seem small, it lays the foundation for future scalability, especially around network meshing, with crucial enhancements in security and network binding. Let’s dive into what’s new and improved across our core components.

<!-- truncate -->

## Highlights of Nanocl 0.16

One of the most significant improvements in this release is a shift in network architecture. Previously, each Nanocl namespace created its own Docker network, which posed challenges for future scalability, especially with IP binding across multiple nodes. With this release, we've moved to a single network for all containers, virtual machines, and jobs. This architecture will support seamless IP binding for multi-node scaling without compromising on efficiency.

To enhance security in this unified network, we’ve introduced TLS-based end-to-end encryption. By mounting TLS secrets directly inside each container (cargo), only processes with the correct TLS secret can communicate with each other over the network. This allows network discovery but restricts unauthorized access, maintaining security across your distributed applications.

---

## Component Changes

### `ncproxy` 0.13.0
- **Changed:**
  - Updated to `nanocld_client` 0.16.0.
  - Improved target network selection using `NetworkKind`.
  - `NetworkKind` is now used to bind networks, enhancing flexibility in network management.
- **Fixed:**
  - TLS proxy support to enable secure end-to-end encryption.

### `ncdns` 0.8.0
- **Changed:**
  - Updated to `nanocld_client` 0.16.0.
  - Network binding now utilizes `NetworkKind` for streamlined network operations.

### `nanocld` 0.16.0
- **Added:**
  - Mounted TLS secrets within each container (cargo) for enhanced security. Located in `/opt/nanocl.io/secrets`.
  - Loaded environment secrets in `InitContainer` for `cargo` and `job` configurations.
  - Injected internal gateway data (`$$INTERNAL_GATEWAY`) for ease of internal network management.
- **Changed:**
  - Removed namespace-based network bindings to reduce overhead.
- **Fixed:**
  - Resolved missing metadata issues in job specs.
  - Improved error messages for events.
  - Fixed issues with cargo `InitContainer` network selection.
  - Status when stopping a living object (cargo, vm, job)

### `nanocl` 0.16.0 (CLI)
- **Added:**
  - `nanocl logs` command for single-process log viewing for easier debugging.
  - `nanocl inspect` command for inspecting individual processes.
- **Changed:**
  - Updated to `nanocld_client` 0.16.0.
- **Fixed:**
  - Windows compatibility and resolved compilation issues.

---

## Example End to End TLS Configuration

Below is an example of how to configure a TLS secret in Nanocl, showcasing the setup for a end to end tls encryption between the proxy and the cargo:

```yaml
ApiVersion: v0.16
Secrets:
- Name: test-client
  Kind: nanocl.io/tls
  Immutable: false
  Data:
    Certificate: |
      -----BEGIN CERTIFICATE-----
      MIIErDCCApQCFA0NY4tAFj3MJEOqNJoUacx8lHhgMA0GCSqGSIb3DQEBCwUAMBQx
      EjAQBgNVBAMMCUN1c3RvbSBDQTAeFw0yNDAxMzExNTAwNDNaFw0yNTAxMzAxNTAw
      NDNaMBExDzANBgNVBAMMBmNsaWVudDCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCC
      AgoCggIBAMxpYNAVPRG3SArHfdzscL86o0St73ZFODMCb0WkVucDetCUTY6qcG+4
      YzSNDpYKmwkdQ/k95zQPq09GKjD7Us2YrAvUM/Bk3rZ0LpI01ApmXDGKhGQRW/T5
      U9veLOkjY3MzDQBdOYhwSQeHqmPyUepMfSmMeAFrLLo7SqVyjwxc9qLO4TATgsnA
      qlGYqeVr+VKdduy1/lcwetGb2swOFNWahaac9H6XN+5m3O0zj6tyq9u6G42RZswT
      gyW9pOiLa0BJWOK8ON7h7uPDEx6bwYTiBE2eyGPqT3HEPQjQ1jiJ3PEZN5YQj2A2
      j6csjmostpDUweL0lH0VfsOOqFsZv3pGqNWMWSUqDTuGxxTcSRntVQNbW0OfG1zB
      t6ZtBbQqC/6RlpqSvXHf7K1ctqONJM27kpdmw9sAmqCRAnfxJCwwwnC1vrFnXNv7
      WQGhjBeegyj0Acxh/ubXCwgqeVbxMVig49b1fUwm3eqaT8/zIQg9C8cp9BsF7PLw
      EA8IHO+/iiUGlq2vzsens3FPkJDaqsBVdFh3IBER4VzG63qe1ui0l80d9h/qKa/O
      2CTSo8xy01fvxemjTmxMNdOwB6TLMPSpU+D3FEC17ptGqalwewlVIW9/67e4ebQH
      VF8/+zktn7mN8DMc+XNM2n1umrsXgz59xB6grkxb4SzTst408whFAgMBAAEwDQYJ
      KoZIhvcNAQELBQADggIBAG0qkRIzH1p4IdJz+FuwggXoV5qpCHzBfTBvb4SNVvxe
      BPryZ7Qxjc9/KpyOMHF9PqyHoTJoQRFesDpmFpgOfDSU2+mXsVBQb7y393uRLGMq
      K5XVLO1q8mFDI9ktB1N0vc6DvL8RE6IbN66AanKvtTzxlkHcpRtIwFnpRWJwyQqP
      HWa+0AFTkWMU3c1ljW5+kUVuUxrHA83W6cu8+pjz0wabfqFbe5o5ycRIR6aDJ2Dj
      DUltkPnstmgnTMfjS4/gJVOwKt248QPwLdGQxKhYNr587pISrGybNZ0c79VcuY6H
      6Q/dDQI9gIG0vcfkyChpwO78ycsqfqTgqoURjoEFu1XM3+zyho4BdjBMvNVkKAuJ
      FhfdQF8UkpDvHNvM35QR9rjkebSC9yJjCqFAj8J7mRmgwfkfDbss/yurUFWCpAE3
      QlJuwQPcg6Uq1EL0Diah7oYzy3exdZHlXoX2GJcAchOkGkzdjlggRD/o4BZ0yKR0
      buV7W24av9syoNNUGl7IPBINJm0rs3+TjwGp60c+yay2APeG3TxP9wWQ0E0e8xYI
      /ZFFoHngBDkWbBBvrIy3bffXTisMlHXdt5WeoN5x1lrm+PVP/95Ntebj7DIK2TJx
      +Je/N6PsCqJkCxYIX2iA0DK+gzDcTy2bXiTysh01G7w9vKK1ycMVQNOWxlowBRnR
      -----END CERTIFICATE-----
    CertificateClient: |
      -----BEGIN PRIVATE KEY-----
      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
      hJuriKyWGRdv1yvfRLQzxRQsJOb0OA==
      -----END PRIVATE KEY-----
    CertificateKey: |
      -----BEGIN PRIVATE KEY-----
      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
      EDMo4iBXxfQa2PpBry2dyhFN07e2
      -----END PRIVATE KEY-----
    VerifyClient: false
- Name: test-srv
  Kind: nanocl.io/tls
  Immutable: false
  Data:
    Certificate: |
      -----BEGIN CERTIFICATE-----
      MIIEsTCCApkCFBdhDFVUKj+T74FUL+0R4tVm7+/bMA0GCSqGSIb3DQEBCwUAMBQx
      EjAQBgNVBAMMCUN1c3RvbSBDQTAeFw0yNDAxMzExNTAwMzJaFw0yNTAxMzAxNTAw
      MzJaMBYxFDASBgNVBAMMC2V4YW1wbGUuY29tMIICIjANBgkqhkiG9w0BAQEFAAOC
      Ag8AMIICCgKCAgEAuyYLpyMpy3yGT00omMvQ8v8hBq/NtstTI5I/B45fmEf9UmQC
      yDragWdkixQssLxOYro0qCj/O607AJHNakMaazZ4imgHhvzYuHMlvv27KXxLxCFj
      f1PXRTAzo3gCwJrC9HjGr23/3L8KWUlbI/12R2Vswlg4fa4BL7iOggPIV6qoRdjk
      X4un+50jELAweNfOy6OH+STCVkNCbAivett2VTyWCp9y+TI3wH1L8MBHwidY6d/0
      Gzqh8EbTreqeU898wSSjZEJD8sxxBfECChvRBXVgp2vnAaWxAw+5dmIMr+PGPB2I
      83GROYa1M9WoKBYzVDXxk0tyAqJ6kvgVzam6WIz3qdwMQUofy0ydyglG47SY8zs4
      ivNus4tIkygcVHE+B1Jhu2FUFbvzdVQ5D9bRms4+OaK2QJ5YLpujRC0YSthOiToX
      /kVAZQzu/NcMqVNUy5/jeD07HvAt41c+dXLSqs6nRgwGquqKfCVHfDRB1/LScLfR
      A8/9LED24VhD3CvTIEEU++ncGw5xVXHc96cPZkBfcU4qM2NIZrLt4pAmorsGi7Wj
      P9c7VRtHmTuzlYXLD81/DpnahNtKI/awIu3cjM9mt6L5gSOvCV0D6J0gBhN/7v9b
      0q+GqI/bEm9Ao2snlxFNmJwqqbDvyVcBuLAUDrtqYrpSgMHGJq69VPkI4gkCAwEA
      ATANBgkqhkiG9w0BAQsFAAOCAgEARswWop1ZibUSFobhEZR7kPKy3boPV+Dq0Ezj
      N4Sn+r1mgTo9alW6UqcGO7CJPWWILC9iEbmcW5CLrcDzb6Atax2VPBLWYK4SWXNf
      IBcXAdh75SYpx4M8eCcHlOb4FXTM3NGuGoJfUxDXBSFoe+iJ6WVnWCgbsqHqSMeK
      ZWL9rjScItMw9AK68CCRe4YVtwGIGNCd+TZsPekfDbqxBtVxa3XJkbjdONhLdgC0
      JD8/5hpQj3LOMAtGvzcbzyZ+IbjLD8HttSvnZI1+iqUd6nOkACGiIrIMmR5Ao6GE
      7dX6D/ue74PbQUUfI9jS/Ire6OtkOxPwvj83dLD6ZJ/dt3/Djt2S3pWnEnGxR1br
      mIvH5xIAjdrG7fSKBzOTMN3i+VFdKsC1f696RgYBlGyiB4LnJex8D7LWk2osXYRB
      4/bLjuF3OlWIzvPZSZ8dUZcKrx/0XcgRCfneuDQAbQUcfw2cbkm0BDxetMCCVIyl
      cF77+NQ0KQqrTQe9qPhkpwmIT6nA8T3Tn/KoZwoLOuNN3PRoOfcTKCFym5+qN/c6
      VfD4nH+otSEbCfkbIe3Uu7yxyGRJB3OSL8MyHLe8eGsMRCSxzUxlTy6Qaj3X2Cdk
      ZUlYGbfyOq07srXzLHRMiW1QhpTA0Fos9Mc/HvdlNvg6guG496+XknELJzCN1t8W
      fll3jsU=
      -----END CERTIFICATE-----
    CertificateClient: |
      -----BEGIN PRIVATE KEY-----
      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
      hJuriKyWGRdv1yvfRLQzxRQsJOb0OA==
      -----END PRIVATE KEY-----
    CertificateKey: |
      -----BEGIN PRIVATE KEY-----
      MIIJQgIBADANBgkqhkiG9w0BAQEFAASCCSwwggkoAgEAAoICAQC7JgunIynLfIZP
      TSiYy9Dy/yEGr822y1Mjkj8Hjl+YR/1SZALIOtqBZ2SLFCywvE5iujSoKP87rTsA
      kc1qQxprNniKaAeG/Ni4cyW+/bspfEvEIWN/U9dFMDOjeALAmsL0eMavbf/cvwpZ
      SVsj/XZHZWzCWDh9rgEvuI6CA8hXqqhF2ORfi6f7nSMQsDB4187Lo4f5JMJWQ0Js
      CK9623ZVPJYKn3L5MjfAfUvwwEfCJ1jp3/QbOqHwRtOt6p5Tz3zBJKNkQkPyzHEF
      8QIKG9EFdWCna+cBpbEDD7l2Ygyv48Y8HYjzcZE5hrUz1agoFjNUNfGTS3IConqS
      +BXNqbpYjPep3AxBSh/LTJ3KCUbjtJjzOziK826zi0iTKBxUcT4HUmG7YVQVu/N1
      VDkP1tGazj45orZAnlgum6NELRhK2E6JOhf+RUBlDO781wypU1TLn+N4PTse8C3j
      Vz51ctKqzqdGDAaq6op8JUd8NEHX8tJwt9EDz/0sQPbhWEPcK9MgQRT76dwbDnFV
      cdz3pw9mQF9xTiozY0hmsu3ikCaiuwaLtaM/1ztVG0eZO7OVhcsPzX8OmdqE20oj
      9rAi7dyMz2a3ovmBI68JXQPonSAGE3/u/1vSr4aoj9sSb0CjayeXEU2YnCqpsO/J
      VwG4sBQOu2piulKAwcYmrr1U+QjiCQIDAQABAoICADuk0+jn+X17CbkDT7Fmn4ia
      C9X8OHUN1sjK5qCLXOcE5nSYIBTdQN8l6vKyMs3+rYKkcny3WCSWQGwdi5hWm3hY
      y1Dc960rLwyV0g1NAxWlIeZ3d6TQPRa1Vne+Gy50BDbyuOuXBIi/L9al3NCbClOV
      vPQxNovDZWhmirBf8T0TS/66sYnL0fUMLu02IbSZnrPiwcaC0xa359bTa82dXNis
      busixvspaIBFzmqDdTso3BrpP3xgEtUnVXYjhGMUiN9rRFGDFvGt+0VX+nzrQZHa
      RzwEVQJ+4mul2sciV4XE81wcU5W2d4CccGp9KNLhxGkNqhh13nd9fdASFazOb28W
      UMBzEhQPU6um1u/KJW3jEUulWp9KMKfE8qiwjb/NnA2VSFADT4IFOoCh8kutA5JD
      x6QgzSqoQ0g8Bon/bK4BdY+x6lx1mpHn2C8bTyASoAUdxxvIQzYRCqXwObOhW0ae
      +s72nFlMACy8wXhyKF5RiBZ7TTdUfspXB0Ax+MSOD4P6d2+SGDUhigbXQBpy8GgH
      EF2gBHEh+C/DIShX7RHFvx4M413u8pW+tMnB0iGMQfRMjCGG2mTcLXg2WFa+zWDg
      6q1U6/4OAgwIE+n6qoIh7snmrASCPaJ5dgQVUHjhpkkd50BYdcbRlAvIBf2jVui9
      QsWoPoLBVwjJp8BUFp9DAoIBAQDr9yQBPfsQN6ek3/SJllaDpt8P5lA54wCVYTgt
      1wKfkSBorjses3r6oznAgFSo4BLwsqfAMnzXwIJL9HyXSxp9lLmt6Ak6oHNb2H3k
      URf5GyUfXoBbZE9mi5qHifbqvtOJHaeK2ITE3Sq/DO6/4jZQtax+XpdoL8p5JQW1
      sQ26DfP1QKhXDChaz/wtfn0VuP6KAwgq9ZKS+q9F3kV0YZvhFDdiNNboj9ytJvNF
      u8sVoWwC53mK+ozh82/D5cvxlS9ho2g5xGyvyhzNkDxi6aGMMEaJ1/mGgEs9FCtL
      +nNW4kFGGy85u2MYHjUqE3pdB8GJ5lPTYXsO36B4ZZ8IBaJfAoIBAQDLCddCiLdA
      sbasquuXK7y/T7L6TBMjTB+7R9z1ITzRol8BmmIk3JW4iY2QGDDun0p0dp49hGo0
      WiaIEQE0VwwVxlqFTfNvsX7gwmDs6Gw2JXqgHU5sHpgiWAohzIHHZAfg724osfcN
      dUVs5NIJFi1ZTW6Ak5BjfIbBUpTX+GbtHviu8cXUjD05xBE8r02j48yPnmkrarDU
      A3GucHd1/6E9QHyjYHOg6ba9Yp1JsFeCG0F/oxJwPLNMd0JUYRo7uWMTU3buehEv
      sMJMMyvLW1GLKrfkB1xVqw/EjNLo/7i1oObeO7SQjJDf3DtLiEce5ScRGlILUtGS
      pLRAmEqkV2SXAoIBAGr1tPlnKgX45GIFLmirn/2/R3+Ci70hm+MalYeZ3dOMyl8J
      Ez1gaA9yq7wJr9Z487ztjsK9X//AgI+DfHJsFc70+pHNC1nq3z+zy6UR6Ub+uf4V
      LSPAPYmjIGHt9OIFrAeMTKTQbqZ6BmVhrFuIY8yD/XOu1vzgJOxzDrqETk+XAY2b
      SHNkzGoVux64JmURXTgcFbi7Zjx/q7GFBoCxuiH1swEuKHh0tbg7XqyuamkcqcRL
      PrnzxqapXXE0GhUg5cBhfN4qnoW0nQfFKMpBUvwj6eWT48THJNPD77haB6xLlQD9
      U5Pc0BdfogO3npDK8jzbDgZUOp7MWYYZslPFkgsCggEAL2ge0LQnRX25D1vhIize
      JzUuru5wUX+GsS24U6vtDW2CDVfErqKqeqnzWb+sPSsIMWU40VhHi+24rXB6/YON
      mM/1dsaanmutGkGIbAhgq8vYc+Yj127VSr+PrhCYBLxAcq6049+ZtZS6HxDWUbTR
      5dYEhRTvU6tRs3XatwqSza67le1xqY0NBp3XAHpWAHxB2Q69s5t3qikbtAUif3Su
      ayTRdTwiA2JOfq211+zKoeBHTMwAlCA4JRR7ckQx4dwJXAvS6x+pP59f3nbcNOEf
      iwTwZtepIX+NcPEIlcqPkCj/fsgmAtIvSXWciqhJIteSZZXlrisqL7kxNRvZ4cFe
      BQKCAQEA4J9kZpD9BtZ8xeqiu0Fno4mukk7eACHDxKfoBHe3KmBRBJD1ywoxgtks
      iZnzJq/aS3/U/5L9iN7uc8ZR23jTV5ite7xDt1/jydXx4mm/GoAclwgL1A9Av8dt
      y0kxm7BPycMAlpA45naVwDBD3TfgEIYYdP9a6L/ECHPX2BG8a6FtdW1g3NGTMIkU
      5q22fbzEKsxacURxMM/wBKBAFMrN/N1KHjl2qudiIEv7wm/qgJUjMrE0ViQ0Jb8b
      p24rcfkBsN2h/A95oyX0bnlRL4LUSlQDcmfc2NWylXjWjnBYeRBzzkouYLsdTgHK
      LnG2nPscWJpYbyj2sYzIdM1LgPOMIA==
      -----END PRIVATE KEY-----
    VerifyClient: false

Resources:
  - Name: tls-end-to-end-example.com
    Kind: ncproxy.io/rule
    Data:
      Rules:
      - Domain: tls-end-to-end-example.com
        Network: All
        Locations:
        - Path: /
          Target:
            Key: test-web-tls.global.c
            Port: 443
            # Use the client tls secret
            Ssl: test-client

Cargoes:
  - Name: test-web-tls
    # Use the server tls secret
    Secrets:
    - test-srv
    Container:
      Image: docker.io/nginx:alpine
      Cmd:
      - /bin/sh
      - -c
      - |
        echo 'server {
        listen 443 ssl;
        ssl_certificate /opt/nanocl.io/secrets/test-srv.crt;
        ssl_certificate_key /opt/nanocl.io/secrets/test-srv.key;
        ssl_client_certificate /opt/nanocl.io/secrets/test-srv.ca;
        root /usr/share/nginx/html;
        index index.html;
        }' > /etc/nginx/conf.d/default.conf;
        echo "<html><body><h1>Hello, World!</h1></body></html>" > /usr/share/nginx/html/index.html;
        nginx -g 'daemon off;'
```

---

## What’s Next?

With the foundation laid in this release, we’re in a strong position to add advanced networking features like multi-node support and enhanced IP address binding. The unified network model paired with our TLS-based end-to-end encryption helps to secure network traffic without sacrificing scalability.

Thank you for your continued support of Nanocl! As always, feel free to [join the discussion on GitHub](https://github.com/next-hat/nanocl) and stay tuned for more exciting updates.

**Happy deploying!**

_Nanocl Team_



---
title: Connect to ClickHouse
description: A list of tools and protocols for connecting to ClickHouse


---

# Interfaces

ClickHouse provides three network interfaces (they can be optionally wrapped in TLS for additional security):

-   [HTTP](http), which is documented and easy to use directly.
-   [Native TCP](../interfaces/tcp), which has less overhead.
-   [gRPC](grpc).

In most cases it is recommended to use appropriate tool or library instead of interacting with those directly. Officially supported by Yandex are the following:

-   [Command-line client](../interfaces/cli)
-   [JDBC driver](../interfaces/jdbc)
-   [ODBC driver](../interfaces/odbc)
-   [C++ client library](../interfaces/cpp)

There are also a wide range of third-party libraries for working with ClickHouse:

-   [Client libraries](../interfaces/third-party/client-libraries)
-   [Integrations](../interfaces/third-party/integrations)
-   [Visual interfaces](../interfaces/third-party/gui)


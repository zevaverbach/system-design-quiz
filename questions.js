const questions = [
    {
        question: "According to the CAP theorem, which three properties cannot all be simultaneously guaranteed by a distributed data store?",
        options: [
            "Consistency, Availability, Partition tolerance",
            "Clustering, Availability, Persistence",
            "Concurrency, Atomicity, Performance",
            "Correctness, Accessibility, Parallelism"
        ],
        correct: 0,
        funFact: "The CAP theorem was first conjectured by Eric Brewer in 2000 and formally proved by Seth Gilbert and Nancy Lynch at MIT in 2002.",
        wiki: "https://en.wikipedia.org/wiki/CAP_theorem"
    },
    {
        question: "In a system that chooses CP (consistency and partition tolerance) under the CAP theorem, what is sacrificed during a network partition?",
        options: [
            "Data integrity across all nodes in the cluster",
            "Availability, meaning some requests may be rejected",
            "Partition tolerance between datacenter regions",
            "Write throughput on the primary database node"
        ],
        correct: 1,
        funFact: "HBase and MongoDB (with majority write concern) are examples of CP systems that may refuse requests during partitions to maintain consistency.",
        wiki: "https://en.wikipedia.org/wiki/CAP_theorem"
    },
    {
        question: "Which consistency model allows a read to return a stale value temporarily, but guarantees all replicas will converge to the same value given enough time?",
        options: [
            "Eventual consistency",
            "Linearizable consistency with total ordering",
            "Causal consistency with vector clocks",
            "Strict consistency with bounded staleness"
        ],
        correct: 0,
        funFact: "Amazon's DynamoDB and Apache Cassandra both use eventual consistency by default, allowing faster writes at the cost of temporary staleness.",
        wiki: "https://en.wikipedia.org/wiki/Eventual_consistency"
    },
    {
        question: "What does linearizability guarantee in a distributed system?",
        options: [
            "Operations are logged in the order they were submitted by clients",
            "Operations appear to execute atomically at some point between invocation and response",
            "Operations complete within a bounded time regardless of system load",
            "Operations are distributed evenly across all nodes in the cluster"
        ],
        correct: 1,
        funFact: "Linearizability was first defined by Maurice Herlihy and Jeannette Wing in 1990. It is one of the strongest single-object consistency models.",
        wiki: "https://en.wikipedia.org/wiki/Linearizability"
    },
    {
        question: "Which replication strategy sends write operations to all replicas simultaneously rather than routing through a single leader?",
        options: [
            "Leaderless replication with anti-entropy",
            "Chain replication with ordered forwarding",
            "Quorum-based replication with read repair",
            "Multi-leader (multi-master) replication"
        ],
        correct: 3,
        funFact: "Leaderless replication, used by Cassandra and Riak, allows any node to accept writes. Conflicts are resolved using techniques like last-write-wins or vector clocks.",
        wiki: "https://en.wikipedia.org/wiki/Multi-master_replication"
    },
    {
        question: "In a quorum-based replication system with N replicas, what condition on reads (R) and writes (W) guarantees strong consistency?",
        options: [
            "R + W must equal N exactly to balance load",
            "R + W must be greater than N",
            "R must equal W and both must equal N",
            "R and W must each be greater than N/3"
        ],
        correct: 1,
        funFact: "DynamoDB allows tuning R and W values. A common configuration is N=3, W=2, R=2, which ensures R+W > N and provides strong consistency.",
        wiki: "https://en.wikipedia.org/wiki/Quorum_(distributed_computing)"
    },
    {
        question: "What type of conflict resolution does a CRDT (Conflict-free Replicated Data Type) provide?",
        options: [
            "Automatic convergence without coordination between replicas",
            "Manual conflict resolution requiring developer-written merge handlers",
            "Leader-based resolution where the primary node breaks all ties",
            "Timestamp-based resolution using synchronized physical clocks"
        ],
        correct: 0,
        funFact: "CRDTs are used in collaborative editing tools like Figma. They are mathematically guaranteed to converge regardless of the order operations are applied.",
        wiki: "https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type"
    },
    {
        question: "What problem does a vector clock solve in distributed systems?",
        options: [
            "Synchronizing physical wall-clock time across all nodes",
            "Balancing the load of read requests across replica nodes",
            "Reducing the latency of cross-datacenter write operations",
            "Detecting and ordering causally related events across nodes"
        ],
        correct: 3,
        funFact: "Vector clocks were introduced by Colin Fidge and Friedemann Mattern independently in 1988. Amazon's original Dynamo paper used them for conflict detection.",
        wiki: "https://en.wikipedia.org/wiki/Vector_clock"
    },
    {
        question: "Which isolation level in a database prevents dirty reads but still allows non-repeatable reads and phantom reads?",
        options: [
            "Read committed",
            "Repeatable read with snapshot versioning",
            "Read uncommitted with no lock acquisition",
            "Serializable isolation with full locking"
        ],
        correct: 0,
        funFact: "Read committed is the default isolation level in PostgreSQL and Oracle. It prevents reading uncommitted data but does not prevent the same query returning different results in one transaction.",
        wiki: "https://en.wikipedia.org/wiki/Isolation_(database_systems)"
    },
    {
        question: "What does the 'D' in the ACID properties of database transactions stand for?",
        options: [
            "Durability, meaning committed data survives system failures",
            "Distribution, meaning data is replicated across nodes",
            "Determinism, meaning transactions produce predictable results",
            "Dependency, meaning transactions respect data relationships"
        ],
        correct: 0,
        funFact: "Durability is typically implemented using write-ahead logging (WAL). The database writes changes to a log on durable storage before applying them to the main data files.",
        wiki: "https://en.wikipedia.org/wiki/ACID"
    },
    {
        question: "What does the BASE acronym stand for in the context of distributed databases?",
        options: [
            "Balanced Architecture for Scalable Environments",
            "Backup And Sync Eventually",
            "Batch-oriented Asynchronous Stateless Execution",
            "Basically Available, Soft state, Eventually consistent"
        ],
        correct: 3,
        funFact: "BASE was proposed as an alternative to ACID for systems that prioritize availability. The term was coined by Eric Brewer as a deliberate contrast to ACID.",
        wiki: "https://en.wikipedia.org/wiki/Eventual_consistency"
    },
    {
        question: "In a two-phase commit protocol, what happens if the coordinator crashes after sending 'prepare' messages but before sending 'commit'?",
        options: [
            "Participants that voted 'yes' must block and wait for the coordinator to recover",
            "All participants automatically commit after a fixed timeout period",
            "Participants roll back immediately and notify all other nodes",
            "A new coordinator is elected via a Paxos consensus round"
        ],
        correct: 0,
        funFact: "This blocking behavior is the main drawback of two-phase commit. The three-phase commit protocol was designed to address this issue by adding a pre-commit phase.",
        wiki: "https://en.wikipedia.org/wiki/Two-phase_commit_protocol"
    },
    {
        question: "What is the primary difference between horizontal and vertical scaling?",
        options: [
            "Horizontal scaling upgrades hardware resources on existing machines while vertical adds more machines",
            "Horizontal scaling adds more machines to a system while vertical scaling upgrades the hardware of existing machines",
            "Horizontal scaling is for databases only while vertical scaling is for application servers only",
            "Horizontal scaling requires a load balancer while vertical scaling requires a message queue"
        ],
        correct: 1,
        funFact: "Google's infrastructure famously pioneered horizontal scaling with commodity hardware. Their original servers were built from cheap consumer components rather than expensive enterprise hardware.",
        wiki: "https://en.wikipedia.org/wiki/Scalability"
    },
    {
        question: "What does 'elasticity' mean in the context of cloud computing and scalability?",
        options: [
            "The ability to migrate workloads between different cloud providers seamlessly",
            "The ability to automatically scale resources up or down based on current demand",
            "The ability to encrypt and decrypt data without affecting system performance",
            "The ability to recover from hardware failures without manual intervention"
        ],
        correct: 1,
        funFact: "AWS Auto Scaling can add or remove EC2 instances in minutes based on metrics like CPU utilization, allowing applications to handle traffic spikes without over-provisioning.",
        wiki: "https://en.wikipedia.org/wiki/Elasticity_(cloud_computing)"
    },
    {
        question: "Which scaling approach is generally more cost-effective for handling unpredictable traffic spikes?",
        options: [
            "Vertical scaling with reserved high-capacity instances",
            "Horizontal scaling with auto-scaling policies",
            "Diagonal scaling with pre-warmed standby servers",
            "Manual scaling with capacity planning forecasts"
        ],
        correct: 1,
        funFact: "Netflix uses auto-scaling extensively. During peak hours, their infrastructure can scale to handle over 100 million hours of content streaming per day.",
        wiki: "https://en.wikipedia.org/wiki/Autoscaling"
    },
    {
        question: "What is a 'stateless' service, and why does it simplify horizontal scaling?",
        options: [
            "A service that stores no data and simplifies scaling by eliminating backup needs",
            "A service that uses fixed IP addresses and simplifies scaling by removing DNS lookups",
            "A service that runs without configuration files and simplifies scaling by removing deployment steps",
            "A service that keeps no session data between requests, so any instance can handle any request"
        ],
        correct: 3,
        funFact: "The Twelve-Factor App methodology recommends stateless processes as one of its core principles. Session data should be stored in external backing services like Redis or a database.",
        wiki: "https://en.wikipedia.org/wiki/Stateless_protocol"
    },
    {
        question: "What is Amdahl's Law primarily used to evaluate in the context of system performance?",
        options: [
            "The relationship between cache size and cache hit rate",
            "The optimal number of database replicas for a given read load",
            "The theoretical speedup of a task when adding more parallel resources",
            "The maximum throughput of a network link under congestion"
        ],
        correct: 2,
        funFact: "Amdahl's Law shows that if 5% of a program is serial, the maximum speedup from parallelization is 20x regardless of how many processors you add.",
        wiki: "https://en.wikipedia.org/wiki/Amdahl%27s_law"
    },
    {
        question: "What is a 'thundering herd' problem in the context of scalable systems?",
        options: [
            "When a large number of processes or clients simultaneously contend for the same resource",
            "When a single slow microservice causes cascading timeouts across the entire service mesh",
            "When a primary database fails and all replicas simultaneously try to become the new leader",
            "When auto-scaling launches too many instances during a brief spike and overloads the database"
        ],
        correct: 0,
        funFact: "Cache stampedes are a common example: when a popular cache entry expires, hundreds of concurrent requests may all try to recompute the same value simultaneously.",
        wiki: "https://en.wikipedia.org/wiki/Thundering_herd_problem"
    },
    {
        question: "What technique splits a monolithic database into smaller, independent pieces to improve write scalability?",
        options: [
            "Connection pooling across multiple application servers",
            "Database sharding by partitioning data across multiple nodes",
            "Read replicas with query routing at the load balancer",
            "Vertical partitioning by normalizing tables into smaller schemas"
        ],
        correct: 1,
        funFact: "Instagram sharded their PostgreSQL database when they hit 25 million users. They use a shard ID embedded in generated IDs to route queries to the correct shard.",
        wiki: "https://en.wikipedia.org/wiki/Shard_(database_architecture)"
    },
    {
        question: "What is the purpose of back-pressure in a scalable system?",
        options: [
            "To slow down producers when consumers cannot keep up with the rate of incoming data",
            "To compress data before transmitting it between services to reduce bandwidth usage",
            "To redirect traffic to secondary datacenters during primary datacenter maintenance windows",
            "To encrypt sensitive fields in messages passing through a public network boundary"
        ],
        correct: 0,
        funFact: "Reactive Streams, a specification implemented by Project Reactor and RxJava, provides built-in back-pressure support. TCP also implements back-pressure via its flow control window.",
        wiki: "https://en.wikipedia.org/wiki/Back_pressure"
    },
    {
        question: "What does the 'shared nothing' architecture pattern mean for distributed systems?",
        options: [
            "All communication between nodes happens through shared message queues rather than direct calls",
            "All nodes share a single distributed file system but maintain separate compute resources",
            "Nodes share a global configuration service but maintain independent data stores",
            "Each node operates independently with its own memory and storage, sharing no resources with other nodes"
        ],
        correct: 3,
        funFact: "The shared-nothing architecture is used by systems like Cassandra and CockroachDB. It avoids contention bottlenecks since no single resource is shared across nodes.",
        wiki: "https://en.wikipedia.org/wiki/Shared-nothing_architecture"
    },
    {
        question: "What is the primary benefit of connection pooling in a scalable web application?",
        options: [
            "It encrypts all database connections to prevent eavesdropping on the network",
            "It routes queries to the least-loaded database replica automatically",
            "It compresses query results to reduce network bandwidth between app and database",
            "It reuses existing database connections instead of creating new ones for each request"
        ],
        correct: 3,
        funFact: "PgBouncer is a popular connection pooler for PostgreSQL. A single PgBouncer instance can multiplex thousands of application connections into a small pool of database connections.",
        wiki: "https://en.wikipedia.org/wiki/Connection_pool"
    },
    {
        question: "Which load balancing algorithm distributes requests to the server with the fewest active connections?",
        options: [
            "Round robin with weighted priorities",
            "Consistent hashing with virtual nodes",
            "Least connections",
            "Random selection with health checking"
        ],
        correct: 2,
        funFact: "The least-connections algorithm works well when requests have varying processing times. It naturally sends more traffic to faster servers since they free up connections sooner.",
        wiki: "https://en.wikipedia.org/wiki/Load_balancing_(computing)"
    },
    {
        question: "What is the key advantage of a Layer 7 load balancer over a Layer 4 load balancer?",
        options: [
            "It can inspect and route based on application-level data like HTTP headers and URLs",
            "It operates at the transport layer for lower latency and higher throughput",
            "It can balance TCP and UDP traffic without requiring protocol-specific configuration",
            "It uses fewer system resources because it only examines IP addresses and ports"
        ],
        correct: 0,
        funFact: "Layer 7 load balancers can do content-based routing, sending API requests to one server pool and static files to another. NGINX and HAProxy both support L7 load balancing.",
        wiki: "https://en.wikipedia.org/wiki/Load_balancing_(computing)"
    },
    {
        question: "What problem does 'sticky sessions' (session affinity) solve in load balancing?",
        options: [
            "It prevents distributed denial-of-service attacks by blocking repeated requests from a single IP",
            "It ensures a client's requests are always routed to the same backend server",
            "It guarantees that all servers receive an equal share of incoming traffic over time",
            "It allows the load balancer to cache responses and serve them without hitting the backend"
        ],
        correct: 1,
        funFact: "Sticky sessions can reduce cache effectiveness and create uneven load distribution. Modern architectures prefer storing session data in shared stores like Redis to avoid needing stickiness.",
        wiki: "https://en.wikipedia.org/wiki/Load_balancing_(computing)"
    },
    {
        question: "What is a health check in the context of load balancing?",
        options: [
            "A security scan that validates SSL certificates on all backend servers",
            "A periodic probe sent to backend servers to verify they can handle requests",
            "A log analysis tool that identifies servers with high error rates",
            "A capacity test that measures the maximum throughput of each server"
        ],
        correct: 1,
        funFact: "Health checks can be passive (monitoring response codes of real traffic) or active (sending synthetic probe requests). AWS ALB supports both HTTP and TCP health checks.",
        wiki: "https://en.wikipedia.org/wiki/Load_balancing_(computing)"
    },
    {
        question: "What does the 'weighted round robin' load balancing algorithm allow administrators to configure?",
        options: [
            "Traffic proportions so that more powerful servers receive a larger share of requests",
            "Timeout durations that vary per server based on their geographic location",
            "Priority levels that determine which requests are processed first during high load",
            "Failover sequences that determine the order servers take over during outages"
        ],
        correct: 0,
        funFact: "Weighted round robin is useful during rolling deployments or when running heterogeneous hardware. A server with weight 3 receives three times the traffic of a server with weight 1.",
        wiki: "https://en.wikipedia.org/wiki/Weighted_round_robin"
    },
    {
        question: "What is the purpose of a Global Server Load Balancer (GSLB)?",
        options: [
            "To balance traffic between containers running on the same physical host",
            "To distribute database queries across read replicas within a single datacenter",
            "To monitor and restart unhealthy application processes on individual servers",
            "To distribute traffic across multiple geographically distributed datacenters"
        ],
        correct: 3,
        funFact: "GSLB typically uses DNS-based routing to direct users to the nearest healthy datacenter. AWS Route 53 and Cloudflare both offer GSLB capabilities with latency-based routing.",
        wiki: "https://en.wikipedia.org/wiki/Global_server_load_balancing"
    },
    {
        question: "In a microservices architecture, what role does a service mesh sidecar proxy play in load balancing?",
        options: [
            "It manages service-to-service traffic by intercepting and routing requests at the application layer",
            "It replaces the API gateway by handling all external client authentication and routing",
            "It provides persistent storage for session data shared between microservice instances",
            "It aggregates logs from all services and forwards them to a centralized monitoring system"
        ],
        correct: 0,
        funFact: "Envoy, the sidecar proxy used in Istio, can perform client-side load balancing with algorithms like round robin, least request, and random selection without any application code changes.",
        wiki: "https://en.wikipedia.org/wiki/Service_mesh"
    },
    {
        question: "What is 'connection draining' (or 'deregistration delay') in load balancing?",
        options: [
            "Closing idle connections to free up resources on the load balancer",
            "Allowing in-flight requests to complete before removing a server from the pool",
            "Limiting the maximum number of concurrent connections to each backend server",
            "Distributing new connections evenly by resetting the round-robin counter periodically"
        ],
        correct: 1,
        funFact: "AWS ELB allows configuring a deregistration delay (default 300 seconds). During this period, the load balancer stops sending new requests but lets existing requests finish gracefully.",
        wiki: "https://en.wikipedia.org/wiki/Load_balancing_(computing)"
    },
    {
        question: "What is the primary purpose of database indexing?",
        options: [
            "To compress table data and reduce storage costs on disk",
            "To enforce referential integrity constraints between related tables",
            "To speed up data retrieval by providing efficient lookup paths",
            "To replicate data across multiple servers for high availability"
        ],
        correct: 2,
        funFact: "A B-tree index on a table with 1 billion rows can locate any row in roughly 30 disk reads. Without an index, the database might need to scan all 1 billion rows.",
        wiki: "https://en.wikipedia.org/wiki/Database_index"
    },
    {
        question: "What data structure do most relational databases use for their default index type?",
        options: [
            "Hash table with chaining for collision resolution",
            "Skip list with probabilistic balancing layers",
            "B-tree or B+tree with sorted leaf nodes",
            "Red-black tree with self-balancing rotations"
        ],
        correct: 2,
        funFact: "B+trees are preferred over B-trees for database indexes because all data lives in leaf nodes, which are linked together. This makes range scans very efficient.",
        wiki: "https://en.wikipedia.org/wiki/B%2B_tree"
    },
    {
        question: "What is the purpose of a write-ahead log (WAL) in a relational database?",
        options: [
            "To cache frequently accessed query results in memory for faster reads",
            "To record all changes before they are applied to data files, ensuring durability",
            "To maintain a history of schema migrations applied to the database",
            "To track which queries are running and enforce timeout limits on long queries"
        ],
        correct: 1,
        funFact: "PostgreSQL's WAL allows point-in-time recovery by replaying logged changes. It also enables streaming replication by shipping WAL records to standby servers.",
        wiki: "https://en.wikipedia.org/wiki/Write-ahead_logging"
    },
    {
        question: "What is database normalization primarily designed to reduce?",
        options: [
            "Data redundancy and update anomalies across related tables",
            "Query execution time for complex joins between multiple tables",
            "Storage costs by compressing infrequently accessed columns",
            "Network latency between the application server and database"
        ],
        correct: 0,
        funFact: "Edgar Codd proposed the first three normal forms in 1970. While normalization reduces redundancy, highly normalized schemas may require more joins, leading some systems to intentionally denormalize for read performance.",
        wiki: "https://en.wikipedia.org/wiki/Database_normalization"
    },
    {
        question: "When might denormalization be a good strategy for a database schema?",
        options: [
            "When the application needs strong ACID guarantees for financial transactions",
            "When write operations far outnumber read operations in the workload",
            "When the database has limited disk space and needs to reduce storage usage",
            "When read performance is critical and the cost of redundant data is acceptable"
        ],
        correct: 3,
        funFact: "Facebook denormalizes heavily in their TAO system, which serves social graph data. By pre-joining data, they avoid expensive joins at query time for their read-heavy workload.",
        wiki: "https://en.wikipedia.org/wiki/Denormalization"
    },
    {
        question: "What is an MVCC (Multi-Version Concurrency Control) system designed to achieve?",
        options: [
            "Automatic failover between primary and standby database instances",
            "Replication of schema changes across all database nodes simultaneously",
            "Distributing write operations evenly across shards in a partitioned database",
            "Allowing multiple transactions to read data without blocking writers"
        ],
        correct: 3,
        funFact: "PostgreSQL and MySQL InnoDB both use MVCC. Each transaction sees a snapshot of the database, so readers never block writers and writers never block readers.",
        wiki: "https://en.wikipedia.org/wiki/Multiversion_concurrency_control"
    },
    {
        question: "What is a materialized view in a relational database?",
        options: [
            "A precomputed query result stored physically on disk and refreshed periodically",
            "A virtual table defined by a query that is recomputed on every access",
            "A temporary table that exists only for the duration of a single session",
            "A read-only copy of a table that is replicated to standby servers"
        ],
        correct: 0,
        funFact: "Materialized views are especially useful for expensive aggregation queries. PostgreSQL supports concurrent refresh, allowing reads during the refresh process.",
        wiki: "https://en.wikipedia.org/wiki/Materialized_view"
    },
    {
        question: "What is a covering index in database optimization?",
        options: [
            "An index that spans multiple tables through foreign key relationships",
            "An index that covers both the primary and secondary keys of a table",
            "An index that automatically updates when the underlying table schema changes",
            "An index that contains all columns needed by a query, avoiding table lookups"
        ],
        correct: 3,
        funFact: "When a query can be answered entirely from an index without accessing the table data (an 'index-only scan'), it can be orders of magnitude faster, especially for wide tables.",
        wiki: "https://en.wikipedia.org/wiki/Database_index"
    },
    {
        question: "What type of database replication sends changes to replicas synchronously before acknowledging a write?",
        options: [
            "Synchronous replication requiring all replicas to confirm before commit",
            "Semi-synchronous replication with at-least-one replica acknowledgment",
            "Asynchronous replication with eventual delivery guarantees",
            "Logical replication using row-level change data capture events"
        ],
        correct: 0,
        funFact: "Synchronous replication provides zero data loss but increases write latency. PostgreSQL supports synchronous replication where the primary waits for at least one standby to confirm.",
        wiki: "https://en.wikipedia.org/wiki/Replication_(computing)"
    },
    {
        question: "What is the 'N+1 query problem' in database access patterns?",
        options: [
            "When a query returns N+1 rows instead of the expected N rows due to off-by-one errors",
            "When an application issues one query for a list and then N additional queries for each item",
            "When a sharded database requires N+1 nodes to tolerate N simultaneous failures",
            "When a load balancer routes N+1 connections to a single database instance"
        ],
        correct: 1,
        funFact: "ORMs like ActiveRecord and Hibernate are notorious for causing N+1 queries. Solutions include eager loading (JOIN queries) and batch loading (WHERE IN clauses).",
        wiki: "https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping"
    },
    {
        question: "Which type of NoSQL database stores data as key-value pairs and is optimized for high-throughput lookups by key?",
        options: [
            "Document stores like MongoDB that use JSON-like structures",
            "Key-value stores like Redis and DynamoDB",
            "Graph databases like Neo4j that use nodes and edges",
            "Wide-column stores like Cassandra that use column families"
        ],
        correct: 1,
        funFact: "Redis can process over 100,000 operations per second on a single node. Its in-memory design makes it ideal for caching, session storage, and real-time leaderboards.",
        wiki: "https://en.wikipedia.org/wiki/Key%E2%80%93value_database"
    },
    {
        question: "What query language does Apache Cassandra use for data manipulation?",
        options: [
            "MQL (MongoDB Query Language), which uses JSON-based expressions",
            "GraphQL, which allows flexible queries with nested field selection",
            "CQL (Cassandra Query Language), which resembles SQL but has different semantics",
            "SPARQL, which is designed for querying graph-structured data"
        ],
        correct: 2,
        funFact: "Despite looking like SQL, CQL does not support joins, subqueries, or arbitrary WHERE clauses. Queries must be designed around the partition key for efficient access.",
        wiki: "https://en.wikipedia.org/wiki/Apache_Cassandra"
    },
    {
        question: "What data model does MongoDB use to store records?",
        options: [
            "Fixed-schema rows organized into relational tables with foreign keys",
            "Flexible JSON-like documents organized into collections",
            "Column families with rows containing dynamic sets of columns",
            "Directed graphs with nodes, edges, and property annotations"
        ],
        correct: 1,
        funFact: "MongoDB documents can be up to 16MB in size. For larger files, MongoDB provides GridFS, which splits files into chunks and stores them across multiple documents.",
        wiki: "https://en.wikipedia.org/wiki/MongoDB"
    },
    {
        question: "In which scenario would a graph database like Neo4j be most appropriate?",
        options: [
            "Modeling and traversing complex relationships like social networks",
            "Caching session tokens for a web application with millions of users",
            "Managing a product catalog with full-text search capabilities",
            "Storing and querying time-series sensor data from IoT devices"
        ],
        correct: 0,
        funFact: "Graph databases can traverse millions of relationships per second. LinkedIn uses a graph database to power features like 'People You May Know' and connection path queries.",
        wiki: "https://en.wikipedia.org/wiki/Graph_database"
    },
    {
        question: "What is the primary advantage of a wide-column store like Apache Cassandra over a relational database?",
        options: [
            "Built-in support for complex joins and multi-table transactions",
            "Superior performance for ad-hoc analytical queries with aggregations",
            "Linear horizontal scalability for high write throughput across many nodes",
            "Automatic schema enforcement and referential integrity checking"
        ],
        correct: 2,
        funFact: "Apple runs one of the largest Cassandra deployments in the world, with over 150,000 nodes storing more than 10 petabytes of data for services like iMessage and Siri.",
        wiki: "https://en.wikipedia.org/wiki/Wide-column_store"
    },
    {
        question: "What is a 'partition key' in the context of a distributed NoSQL database?",
        options: [
            "A unique identifier used to authenticate client connections to the database cluster",
            "A configuration parameter that sets the maximum number of partitions per node",
            "The field used to determine which node in the cluster stores a given piece of data",
            "A timestamp column used to order data chronologically within each table"
        ],
        correct: 2,
        funFact: "Choosing the right partition key is critical for NoSQL performance. A poor partition key can create 'hot partitions' where one node handles disproportionate traffic.",
        wiki: "https://en.wikipedia.org/wiki/Partition_(database)"
    },
    {
        question: "What is the LSM tree (Log-Structured Merge-tree) commonly used for in databases?",
        options: [
            "Providing in-memory indexing for read-heavy analytical workloads",
            "Optimizing write-heavy workloads by batching writes to sorted structures",
            "Enforcing referential integrity constraints across distributed tables",
            "Compressing cold data for long-term archival on object storage"
        ],
        correct: 1,
        funFact: "LSM trees power the storage engines of Cassandra, LevelDB, and RocksDB. They convert random writes into sequential writes, which is much faster on both SSDs and HDDs.",
        wiki: "https://en.wikipedia.org/wiki/Log-structured_merge-tree"
    },
    {
        question: "What is 'tunable consistency' as offered by databases like Cassandra?",
        options: [
            "The ability to choose different consistency levels on a per-query basis",
            "The ability to change the replication factor after data has been written",
            "The ability to switch between SQL and NoSQL query interfaces dynamically",
            "The ability to adjust the compression algorithm used for stored data"
        ],
        correct: 0,
        funFact: "In Cassandra, you can use QUORUM consistency for important writes and ONE consistency for less critical reads. This lets you trade consistency for latency on a per-query basis.",
        wiki: "https://en.wikipedia.org/wiki/Apache_Cassandra"
    },
    {
        question: "What caching strategy first checks the cache and only queries the database on a cache miss?",
        options: [
            "Write-through caching with synchronous updates",
            "Write-behind caching with asynchronous batch writes",
            "Refresh-ahead caching with predictive preloading",
            "Cache-aside (lazy loading) with on-demand population"
        ],
        correct: 3,
        funFact: "Cache-aside is the most common caching pattern. The application is responsible for reading from and writing to the cache, giving it full control over cache population and invalidation.",
        wiki: "https://en.wikipedia.org/wiki/Cache_(computing)"
    },
    {
        question: "In a write-through caching strategy, when is data written to the backing store?",
        options: [
            "Only when the cache entry expires or is evicted due to memory pressure",
            "At regular intervals as a batch operation during low-traffic periods",
            "Asynchronously in the background after the cache write is acknowledged",
            "Synchronously at the same time as the cache is updated on every write"
        ],
        correct: 3,
        funFact: "Write-through caching ensures the cache and database are always consistent but adds latency to every write. CPU caches use write-through or write-back policies for the same trade-off.",
        wiki: "https://en.wikipedia.org/wiki/Cache_(computing)"
    },
    {
        question: "What is the primary purpose of a CDN (Content Delivery Network) cache?",
        options: [
            "To store user session data closer to application servers for faster authentication",
            "To replicate database queries across multiple regions for lower read latency",
            "To serve static and cacheable content from edge servers geographically close to users",
            "To buffer incoming write requests and batch them for efficient database insertion"
        ],
        correct: 2,
        funFact: "Cloudflare operates over 300 data centers worldwide. When a CDN caches content at the edge, it can reduce latency from hundreds of milliseconds to single-digit milliseconds.",
        wiki: "https://en.wikipedia.org/wiki/Content_delivery_network"
    },
    {
        question: "What cache eviction policy removes the entry that has not been accessed for the longest time?",
        options: [
            "FIFO (First In, First Out) based on insertion order",
            "LFU (Least Frequently Used) based on access count",
            "Random eviction with uniform probability selection",
            "LRU (Least Recently Used) based on last access time"
        ],
        correct: 3,
        funFact: "Redis implements an approximated LRU algorithm that samples a small number of keys and evicts the least recently used among the sample. This is more memory-efficient than true LRU.",
        wiki: "https://en.wikipedia.org/wiki/Cache_replacement_policies"
    },
    {
        question: "What is a 'cache stampede' and how does it typically occur?",
        options: [
            "When a cache server runs out of memory and starts evicting entries faster than they can be repopulated",
            "When multiple clients simultaneously try to rebuild the same expired cache entry",
            "When a cache node fails and its entries are redistributed to the remaining nodes",
            "When cache keys collide due to a poor hashing function causing incorrect data retrieval"
        ],
        correct: 1,
        funFact: "Techniques to prevent cache stampedes include probabilistic early expiration, locking (only one client rebuilds), and 'stale-while-revalidate' where stale data is served while refreshing.",
        wiki: "https://en.wikipedia.org/wiki/Cache_stampede"
    },
    {
        question: "What problem does a 'cache-aside with TTL' strategy NOT solve by itself?",
        options: [
            "Reducing database load for frequently accessed data",
            "Providing faster response times for repeated queries",
            "Ensuring the cache always reflects the latest database state immediately",
            "Automatically populating the cache with data on first access"
        ],
        correct: 2,
        funFact: "For use cases requiring strong consistency between cache and database, techniques like change data capture (CDC) can be used to update the cache whenever the database changes.",
        wiki: "https://en.wikipedia.org/wiki/Cache_(computing)"
    },
    {
        question: "What is the purpose of consistent hashing in distributed caching systems?",
        options: [
            "Ensuring that all cache entries have the same time-to-live duration",
            "Guaranteeing strong consistency between cache replicas in different regions",
            "Minimizing the number of keys that need to be remapped when cache nodes are added or removed",
            "Providing cryptographic verification that cached data has not been tampered with"
        ],
        correct: 2,
        funFact: "Consistent hashing was introduced by Karger et al. in 1997 for web caching. When a node is added to a ring of N nodes, only about 1/N of the keys need to be remapped.",
        wiki: "https://en.wikipedia.org/wiki/Consistent_hashing"
    },
    {
        question: "What is a 'cache warming' strategy?",
        options: [
            "Gradually increasing the TTL of cache entries during peak traffic hours",
            "Migrating cache data from older nodes to newer nodes during hardware upgrades",
            "Pre-populating the cache with expected hot data before it is requested by users",
            "Compressing cached values to fit more entries within the available memory"
        ],
        correct: 2,
        funFact: "Cache warming is critical after deployments or cache restarts. Without it, a 'cold cache' can cause a surge of database queries that may overwhelm the backend.",
        wiki: "https://en.wikipedia.org/wiki/Cache_(computing)"
    },
    {
        question: "What is a Bloom filter commonly used for in caching and database systems?",
        options: [
            "Quickly determining whether an element is definitely not in a set with no false negatives",
            "Compressing cached data to reduce memory consumption on cache servers",
            "Sorting cache entries by frequency of access for optimal eviction ordering",
            "Distributing cache keys evenly across nodes using probabilistic hash functions"
        ],
        correct: 0,
        funFact: "Google's Bigtable uses Bloom filters to avoid unnecessary disk reads. A Bloom filter can tell you an entry definitely does not exist, saving an expensive disk lookup.",
        wiki: "https://en.wikipedia.org/wiki/Bloom_filter"
    },
    {
        question: "What is the difference between Redis and Memcached for caching?",
        options: [
            "Redis supports rich data structures like lists and sorted sets while Memcached stores only simple strings",
            "Memcached supports data persistence to disk while Redis is purely in-memory",
            "Redis is designed for key-value lookups while Memcached is designed for document storage",
            "Memcached supports built-in clustering while Redis requires external proxy software"
        ],
        correct: 0,
        funFact: "Redis supports strings, hashes, lists, sets, sorted sets, bitmaps, and HyperLogLog. Memcached is simpler but can be more memory-efficient for plain key-value string caching.",
        wiki: "https://en.wikipedia.org/wiki/Redis"
    },
    {
        question: "What is the primary benefit of using a message queue between two services?",
        options: [
            "Decoupling the producer and consumer so they can operate independently",
            "Encrypting data in transit between services without application changes",
            "Providing a shared database for both services to read and write from",
            "Reducing the total memory usage of both services by offloading data"
        ],
        correct: 0,
        funFact: "Message queues enable temporal decoupling: the producer and consumer don't need to be running at the same time. This is essential for handling traffic spikes gracefully.",
        wiki: "https://en.wikipedia.org/wiki/Message_queue"
    },
    {
        question: "What delivery guarantee does 'exactly-once' processing provide, and why is it difficult to achieve?",
        options: [
            "It guarantees messages are delivered at most once, which is difficult because networks can duplicate packets",
            "It guarantees all consumers receive every message, which is difficult because consumer groups share partitions",
            "It guarantees messages are delivered in strict order, which is difficult because partitions process messages in parallel",
            "It guarantees no message is lost or processed more than once, which is difficult because failures can occur between processing and acknowledgment"
        ],
        correct: 3,
        funFact: "Kafka achieves effectively exactly-once semantics using idempotent producers and transactional writes. True exactly-once across distributed systems requires careful coordination.",
        wiki: "https://en.wikipedia.org/wiki/Message_delivery"
    },
    {
        question: "How does Apache Kafka differ from traditional message queues like RabbitMQ in its storage model?",
        options: [
            "Kafka deletes messages immediately after delivery while RabbitMQ retains them on disk",
            "Kafka persists messages in an append-only log that consumers read from, while RabbitMQ pushes messages and removes them once acknowledged",
            "Kafka stores messages temporarily in memory while RabbitMQ uses persistent disk storage",
            "Kafka uses a relational database backend while RabbitMQ uses an in-memory key-value store"
        ],
        correct: 1,
        funFact: "Kafka's log-based design allows multiple consumer groups to read the same data independently at different speeds. LinkedIn processes over 7 trillion messages per day through Kafka.",
        wiki: "https://en.wikipedia.org/wiki/Apache_Kafka"
    },
    {
        question: "What is a 'dead letter queue' used for in message processing systems?",
        options: [
            "Capturing messages that have failed processing repeatedly and cannot be handled normally",
            "Holding high-priority messages that should be processed before all other messages",
            "Archiving successfully processed messages for auditing and compliance purposes",
            "Storing messages that have expired past their time-to-live before being consumed"
        ],
        correct: 0,
        funFact: "Dead letter queues are essential for debugging. AWS SQS allows configuring a maximum receive count; after that many failed processing attempts, the message moves to the DLQ.",
        wiki: "https://en.wikipedia.org/wiki/Dead_letter_queue"
    },
    {
        question: "What is the fan-out messaging pattern?",
        options: [
            "Aggregating messages from multiple producers into a single ordered stream",
            "Distributing a single message to multiple subscribers or queues simultaneously",
            "Routing messages to different queues based on message content or headers",
            "Splitting a large message into smaller chunks for parallel processing"
        ],
        correct: 1,
        funFact: "SNS (Simple Notification Service) on AWS implements fan-out by publishing one message to a topic that is delivered to multiple SQS queues, Lambda functions, or HTTP endpoints.",
        wiki: "https://en.wikipedia.org/wiki/Fan-out_(software)"
    },
    {
        question: "In Kafka, what is a 'consumer group' and what does it enable?",
        options: [
            "A set of Kafka brokers that replicate the same partition for fault tolerance",
            "A set of topics that are logically grouped for administrative management",
            "A set of consumers that coordinate to divide partition consumption for parallel processing",
            "A set of producers that write to the same topic using a shared serialization format"
        ],
        correct: 2,
        funFact: "Within a consumer group, each partition is consumed by exactly one consumer. Adding more consumers than partitions means some consumers will be idle. This is Kafka's unit of parallelism.",
        wiki: "https://en.wikipedia.org/wiki/Apache_Kafka"
    },
    {
        question: "What problem does message ordering guarantee solve, and which systems provide it?",
        options: [
            "It prevents duplicate messages from being processed, as provided by RabbitMQ with deduplication plugins",
            "It ensures all consumers receive messages simultaneously, as provided by Redis Pub/Sub channels",
            "It guarantees messages are encrypted in transit, as provided by all modern message brokers by default",
            "It ensures consumers process messages in the sequence they were produced, as Kafka provides per-partition"
        ],
        correct: 3,
        funFact: "Kafka guarantees ordering within a partition but not across partitions. To maintain order for a specific entity, all its events should use the same partition key.",
        wiki: "https://en.wikipedia.org/wiki/Apache_Kafka"
    },
    {
        question: "What is event sourcing as an architectural pattern?",
        options: [
            "Publishing application events to a monitoring dashboard for real-time observability",
            "Routing events between microservices through a centralized API gateway",
            "Using webhooks to notify external systems when application state changes",
            "Storing the full sequence of state-changing events rather than just the current state"
        ],
        correct: 3,
        funFact: "Event sourcing is used in financial systems where a complete audit trail is required. The current state can be reconstructed by replaying all events from the beginning.",
        wiki: "https://en.wikipedia.org/wiki/Event_sourcing"
    },
    {
        question: "What is the main advantage of a microservices architecture over a monolithic architecture?",
        options: [
            "Lower operational overhead due to fewer deployable components",
            "Simpler debugging because all code runs in a single process",
            "Faster inter-service communication via shared memory access",
            "Independent deployment and scaling of individual services"
        ],
        correct: 3,
        funFact: "Amazon's transition from monolith to microservices in the early 2000s was driven by their 'two-pizza teams' philosophy: each service should be owned by a team small enough to feed with two pizzas.",
        wiki: "https://en.wikipedia.org/wiki/Microservices"
    },
    {
        question: "What is the 'circuit breaker' pattern used for in microservices?",
        options: [
            "Encrypting communication between services to prevent unauthorized access",
            "Distributing traffic evenly across multiple instances of a service",
            "Preventing cascading failures by stopping calls to an unresponsive service",
            "Caching responses from downstream services to reduce network round trips"
        ],
        correct: 2,
        funFact: "Netflix's Hystrix library popularized the circuit breaker pattern. When failures exceed a threshold, the circuit 'opens' and requests fail fast rather than waiting for timeouts.",
        wiki: "https://en.wikipedia.org/wiki/Circuit_breaker_design_pattern"
    },
    {
        question: "What is the 'saga pattern' used to manage in a microservices architecture?",
        options: [
            "Distributed transactions that span multiple services without two-phase commit",
            "API versioning and backward compatibility between service releases",
            "Service discovery and registration across multiple deployment environments",
            "Load balancing and traffic routing between different service versions"
        ],
        correct: 0,
        funFact: "Sagas use compensating transactions to undo previous steps if a later step fails. For example, if payment succeeds but shipping fails, the saga runs a refund as compensation.",
        wiki: "https://en.wikipedia.org/wiki/Long-running_transaction"
    },
    {
        question: "What is the purpose of an API gateway in a microservices architecture?",
        options: [
            "Monitoring the health of all microservices and restarting them when they crash",
            "Storing configuration data that all microservices read on startup to initialize themselves",
            "Providing a single entry point that handles routing, authentication, and rate limiting for client requests",
            "Managing database schemas and running migrations across all service databases"
        ],
        correct: 2,
        funFact: "Kong, AWS API Gateway, and Zuul are popular API gateways. They can also handle request transformation, response aggregation, and protocol translation (e.g., REST to gRPC).",
        wiki: "https://en.wikipedia.org/wiki/API_management"
    },
    {
        question: "What is 'service discovery' in a microservices environment?",
        options: [
            "The process of documenting all APIs so developers can find and use available services",
            "The mechanism by which services automatically find the network locations of other services",
            "The practice of scanning networks to identify unauthorized or rogue services",
            "The technique of splitting a monolith by discovering service boundaries in existing code"
        ],
        correct: 1,
        funFact: "Consul, Eureka, and etcd are popular service discovery tools. In Kubernetes, service discovery is built in through DNS: each service gets a DNS name like my-service.my-namespace.svc.cluster.local.",
        wiki: "https://en.wikipedia.org/wiki/Service_discovery"
    },
    {
        question: "What is the 'strangler fig' pattern for migrating from a monolith to microservices?",
        options: [
            "Rewriting the entire monolith at once and switching over in a single deployment",
            "Deploying microservices in a separate environment and testing them before any migration",
            "Splitting the monolith's database first and then extracting services from the codebase",
            "Running the monolith and microservices side by side, gradually routing traffic to new services"
        ],
        correct: 3,
        funFact: "Named after strangler fig trees that grow around a host tree and eventually replace it. Martin Fowler popularized this pattern as a low-risk approach to incremental migration.",
        wiki: "https://en.wikipedia.org/wiki/Strangler_fig_pattern"
    },
    {
        question: "What is the 'bulkhead' pattern in microservices architecture?",
        options: [
            "Isolating components into pools so that a failure in one pool does not affect others",
            "Encrypting all inter-service communication using mutual TLS certificates",
            "Deploying each service in its own container to prevent dependency conflicts",
            "Routing all external traffic through a single hardened entry point for security"
        ],
        correct: 0,
        funFact: "Named after ship bulkheads that prevent a hull breach from flooding the entire vessel. In practice, this means using separate thread pools, connection pools, or even separate clusters for critical services.",
        wiki: "https://en.wikipedia.org/wiki/Bulkhead_(partition)"
    },
    {
        question: "What is 'distributed tracing' used for in a microservices system?",
        options: [
            "Replicating data changes across all microservice databases for consistency",
            "Distributing configuration updates to all services simultaneously during deployments",
            "Tracking a request's path across multiple services to diagnose latency and errors",
            "Tracing network packet routes between datacenters to optimize routing tables"
        ],
        correct: 2,
        funFact: "Jaeger and Zipkin are popular distributed tracing tools. They propagate a unique trace ID through all service calls, allowing engineers to visualize the full request lifecycle.",
        wiki: "https://en.wikipedia.org/wiki/Tracing_(software)"
    },
    {
        question: "What does the 'sidecar pattern' refer to in containerized microservices?",
        options: [
            "Deploying a helper container alongside the main container to handle cross-cutting concerns",
            "Running a standby instance of each service for instant failover during outages",
            "Storing service configuration in a separate container that the main container reads from",
            "Running integration tests in a parallel container during the deployment pipeline"
        ],
        correct: 0,
        funFact: "In Kubernetes, sidecar containers share the same pod and network namespace as the main container. Istio's Envoy proxy is deployed as a sidecar to handle traffic management and security.",
        wiki: "https://en.wikipedia.org/wiki/Sidecar_pattern"
    },
    {
        question: "What is the primary challenge of managing data consistency across microservices that each own their own database?",
        options: [
            "Choosing a single programming language that all services must be implemented in",
            "Configuring network firewalls to allow direct database connections between services",
            "Ensuring all databases use the same schema and table structure for shared entities",
            "Maintaining data integrity without distributed transactions spanning multiple databases"
        ],
        correct: 3,
        funFact: "The 'database per service' pattern deliberately avoids shared databases. Instead, services communicate state changes through events or APIs, accepting eventual consistency.",
        wiki: "https://en.wikipedia.org/wiki/Microservices"
    },
    {
        question: "What does REST stand for, and what is its core architectural principle?",
        options: [
            "Remote Execution of Server Tasks, where servers execute client-submitted code remotely",
            "Representational State Transfer, where resources are identified by URIs and manipulated through representations",
            "Relational Entity State Transfer, where entities are transferred as relational database rows",
            "Reliable Event Streaming Transport, where events are delivered reliably between distributed services"
        ],
        correct: 1,
        funFact: "REST was defined by Roy Fielding in his 2000 doctoral dissertation. A truly RESTful API uses hypermedia (HATEOAS) to let clients discover available actions dynamically.",
        wiki: "https://en.wikipedia.org/wiki/REST"
    },
    {
        question: "What is the main advantage of GraphQL over traditional REST APIs?",
        options: [
            "Built-in authentication and authorization for all queries and mutations",
            "Allowing clients to request exactly the data fields they need in a single request",
            "Automatic database query optimization and index creation",
            "Guaranteed backward compatibility when the API schema changes"
        ],
        correct: 1,
        funFact: "GraphQL was developed internally at Facebook in 2012 and open-sourced in 2015. It solves the over-fetching and under-fetching problems common in REST APIs.",
        wiki: "https://en.wikipedia.org/wiki/GraphQL"
    },
    {
        question: "What transport protocol does gRPC use, and what serialization format does it default to?",
        options: [
            "HTTP/1.1 with JSON serialization for broad client compatibility",
            "TCP with MessagePack serialization for compact binary encoding",
            "WebSocket with Avro serialization for schema-evolution support",
            "HTTP/2 with Protocol Buffers serialization for efficient binary encoding"
        ],
        correct: 3,
        funFact: "gRPC supports four communication patterns: unary (request-response), server streaming, client streaming, and bidirectional streaming. Google uses it extensively for internal service communication.",
        wiki: "https://en.wikipedia.org/wiki/GRPC"
    },
    {
        question: "What is API idempotency, and why is it important for distributed systems?",
        options: [
            "The property that an API always returns the same response format regardless of input parameters",
            "The property that making the same API call multiple times produces the same result as making it once",
            "The property that an API can handle requests from any client without prior registration",
            "The property that an API automatically retries failed requests without client intervention"
        ],
        correct: 1,
        funFact: "HTTP GET, PUT, and DELETE are designed to be idempotent. For POST requests, APIs often use idempotency keys: a client-generated ID that the server uses to deduplicate retried requests.",
        wiki: "https://en.wikipedia.org/wiki/Idempotence"
    },
    {
        question: "What is the purpose of API pagination, and which approach uses a pointer to the next set of results?",
        options: [
            "Limiting response size for large datasets; cursor-based pagination uses an opaque token",
            "Encrypting response payloads; token-based pagination uses encryption keys",
            "Reducing server memory usage; offset-based pagination uses page numbers",
            "Compressing response data; batch-based pagination uses compression pointers"
        ],
        correct: 0,
        funFact: "Cursor-based pagination avoids the problem of offset pagination where inserting new items causes users to see duplicates or miss items when navigating between pages.",
        wiki: "https://en.wikipedia.org/wiki/Pagination"
    },
    {
        question: "What is API versioning, and which approach puts the version in the URL path?",
        options: [
            "Managing breaking changes; header versioning uses custom HTTP headers like Accept-Version",
            "Managing rate limits; subdomain versioning uses prefixes like v1.api.example.com",
            "Managing feature flags; query versioning uses parameters like ?features=beta",
            "Managing breaking changes; URI versioning uses paths like /v1/users and /v2/users"
        ],
        correct: 3,
        funFact: "Stripe uses URL path versioning and maintains backward compatibility for years. They pin each API key to a specific version and let developers upgrade at their own pace.",
        wiki: "https://en.wikipedia.org/wiki/Software_versioning"
    },
    {
        question: "What is the purpose of an OpenAPI (Swagger) specification?",
        options: [
            "Defining load balancer routing rules for directing traffic to API servers",
            "Generating database schemas from API endpoint definitions automatically",
            "Providing a machine-readable description of a REST API's endpoints, parameters, and responses",
            "Enforcing rate limiting rules and authentication policies at the API gateway"
        ],
        correct: 2,
        funFact: "OpenAPI specs can auto-generate client SDKs in dozens of languages, interactive documentation, and server stubs. Tools like Swagger UI let developers test APIs directly in the browser.",
        wiki: "https://en.wikipedia.org/wiki/OpenAPI_Specification"
    },
    {
        question: "What is the key difference between synchronous and asynchronous API communication patterns?",
        options: [
            "Synchronous APIs use JSON while asynchronous APIs use XML for data serialization",
            "Synchronous APIs are stateless while asynchronous APIs maintain session state on the server",
            "Synchronous APIs block until a response is received while asynchronous APIs return immediately and deliver results later",
            "Synchronous APIs use encryption while asynchronous APIs transmit data in plaintext"
        ],
        correct: 2,
        funFact: "Webhooks are a common asynchronous pattern: instead of polling for results, the server calls back a client-provided URL when the result is ready. Stripe uses webhooks extensively for payment events.",
        wiki: "https://en.wikipedia.org/wiki/Asynchronous_I/O"
    },
    {
        question: "What HTTP status code range indicates a client error?",
        options: [
            "1xx, indicating the server is processing the request and the client should wait",
            "2xx, indicating the request was successfully received and processed",
            "4xx, indicating the request contains an error that the client should fix",
            "3xx, indicating the client must take additional action to complete the request"
        ],
        correct: 2,
        funFact: "The most famous HTTP error is 404 Not Found. HTTP 418 'I'm a teapot' was defined as an April Fools' joke in RFC 2324 but some APIs implement it as an easter egg.",
        wiki: "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes"
    },
    {
        question: "What is HATEOAS and how does it relate to REST API design?",
        options: [
            "A security protocol that provides encryption for REST API communications between services",
            "A caching strategy that determines how REST API responses should be stored at the edge",
            "A testing framework that validates REST API responses against a predefined schema",
            "A constraint of REST where responses include links to related resources and available actions"
        ],
        correct: 3,
        funFact: "HATEOAS stands for Hypermedia As The Engine Of Application State. Despite being a core REST constraint, most 'RESTful' APIs in practice do not implement it.",
        wiki: "https://en.wikipedia.org/wiki/HATEOAS"
    },
    {
        question: "What is the primary role of DNS in internet infrastructure?",
        options: [
            "Translating human-readable domain names into IP addresses",
            "Encrypting data packets as they travel between client and server",
            "Balancing network traffic across multiple server instances",
            "Compressing HTTP responses to reduce bandwidth consumption"
        ],
        correct: 0,
        funFact: "The entire DNS system processes an estimated 1 trillion queries per day. DNS was designed in 1983 by Paul Mockapetris and specified in RFC 1034 and RFC 1035.",
        wiki: "https://en.wikipedia.org/wiki/Domain_Name_System"
    },
    {
        question: "What is the purpose of a DNS TTL (Time To Live) value?",
        options: [
            "Setting the maximum number of DNS servers a query can pass through before failing",
            "Defining how long a DNS record can be cached by resolvers before requiring a fresh lookup",
            "Limiting the maximum number of concurrent connections to a domain name",
            "Specifying the timeout duration for establishing a TCP connection to the resolved IP"
        ],
        correct: 1,
        funFact: "A low TTL (like 60 seconds) allows fast DNS changes but increases query load. A high TTL (like 86400 seconds) reduces load but makes changes propagate slowly.",
        wiki: "https://en.wikipedia.org/wiki/Time_to_live"
    },
    {
        question: "What transport protocol does HTTPS use, and what does it add on top of HTTP?",
        options: [
            "TCP with TLS encryption for confidentiality, integrity, and authentication",
            "QUIC with built-in congestion control and connection migration",
            "UDP with packet checksums for basic data integrity verification",
            "SCTP with multi-homing support for redundant network connections"
        ],
        correct: 0,
        funFact: "TLS 1.3 reduced the handshake from two round trips to one, and supports 0-RTT resumption for repeat connections. Over 95% of web traffic is now encrypted with HTTPS.",
        wiki: "https://en.wikipedia.org/wiki/HTTPS"
    },
    {
        question: "What is the key advantage of HTTP/2 over HTTP/1.1?",
        options: [
            "Multiplexing multiple requests over a single TCP connection without head-of-line blocking",
            "Built-in support for WebSocket connections without an upgrade handshake",
            "Automatic compression of all request and response bodies using gzip",
            "Native support for server-side rendering of HTML pages before sending"
        ],
        correct: 0,
        funFact: "HTTP/2 uses binary framing instead of text, supports header compression (HPACK), and enables server push. It was standardized in 2015 and is based on Google's SPDY protocol.",
        wiki: "https://en.wikipedia.org/wiki/HTTP/2"
    },
    {
        question: "What is a WebSocket, and how does it differ from regular HTTP?",
        options: [
            "A protocol for transferring files that uses UDP instead of TCP for lower latency",
            "A security protocol that encrypts HTTP traffic without requiring TLS certificates",
            "A caching layer that stores HTTP responses in the browser's local storage",
            "A full-duplex communication channel over a single persistent TCP connection"
        ],
        correct: 3,
        funFact: "WebSockets start with an HTTP upgrade handshake, then switch to a persistent bidirectional connection. They are used in real-time applications like chat, live sports scores, and collaborative editing.",
        wiki: "https://en.wikipedia.org/wiki/WebSocket"
    },
    {
        question: "What does TCP's three-way handshake establish?",
        options: [
            "A reliable, ordered connection by synchronizing sequence numbers between two endpoints",
            "A load-balanced connection distributed across multiple backend servers",
            "An encrypted channel between client and server using public key cryptography",
            "A compressed data channel that reduces bandwidth usage for all subsequent packets"
        ],
        correct: 0,
        funFact: "The three-way handshake (SYN, SYN-ACK, ACK) adds one round-trip of latency before data can flow. This is why connection reuse (keep-alive) and connection pooling are important for performance.",
        wiki: "https://en.wikipedia.org/wiki/Transmission_Control_Protocol"
    },
    {
        question: "When would you choose UDP over TCP for network communication?",
        options: [
            "When you need guaranteed delivery of every packet in the correct order",
            "When you need built-in flow control and congestion avoidance mechanisms",
            "When low latency is more important than guaranteed delivery, such as in real-time video",
            "When you need to transfer large files reliably across unreliable network links"
        ],
        correct: 2,
        funFact: "Online multiplayer games, VoIP, and live video streaming commonly use UDP. A dropped video frame is better than a delayed one. QUIC (used by HTTP/3) builds reliability on top of UDP.",
        wiki: "https://en.wikipedia.org/wiki/User_Datagram_Protocol"
    },
    {
        question: "What is a reverse proxy, and how does it differ from a forward proxy?",
        options: [
            "A forward proxy caches responses, while a reverse proxy only forwards requests without caching",
            "A reverse proxy encrypts traffic, while a forward proxy compresses traffic",
            "A forward proxy sits in front of clients, while a reverse proxy sits in front of backend servers",
            "A reverse proxy handles TCP traffic, while a forward proxy handles only UDP traffic"
        ],
        correct: 2,
        funFact: "NGINX is one of the most popular reverse proxies, handling load balancing, SSL termination, caching, and compression. Over 30% of the top million websites use NGINX.",
        wiki: "https://en.wikipedia.org/wiki/Reverse_proxy"
    },
    {
        question: "What is Server-Sent Events (SSE) used for?",
        options: [
            "Enabling clients to upload large files to servers in streaming chunks",
            "Allowing servers to push real-time updates to clients over a persistent HTTP connection",
            "Synchronizing database changes between a primary server and its replicas",
            "Compressing server responses for faster delivery to mobile clients"
        ],
        correct: 1,
        funFact: "SSE is simpler than WebSockets for server-to-client streaming: it works over standard HTTP, automatically reconnects, and supports event IDs for resuming after disconnection.",
        wiki: "https://en.wikipedia.org/wiki/Server-sent_events"
    },
    {
        question: "What is the purpose of a Content-Type header in an HTTP request or response?",
        options: [
            "Indicating the media type of the body so the recipient knows how to parse it",
            "Specifying which cache policy the client or server should apply to the content",
            "Defining the maximum size of the request or response body in bytes",
            "Setting the character encoding used in the URL path and query parameters"
        ],
        correct: 0,
        funFact: "Common Content-Type values include application/json, text/html, and multipart/form-data. Mismatched content types are a common source of API integration bugs.",
        wiki: "https://en.wikipedia.org/wiki/Media_type"
    },
    {
        question: "What is the primary benefit of using a CDN for serving static assets?",
        options: [
            "Reducing latency by serving content from edge servers geographically close to users",
            "Providing automatic database replication across multiple geographic regions",
            "Generating dynamic content at the edge without requiring origin servers",
            "Encrypting all traffic between the origin server and the client browser"
        ],
        correct: 0,
        funFact: "Akamai, one of the earliest CDN providers, delivers between 15-30% of all web traffic globally. Their network has over 365,000 servers in more than 135 countries.",
        wiki: "https://en.wikipedia.org/wiki/Content_delivery_network"
    },
    {
        question: "What does 'cache invalidation' mean in the context of a CDN?",
        options: [
            "Verifying that cached content has not been corrupted during transmission",
            "Encrypting cached content so unauthorized users cannot access it at the edge",
            "Removing or refreshing stale content from CDN edge servers when the origin content changes",
            "Distributing cached content evenly across all edge servers for balanced load"
        ],
        correct: 2,
        funFact: "Phil Karlton famously said: 'There are only two hard things in Computer Science: cache invalidation and naming things.' CDN purge operations can take seconds to minutes to propagate globally.",
        wiki: "https://en.wikipedia.org/wiki/Cache_invalidation"
    },
    {
        question: "What is 'edge computing' in the context of modern web architecture?",
        options: [
            "Running computation on the extreme edges of a local area network for security isolation",
            "Processing data at geographically distributed points close to the end user rather than a central datacenter",
            "Using the latest cutting-edge hardware for maximum computational performance",
            "Computing checksums at network boundaries to verify data integrity during transmission"
        ],
        correct: 1,
        funFact: "Cloudflare Workers and AWS Lambda@Edge allow running custom code at CDN edge locations. This enables personalization, A/B testing, and authentication at the edge with sub-millisecond latency.",
        wiki: "https://en.wikipedia.org/wiki/Edge_computing"
    },
    {
        question: "What is the 'origin server' in a CDN architecture?",
        options: [
            "The first CDN edge server that receives a client request in a given region",
            "The DNS server that resolves domain names to the nearest CDN edge location",
            "The source server that holds the original content which CDN edge servers cache",
            "The monitoring server that tracks performance metrics across all CDN nodes"
        ],
        correct: 2,
        funFact: "When a CDN edge server doesn't have the requested content (a cache miss), it fetches it from the origin server. CDN architectures often use 'origin shields' to reduce load on the origin.",
        wiki: "https://en.wikipedia.org/wiki/Content_delivery_network"
    },
    {
        question: "What is object storage, and when is it typically used?",
        options: [
            "A storage system using fixed-size blocks on raw disk devices, used for virtual machine images",
            "A hierarchical file system with directories and permissions, used for operating system files",
            "A flat-namespace storage system for unstructured data like images, videos, and backups",
            "A relational storage engine optimized for structured data with SQL query support"
        ],
        correct: 2,
        funFact: "Amazon S3 stores over 350 trillion objects and handles millions of requests per second. Object storage uses a flat namespace with unique keys rather than a directory hierarchy.",
        wiki: "https://en.wikipedia.org/wiki/Object_storage"
    },
    {
        question: "What is the key difference between block storage and file storage?",
        options: [
            "Block storage uses encryption by default while file storage does not support encryption",
            "Block storage is cloud-only while file storage is only available on local hardware",
            "Block storage operates on raw fixed-size blocks while file storage provides a file system with directories",
            "Block storage supports only sequential access while file storage supports random access"
        ],
        correct: 2,
        funFact: "Block storage (like AWS EBS) is commonly used for databases that need raw disk access. File storage (like AWS EFS or NFS) provides a shared file system that multiple servers can mount simultaneously.",
        wiki: "https://en.wikipedia.org/wiki/Block-level_storage"
    },
    {
        question: "What is the purpose of data replication across multiple storage nodes?",
        options: [
            "Compressing data to reduce the total storage cost across the cluster",
            "Encrypting data so that no single node can access the complete dataset",
            "Providing redundancy so data remains available if one or more nodes fail",
            "Partitioning data to increase the maximum capacity of the storage system"
        ],
        correct: 2,
        funFact: "HDFS (Hadoop Distributed File System) defaults to a replication factor of 3, placing replicas on different racks. This protects against both individual disk failures and entire rack failures.",
        wiki: "https://en.wikipedia.org/wiki/Replication_(computing)"
    },
    {
        question: "What is erasure coding, and how does it differ from simple replication for data durability?",
        options: [
            "A method for encrypting stored data using multiple keys distributed across nodes",
            "A technique for compressing data by removing duplicate blocks across the cluster",
            "A strategy for distributing write operations evenly across storage nodes using consistent hashing",
            "An approach that splits data into fragments with parity pieces, achieving durability with less storage overhead than full replication"
        ],
        correct: 3,
        funFact: "With 3x replication, you need 3 copies (200% overhead) to survive 2 failures. Reed-Solomon erasure coding can survive 2 failures with only 50% overhead, which is why S3 and Azure use it.",
        wiki: "https://en.wikipedia.org/wiki/Erasure_code"
    },
    {
        question: "What is a distributed file system designed to provide?",
        options: [
            "A compression algorithm that reduces file sizes before writing to disk",
            "A backup solution that copies files to a remote datacenter on a scheduled basis",
            "A version control system for tracking changes to files over time",
            "A single logical file system interface across multiple physical storage nodes"
        ],
        correct: 3,
        funFact: "Google File System (GFS), described in a 2003 paper, inspired HDFS. It was designed for large sequential reads and appends, optimized for Google's MapReduce workloads.",
        wiki: "https://en.wikipedia.org/wiki/Clustered_file_system"
    },
    {
        question: "What is the 'write amplification' problem in storage systems?",
        options: [
            "When multiple clients write to the same file simultaneously causing data corruption",
            "When disk write speeds decrease as the storage device approaches full capacity",
            "When write operations are replicated to too many nodes causing network congestion",
            "When the actual amount of data written to storage media exceeds the logical data written by the application"
        ],
        correct: 3,
        funFact: "SSDs are particularly susceptible to write amplification because they must erase entire blocks before writing. LSM trees and log-structured storage can reduce write amplification significantly.",
        wiki: "https://en.wikipedia.org/wiki/Write_amplification"
    },
    {
        question: "What is the Raft consensus algorithm designed to achieve?",
        options: [
            "Achieving consensus among a group of nodes on a sequence of values even when some nodes fail",
            "Compressing data efficiently for transfer between geographically distant nodes",
            "Distributing network traffic evenly across a cluster of proxy servers",
            "Encrypting communication between distributed nodes to prevent eavesdropping"
        ],
        correct: 0,
        funFact: "Raft was designed as a more understandable alternative to Paxos. It uses a strong leader model where one node is elected leader and coordinates all log replication to followers.",
        wiki: "https://en.wikipedia.org/wiki/Raft_(algorithm)"
    },
    {
        question: "What is a 'split brain' scenario in a distributed system?",
        options: [
            "When a node's CPU and memory are overloaded causing it to process requests inconsistently",
            "When two partitioned groups of nodes each believe they are the authoritative leader",
            "When a database table is split across too many shards causing uneven data distribution",
            "When a service has two different API versions running simultaneously in production"
        ],
        correct: 1,
        funFact: "Split brain can cause data corruption because both sides may accept conflicting writes. Quorum-based systems prevent this by requiring a majority of nodes to agree before proceeding.",
        wiki: "https://en.wikipedia.org/wiki/Split-brain_(computing)"
    },
    {
        question: "What is the purpose of a 'lease' in distributed systems?",
        options: [
            "A mechanism for transferring data ownership between nodes during rebalancing",
            "A permanent assignment of a data partition to a specific node in the cluster",
            "A contract between services defining the expected response time and error rate",
            "A time-limited token that grants a node exclusive access to a resource, expiring automatically if not renewed"
        ],
        correct: 3,
        funFact: "Leases prevent the problem of a node holding a lock indefinitely after crashing. Google's Chubby lock service uses leases extensively. If a node fails to renew its lease, the lock is released.",
        wiki: "https://en.wikipedia.org/wiki/Lease_(computer_science)"
    },
    {
        question: "What does the 'gossip protocol' accomplish in distributed systems?",
        options: [
            "Propagating information through the cluster by having nodes periodically share state with random peers",
            "Electing a leader node through a series of voting rounds among all cluster members",
            "Encrypting peer-to-peer messages between nodes using shared secret keys",
            "Compressing log data before replicating it from leader nodes to follower nodes"
        ],
        correct: 0,
        funFact: "Cassandra uses gossip to share cluster membership and health information. Each node contacts 1-3 random peers per second, and information spreads exponentially like a rumor.",
        wiki: "https://en.wikipedia.org/wiki/Gossip_protocol"
    },
    {
        question: "What problem does a distributed lock manager solve?",
        options: [
            "Balancing the computational load evenly across all available processors",
            "Distributing encryption keys securely across all nodes in a cluster",
            "Preventing multiple nodes from modifying the same resource simultaneously",
            "Synchronizing system clocks between nodes to within microsecond precision"
        ],
        correct: 2,
        funFact: "Redis Redlock and ZooKeeper are commonly used for distributed locks. Martin Kleppmann's analysis of Redlock highlighted subtle correctness issues with distributed locking algorithms.",
        wiki: "https://en.wikipedia.org/wiki/Distributed_lock_manager"
    },
    {
        question: "What is idempotent operation handling important for in distributed systems?",
        options: [
            "Reducing the memory footprint of services by reusing computation results",
            "Enabling services to dynamically scale their thread pools during peak load",
            "Compressing duplicate messages in transit between distributed service nodes",
            "Allowing safe retries of operations that may have been executed but not acknowledged"
        ],
        correct: 3,
        funFact: "Network partitions, timeouts, and retries mean the same request may arrive multiple times. Idempotency keys (unique request IDs) let servers detect and deduplicate repeated operations.",
        wiki: "https://en.wikipedia.org/wiki/Idempotence"
    },
    {
        question: "What is the 'Byzantine fault tolerance' problem concerned with?",
        options: [
            "Recovering data from nodes that experience disk corruption due to hardware failures",
            "Handling nodes that may fail by sending incorrect or contradictory information to different peers",
            "Preventing unauthorized nodes from joining a cluster and accessing protected data",
            "Managing network congestion when too many nodes attempt to communicate simultaneously"
        ],
        correct: 1,
        funFact: "The Byzantine Generals Problem was described by Lamport, Shostak, and Pease in 1982. Blockchain consensus mechanisms like PBFT are designed to handle Byzantine faults.",
        wiki: "https://en.wikipedia.org/wiki/Byzantine_fault"
    },
    {
        question: "What is a 'heartbeat' mechanism used for in distributed systems?",
        options: [
            "Measuring the latency between two nodes for optimal request routing decisions",
            "Compressing periodic status messages to reduce network overhead between nodes",
            "Synchronizing data changes between primary and replica nodes in real time",
            "Detecting whether nodes are alive by sending periodic signals and monitoring responses"
        ],
        correct: 3,
        funFact: "If a node misses several consecutive heartbeats, it is considered dead. The heartbeat interval is a trade-off: too frequent wastes bandwidth, too infrequent delays failure detection.",
        wiki: "https://en.wikipedia.org/wiki/Heartbeat_(computing)"
    },
    {
        question: "What is 'leader election' in a distributed system?",
        options: [
            "Choosing which client request gets priority when multiple requests arrive simultaneously",
            "Selecting which database shard receives a particular piece of data based on its key",
            "The process by which nodes in a cluster agree on a single node to coordinate activities",
            "Determining which network route is the fastest path between two distant datacenters"
        ],
        correct: 2,
        funFact: "ZooKeeper, etcd, and Consul all provide leader election primitives. In Raft, leader election uses randomized timeouts to avoid split votes between competing candidates.",
        wiki: "https://en.wikipedia.org/wiki/Leader_election"
    },
    {
        question: "What does 'sharding' refer to in database systems?",
        options: [
            "Creating read-only copies of data to distribute query load across multiple servers",
            "Encrypting database columns to protect sensitive data from unauthorized access",
            "Compressing database tables to reduce storage costs on individual servers",
            "Splitting a database into smaller pieces distributed across multiple machines based on a partition key"
        ],
        correct: 3,
        funFact: "The term 'shard' originated from the game Ultima Online, where the game world was split across multiple servers called 'shards.' Each shard was a complete copy of the game world.",
        wiki: "https://en.wikipedia.org/wiki/Shard_(database_architecture)"
    },
    {
        question: "What is the 'FLP impossibility result' in distributed computing?",
        options: [
            "It is impossible to build a distributed system that handles more than five simultaneous node failures",
            "It is impossible to transfer data between nodes faster than the speed of light allows",
            "It is impossible to achieve both strong consistency and high availability simultaneously",
            "It is impossible for a deterministic asynchronous system to guarantee consensus if even one node can crash"
        ],
        correct: 3,
        funFact: "The FLP result (Fischer, Lynch, Paterson, 1985) proved this for asynchronous systems. In practice, systems use timeouts and randomization to achieve consensus despite this theoretical impossibility.",
        wiki: "https://en.wikipedia.org/wiki/Consensus_(computer_science)"
    },
    {
        question: "What is a 'quorum' in the context of distributed systems?",
        options: [
            "The total number of nodes required to form a valid distributed cluster at startup",
            "The maximum number of nodes that can fail before the system becomes completely unavailable",
            "The minimum number of nodes that must agree on an operation for it to be considered committed",
            "The optimal number of replicas to balance read performance with storage costs"
        ],
        correct: 2,
        funFact: "For a cluster of N nodes, a typical quorum is (N/2)+1 (a majority). This ensures that any two quorums overlap by at least one node, guaranteeing they share the latest committed data.",
        wiki: "https://en.wikipedia.org/wiki/Quorum_(distributed_computing)"
    },
    {
        question: "What is 'clock skew' and why does it matter in distributed systems?",
        options: [
            "The delay introduced by serializing clock synchronization messages across the network",
            "The difference in physical clock times between nodes, which can cause ordering errors in events",
            "The gradual degradation of CPU clock speed under sustained heavy computational load",
            "The variation in disk access times caused by different rotation speeds of storage media"
        ],
        correct: 1,
        funFact: "Google's Spanner database uses GPS receivers and atomic clocks in each datacenter to keep clock skew below 7 milliseconds. This enables TrueTime, which provides globally consistent timestamps.",
        wiki: "https://en.wikipedia.org/wiki/Clock_skew"
    },
    {
        question: "What is the 'token bucket' algorithm used for in rate limiting?",
        options: [
            "Controlling the rate of requests by adding tokens at a fixed rate and consuming them per request",
            "Distributing API keys to new users at a controlled rate during registration",
            "Authenticating API requests using cryptographic tokens with expiration times",
            "Encrypting rate limit counters to prevent clients from tampering with their usage data"
        ],
        correct: 0,
        funFact: "The token bucket algorithm allows short bursts of traffic up to the bucket's capacity while maintaining a long-term average rate. It's used in AWS API Gateway and NGINX.",
        wiki: "https://en.wikipedia.org/wiki/Token_bucket"
    },
    {
        question: "How does a sliding window rate limiter differ from a fixed window rate limiter?",
        options: [
            "A sliding window limits request size while a fixed window limits request count",
            "A sliding window uses a rolling time frame to count requests, avoiding boundary burst issues of fixed windows",
            "A sliding window rate limits by IP address while a fixed window rate limits by API key",
            "A sliding window applies limits per endpoint while a fixed window applies limits globally"
        ],
        correct: 1,
        funFact: "With fixed windows, a client can send double the limit by timing requests at the boundary between two windows. Sliding windows eliminate this by considering a continuous time range.",
        wiki: "https://en.wikipedia.org/wiki/Rate_limiting"
    },
    {
        question: "What HTTP status code is typically returned when a client exceeds their rate limit?",
        options: [
            "403 Forbidden, indicating the client is permanently blocked from the resource",
            "429 Too Many Requests, indicating the client should slow down and retry later",
            "408 Request Timeout, indicating the server timed out waiting for the client",
            "503 Service Unavailable, indicating the server is temporarily unable to handle requests"
        ],
        correct: 1,
        funFact: "The 429 status code was defined in RFC 6585 in 2012. Best practice is to include a Retry-After header telling the client how long to wait before sending the next request.",
        wiki: "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes"
    },
    {
        question: "What is the 'leaky bucket' algorithm and how does it shape traffic?",
        options: [
            "It drops all requests that exceed the configured rate limit immediately without queuing",
            "It gradually increases the allowed request rate as the client demonstrates good behavior over time",
            "It processes requests at a constant rate regardless of input rate, smoothing out bursts by queuing excess requests",
            "It distributes rate limit tokens across multiple servers using consistent hashing"
        ],
        correct: 2,
        funFact: "The leaky bucket algorithm is used in network traffic shaping to enforce a steady output rate. Unlike the token bucket which allows bursts, the leaky bucket always processes at a fixed rate.",
        wiki: "https://en.wikipedia.org/wiki/Leaky_bucket"
    },
    {
        question: "What is the difference between authentication and authorization?",
        options: [
            "Authentication determines what a user can access, while authorization verifies who the user is",
            "Authentication encrypts data in transit, while authorization encrypts data at rest",
            "Authentication verifies the identity of a user, while authorization determines what they are allowed to do",
            "Authentication manages user sessions, while authorization manages API rate limits"
        ],
        correct: 2,
        funFact: "A common mnemonic: authentication is 'who are you?' and authorization is 'what can you do?' OAuth 2.0 is primarily an authorization framework, not an authentication one.",
        wiki: "https://en.wikipedia.org/wiki/Authentication"
    },
    {
        question: "What is a JWT (JSON Web Token) commonly used for?",
        options: [
            "Carrying signed claims between parties, often for stateless authentication in APIs",
            "Compressing API responses to reduce bandwidth usage between client and server",
            "Encrypting database queries to prevent SQL injection attacks on the server",
            "Generating unique identifiers for database records in distributed systems"
        ],
        correct: 0,
        funFact: "JWTs consist of three Base64-encoded parts: header, payload, and signature. They are self-contained: the server can verify them without querying a database, enabling stateless auth.",
        wiki: "https://en.wikipedia.org/wiki/JSON_Web_Token"
    },
    {
        question: "What is OAuth 2.0 primarily designed to provide?",
        options: [
            "End-to-end encryption for all communication between client applications and API servers",
            "Delegated authorization allowing third-party apps to access resources on behalf of a user",
            "Password hashing and secure storage for user credentials in a database",
            "Distributed session management across multiple servers in a web application cluster"
        ],
        correct: 1,
        funFact: "OAuth 2.0 separates the roles of resource owner, client, authorization server, and resource server. The 'Sign in with Google/GitHub' buttons on websites use OAuth 2.0 flows.",
        wiki: "https://en.wikipedia.org/wiki/OAuth"
    },
    {
        question: "What is mutual TLS (mTLS) used for in service-to-service communication?",
        options: [
            "Compressing data payloads between services to reduce internal network bandwidth usage",
            "Both the client and server verify each other's identity using certificates",
            "Routing requests to the correct service instance based on the client's geographic location",
            "Caching TLS handshake results to avoid repeated certificate validation overhead"
        ],
        correct: 1,
        funFact: "Service meshes like Istio and Linkerd automatically manage mTLS certificates for all service-to-service communication. This ensures zero-trust networking inside the cluster.",
        wiki: "https://en.wikipedia.org/wiki/Mutual_authentication"
    },
    {
        question: "What is the principle of least privilege in system security?",
        options: [
            "Deploying the fewest possible number of servers to minimize the attack surface",
            "Encrypting all data with the shortest possible key length to maximize performance",
            "Granting users and services only the minimum permissions needed to perform their tasks",
            "Using the simplest authentication method available to reduce integration complexity"
        ],
        correct: 2,
        funFact: "AWS IAM policies follow least privilege by default: everything is denied unless explicitly allowed. Following this principle limits the blast radius of compromised credentials.",
        wiki: "https://en.wikipedia.org/wiki/Principle_of_least_privilege"
    },
    {
        question: "What is the purpose of a Web Application Firewall (WAF)?",
        options: [
            "Encrypting all data stored in the web application's database at rest",
            "Monitoring server hardware metrics like CPU temperature and disk health",
            "Load balancing web traffic across multiple application server instances",
            "Filtering and blocking malicious HTTP traffic like SQL injection and cross-site scripting attempts"
        ],
        correct: 3,
        funFact: "AWS WAF, Cloudflare WAF, and ModSecurity are popular WAFs. They use rule sets to detect and block common attack patterns defined in the OWASP Top 10.",
        wiki: "https://en.wikipedia.org/wiki/Web_application_firewall"
    },
    {
        question: "What do the 'four golden signals' of monitoring refer to?",
        options: [
            "CPU usage, memory usage, disk I/O, and network throughput",
            "Uptime percentage, mean time to recovery, mean time between failures, and error budget",
            "Request rate, response time, availability percentage, and throughput capacity",
            "Latency, traffic, errors, and saturation"
        ],
        correct: 3,
        funFact: "The four golden signals were defined in Google's Site Reliability Engineering book. They provide a minimal but comprehensive view of system health for any service.",
        wiki: "https://en.wikipedia.org/wiki/Site_reliability_engineering"
    },
    {
        question: "What is an SLO (Service Level Objective)?",
        options: [
            "A contractual agreement with financial penalties for failing to meet performance targets",
            "A target value for a service level indicator that defines acceptable service performance",
            "A technical specification describing the maximum hardware resources a service may consume",
            "A deployment checklist that must be completed before releasing a new service version"
        ],
        correct: 1,
        funFact: "SLOs sit between SLIs (what you measure) and SLAs (contractual commitments). An SLO might be '99.9% of requests complete in under 200ms.' The error budget is the gap between 100% and the SLO.",
        wiki: "https://en.wikipedia.org/wiki/Service-level_objective"
    },
    {
        question: "What is the 'error budget' concept in site reliability engineering?",
        options: [
            "The maximum dollar amount allocated for incident response tooling and infrastructure",
            "The allowed amount of unreliability, calculated as 100% minus the SLO target",
            "The total number of bugs permitted in a codebase before a release is blocked",
            "The percentage of engineering time dedicated to fixing production incidents"
        ],
        correct: 1,
        funFact: "If your SLO is 99.9% uptime, your monthly error budget is about 43 minutes of downtime. Teams can 'spend' this budget on risky deployments, and must slow down when it's exhausted.",
        wiki: "https://en.wikipedia.org/wiki/Site_reliability_engineering"
    },
    {
        question: "What is the purpose of a 'canary deployment'?",
        options: [
            "Deploying to a staging environment that mirrors production for pre-release testing",
            "Running automated security scans on a deployment before promoting it to production",
            "Deploying a new version to a small subset of servers or users before rolling it out fully",
            "Rolling back a deployment automatically when error rates exceed a configured threshold"
        ],
        correct: 2,
        funFact: "Named after canaries used in coal mines to detect toxic gas. Netflix pioneered canary deployments and open-sourced Kayenta, a tool for automated canary analysis.",
        wiki: "https://en.wikipedia.org/wiki/Canary_release"
    },
    {
        question: "What is 'chaos engineering' as practiced by companies like Netflix?",
        options: [
            "Writing intentionally complex code to test whether code review processes catch problems",
            "Randomly assigning engineers to unfamiliar services to improve cross-team knowledge",
            "Using AI to generate random test inputs for finding edge cases in application logic",
            "Deliberately injecting failures into production systems to test resilience and identify weaknesses"
        ],
        correct: 3,
        funFact: "Netflix's Chaos Monkey randomly terminates production instances. They also built Chaos Kong, which simulates the failure of an entire AWS region to test cross-region failover.",
        wiki: "https://en.wikipedia.org/wiki/Chaos_engineering"
    },
    {
        question: "What is a 'blue-green deployment' strategy?",
        options: [
            "Deploying a new version alongside the old version and gradually shifting traffic between them",
            "Maintaining two identical production environments and switching traffic instantly from old to new",
            "Deploying to geographically distributed datacenters in a specific sequence based on user load",
            "Running both the development and production environments on the same infrastructure to save costs"
        ],
        correct: 1,
        funFact: "Blue-green deployments enable instant rollback: if the new version has issues, you simply switch traffic back to the old environment. The downside is needing double the infrastructure.",
        wiki: "https://en.wikipedia.org/wiki/Blue%E2%80%93green_deployment"
    },
    {
        question: "What is 'observability' and how does it differ from traditional monitoring?",
        options: [
            "Observability focuses on dashboards while monitoring focuses on alerting and notifications",
            "Observability uses agents while monitoring uses agentless data collection methods",
            "Observability is the ability to understand internal system state from external outputs, going beyond predefined metrics to support exploratory debugging",
            "Observability tracks business metrics while monitoring tracks infrastructure metrics exclusively"
        ],
        correct: 2,
        funFact: "The three pillars of observability are metrics, logs, and traces. Tools like Datadog, Grafana, and Honeycomb combine these signals to help engineers debug complex distributed systems.",
        wiki: "https://en.wikipedia.org/wiki/Observability"
    },
    {
        question: "What is the purpose of a 'runbook' in incident response?",
        options: [
            "A document with step-by-step instructions for diagnosing and resolving specific types of incidents",
            "A compiled binary that automatically patches servers during an active incident",
            "A script that runs automated tests to verify system health after a deployment",
            "A log file that records every action taken by engineers during incident response"
        ],
        correct: 0,
        funFact: "Google's SRE teams maintain detailed runbooks for every alert. Mature organizations automate runbook steps over time, evolving manual procedures into self-healing systems.",
        wiki: "https://en.wikipedia.org/wiki/Runbook"
    },
    {
        question: "What is the CQRS (Command Query Responsibility Segregation) pattern?",
        options: [
            "A pattern that routes commands to the nearest datacenter and queries to a central database",
            "A pattern that combines all database operations into a single optimized query pipeline",
            "A pattern that separates read operations and write operations into different models or databases",
            "A pattern that enforces sequential processing of all commands before allowing any queries"
        ],
        correct: 2,
        funFact: "CQRS allows optimizing reads and writes independently. The write model can use a normalized relational database while the read model uses a denormalized search index.",
        wiki: "https://en.wikipedia.org/wiki/Command_Query_Responsibility_Segregation"
    },
    {
        question: "What is the 'outbox pattern' used for in event-driven architectures?",
        options: [
            "Storing all incoming events in a temporary buffer before processing them in batch",
            "Ensuring reliable event publishing by writing events to a database table and then publishing them asynchronously",
            "Routing events to different consumers based on content-based filtering rules",
            "Encrypting events before they leave a service boundary for secure inter-service communication"
        ],
        correct: 1,
        funFact: "The outbox pattern solves the dual-write problem: updating a database and publishing an event must both succeed or both fail. Debezium can tail the outbox table using change data capture.",
        wiki: "https://en.wikipedia.org/wiki/Inbox_and_outbox_pattern"
    },
    {
        question: "What is the 'ambassador pattern' in distributed systems?",
        options: [
            "A service that translates between different API versions for backward compatibility",
            "A gateway that authenticates external requests before forwarding them to internal services",
            "A helper service that handles cross-cutting network concerns on behalf of the main service",
            "A broker that mediates communication between services in different programming languages"
        ],
        correct: 2,
        funFact: "The ambassador pattern offloads concerns like retries, circuit breaking, and logging to a proxy process. It is closely related to the sidecar pattern used in service mesh architectures.",
        wiki: "https://en.wikipedia.org/wiki/Proxy_pattern"
    },
    {
        question: "What is the 'competing consumers' pattern?",
        options: [
            "Multiple API gateways competing for incoming client requests based on geographic proximity",
            "Multiple producer services racing to write conflicting data to the same database table",
            "Multiple consumer instances processing messages from the same queue to increase throughput",
            "Multiple load balancers competing to route traffic to the same set of backend servers"
        ],
        correct: 2,
        funFact: "This pattern is fundamental to message queue systems. Each message is delivered to exactly one consumer, allowing you to scale processing by simply adding more consumer instances.",
        wiki: "https://en.wikipedia.org/wiki/Competing_consumers_pattern"
    },
    {
        question: "What is 'backoff with jitter' and why is it used in retry strategies?",
        options: [
            "Adding random data to retry requests to prevent response caching by intermediate proxies",
            "Decreasing the timeout for each subsequent retry attempt to fail fast on persistent errors",
            "Switching to a different server endpoint on each retry to distribute load across the cluster",
            "Gradually increasing retry delays with random variation to prevent synchronized retry storms"
        ],
        correct: 3,
        funFact: "AWS recommends exponential backoff with full jitter for retries. Without jitter, all clients retry at the same intervals, creating synchronized bursts that can overwhelm a recovering service.",
        wiki: "https://en.wikipedia.org/wiki/Exponential_backoff"
    },
    {
        question: "What is the 'database per service' pattern in microservices?",
        options: [
            "Using a single shared database with separate schemas for each microservice",
            "Replicating the same database to every microservice for local read access",
            "Each microservice owning and managing its own private database that other services cannot access directly",
            "Rotating database connections between services on a scheduled basis for load distribution"
        ],
        correct: 2,
        funFact: "This pattern ensures loose coupling: services interact through APIs, not shared tables. It enables polyglot persistence where each service can choose the database type best suited to its needs.",
        wiki: "https://en.wikipedia.org/wiki/Microservices"
    },
    {
        question: "What is 'change data capture' (CDC) and what is it used for?",
        options: [
            "A testing technique that captures changes to source code and validates them against test suites",
            "A backup strategy that captures changed files incrementally rather than performing full backups",
            "A monitoring approach that captures changes in system metrics and triggers alerts on anomalies",
            "A pattern that captures row-level changes in a database and streams them as events to other systems"
        ],
        correct: 3,
        funFact: "Debezium is a popular open-source CDC tool that reads database transaction logs. It can stream changes from PostgreSQL, MySQL, and MongoDB to Kafka in near real-time.",
        wiki: "https://en.wikipedia.org/wiki/Change_data_capture"
    },
    {
        question: "What is the 'retry with idempotency key' pattern?",
        options: [
            "Retrying failed encryption operations using a different key until one succeeds",
            "Caching the result of the first attempt and returning it for all subsequent retry requests",
            "Rotating API keys between retry attempts to avoid rate limiting on a single key",
            "Including a unique identifier with each request so the server can safely deduplicate retried operations"
        ],
        correct: 3,
        funFact: "Stripe's API uses idempotency keys: you include a unique key with each POST request. If you retry with the same key, Stripe returns the original response instead of processing again.",
        wiki: "https://en.wikipedia.org/wiki/Idempotence"
    },
    {
        question: "When designing a URL shortener like bit.ly, what is a key consideration for generating short URLs?",
        options: [
            "Using a sequential counter to ensure URLs are always increasing in length over time",
            "Generating a unique short code using a combination of base62 encoding and a distributed ID generator",
            "Hashing the original URL with MD5 and using the full hash as the short URL identifier",
            "Storing the short URL in a blockchain to ensure immutability and prevent tampering"
        ],
        correct: 1,
        funFact: "A 7-character base62 code (a-z, A-Z, 0-9) can represent over 3.5 trillion unique URLs. URL shorteners typically use a key-value store for fast lookups and redirects.",
        wiki: "https://en.wikipedia.org/wiki/URL_shortening"
    },
    {
        question: "In designing a chat application like WhatsApp, what protocol is well-suited for real-time message delivery?",
        options: [
            "SMTP, which provides reliable store-and-forward message delivery between mail servers",
            "FTP, which enables efficient bidirectional file transfer between client and server",
            "HTTP polling, which has clients repeatedly request new messages at fixed intervals",
            "WebSockets, which provide persistent full-duplex communication between client and server"
        ],
        correct: 3,
        funFact: "WhatsApp uses a custom protocol based on XMPP (Extensible Messaging and Presence Protocol). A single WhatsApp server can handle over 2 million simultaneous connections.",
        wiki: "https://en.wikipedia.org/wiki/WhatsApp"
    },
    {
        question: "When designing a news feed system like Facebook's, what approach efficiently generates personalized feeds?",
        options: [
            "Fan-out on write: precompute feeds when new posts are created and push them to followers' caches",
            "Store all posts in a single sorted table and query it with a full table scan for each user",
            "Send each new post via email to all followers as a real-time notification",
            "Use blockchain consensus to determine the ordering of posts in each user's feed"
        ],
        correct: 0,
        funFact: "Facebook uses a hybrid approach: fan-out on write for normal users, and fan-out on read for celebrities with millions of followers (to avoid writing to millions of feeds per post).",
        wiki: "https://en.wikipedia.org/wiki/News_Feed"
    },
    {
        question: "When designing a distributed file storage system like Dropbox, how should large files be handled?",
        options: [
            "Split files into fixed-size chunks, deduplicate them, and distribute chunks across multiple storage nodes",
            "Convert files to a text-based format for easier storage and transmission across the network",
            "Compress the entire file into a single blob and store it on one designated server node",
            "Store files exclusively in memory for maximum read and write performance at all times"
        ],
        correct: 0,
        funFact: "Dropbox uses content-defined chunking with deduplication. If you change one byte in a 1GB file, only the affected chunk needs to be re-uploaded, not the entire file.",
        wiki: "https://en.wikipedia.org/wiki/Dropbox_(service)"
    },
    {
        question: "When designing a rate limiter for a large-scale API, where should rate limit counters be stored?",
        options: [
            "In a centralized in-memory store like Redis for consistent enforcement across all server instances",
            "In the application server's local memory for fastest possible access and zero network latency",
            "In the API response headers so the client can self-enforce its own rate limits",
            "In a text file on the local disk of each application server for persistent storage"
        ],
        correct: 0,
        funFact: "Redis is ideal for rate limiting because it supports atomic increment operations and key expiration. A single Redis node can handle hundreds of thousands of rate limit checks per second.",
        wiki: "https://en.wikipedia.org/wiki/Rate_limiting"
    },
    {
        question: "When designing a search autocomplete system, what data structure efficiently supports prefix-based lookups?",
        options: [
            "A hash table with the full search query as the key for exact match lookups",
            "A doubly linked list sorted alphabetically for sequential prefix scanning",
            "A trie (prefix tree) that stores characters at each node along the path of a word",
            "A min-heap that prioritizes the shortest matching strings for fast retrieval"
        ],
        correct: 2,
        funFact: "Google's autocomplete processes billions of queries daily. In practice, tries are often compressed and stored in memory. Ranking suggestions uses factors like popularity, freshness, and personalization.",
        wiki: "https://en.wikipedia.org/wiki/Trie"
    },
    {
        question: "When designing a notification system, what pattern handles delivering notifications across multiple channels?",
        options: [
            "Direct database writes that insert notification records into each channel's dedicated table",
            "A publish-subscribe system where notifications are published to a topic and channel services subscribe independently",
            "Synchronous API calls from the notification service to each channel service in sequence",
            "Batch processing where all notifications are queued and delivered in hourly batches"
        ],
        correct: 1,
        funFact: "Notification systems typically use priority queues to handle different urgency levels. Push notifications, SMS, and email each have different delivery characteristics and rate limits.",
        wiki: "https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern"
    },
    {
        question: "When designing a video streaming service like YouTube, what technique enables adaptive video quality?",
        options: [
            "Storing videos in a single resolution and scaling them in real-time using GPU processing",
            "Sending the entire video file to the client before playback begins to avoid buffering",
            "Encoding videos at multiple bitrates and using adaptive bitrate streaming to switch quality based on network conditions",
            "Using lossless compression for all video files to maintain maximum quality at all times"
        ],
        correct: 2,
        funFact: "YouTube encodes each video into dozens of quality levels. HLS (HTTP Live Streaming) and DASH protocols let the player automatically switch between quality levels every few seconds based on bandwidth.",
        wiki: "https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming"
    },
    {
        question: "When designing a ride-sharing service like Uber, what is an efficient approach for matching nearby drivers to riders?",
        options: [
            "Using a geospatial index to efficiently query for drivers within a given radius of the rider",
            "Assigning drivers to riders alphabetically based on their registered names in the system",
            "Querying all drivers in the database and calculating distances one by one until a match is found",
            "Broadcasting each ride request to every online driver and accepting the first response received"
        ],
        correct: 0,
        funFact: "Uber uses H3, a hexagonal hierarchical geospatial indexing system. It divides the world into hexagonal cells at multiple resolutions, enabling efficient proximity queries.",
        wiki: "https://en.wikipedia.org/wiki/Spatial_database"
    },
    {
        question: "When designing a distributed counter (like a social media 'likes' count), what challenge must be addressed?",
        options: [
            "Preventing users from viewing the like count before they have authenticated",
            "Storing the history of every individual like action for regulatory compliance purposes",
            "Handling high-throughput concurrent increments without losing updates or creating bottlenecks",
            "Ensuring that the counter value is encrypted in transit between the client and server"
        ],
        correct: 2,
        funFact: "Facebook uses a technique called 'counter caching' with eventual consistency. Instead of updating a single row for every like, they batch increments and periodically flush them to the database.",
        wiki: "https://en.wikipedia.org/wiki/Distributed_computing"
    },
    {
        question: "When designing a web crawler, what mechanism prevents the crawler from visiting the same URL repeatedly?",
        options: [
            "Using a DNS cache that remembers which domains have already been resolved",
            "Limiting the crawler to a single thread so it processes URLs sequentially without duplication",
            "Setting HTTP cache headers that instruct the crawler to skip previously fetched pages",
            "A URL frontier with a deduplication mechanism like a hash set or Bloom filter"
        ],
        correct: 3,
        funFact: "Google's web crawler, Googlebot, crawls billions of pages. A Bloom filter is memory-efficient for URL deduplication: it can track 1 billion URLs using only about 1 GB of memory.",
        wiki: "https://en.wikipedia.org/wiki/Web_crawler"
    },
    {
        question: "When designing a payment system, why is idempotency particularly critical?",
        options: [
            "Because payment APIs must return responses in under 10 milliseconds for user satisfaction",
            "Because payment processors charge higher fees for non-idempotent API integrations",
            "Because payment systems are required by law to use idempotent encryption algorithms",
            "Because network failures and retries could cause the same payment to be processed multiple times"
        ],
        correct: 3,
        funFact: "Stripe generates an idempotency key for each payment intent. If a client retries a charge due to a timeout, the second request returns the result of the first rather than charging again.",
        wiki: "https://en.wikipedia.org/wiki/Idempotence"
    },
    {
        question: "When designing a recommendation engine, what technique finds similar items based on user behavior patterns?",
        options: [
            "Gradient descent, which optimizes server response times for recommendation queries",
            "Binary search, which locates items in a sorted catalog based on attribute values",
            "Consistent hashing, which distributes items across recommendation servers evenly",
            "Collaborative filtering, which recommends items based on preferences of similar users"
        ],
        correct: 3,
        funFact: "Netflix's recommendation engine saves them an estimated $1 billion per year in customer retention. They combine collaborative filtering with content-based filtering in a hybrid approach.",
        wiki: "https://en.wikipedia.org/wiki/Collaborative_filtering"
    },
    {
        question: "What is a HyperLogLog data structure used for?",
        options: [
            "Maintaining a sorted list of unique elements with efficient range queries",
            "Providing a priority queue implementation for scheduling tasks in distributed systems",
            "Storing key-value pairs with automatic expiration after a configurable time period",
            "Estimating the cardinality (count of distinct elements) of large datasets using very little memory"
        ],
        correct: 3,
        funFact: "Redis's HyperLogLog implementation uses only 12 KB of memory regardless of the number of elements, while providing a standard error of 0.81%. It's used for counting unique visitors, unique searches, etc.",
        wiki: "https://en.wikipedia.org/wiki/HyperLogLog"
    },
    {
        question: "What is a 'skip list' and where is it used in practice?",
        options: [
            "A linked list that skips corrupted nodes during traversal, used in fault-tolerant storage systems",
            "A compression algorithm that skips unchanged data blocks during incremental backups",
            "A probabilistic data structure with layered linked lists enabling average O(log n) search, used in Redis sorted sets",
            "A network protocol that skips intermediate routers to reduce latency for time-sensitive packets"
        ],
        correct: 2,
        funFact: "Skip lists were invented by William Pugh in 1989. Redis uses them for sorted sets because they are simpler to implement than balanced trees and perform comparably in practice.",
        wiki: "https://en.wikipedia.org/wiki/Skip_list"
    },
    {
        question: "What is a 'merkle tree' used for in distributed systems?",
        options: [
            "Balancing load across distributed service instances using weighted round-robin scheduling",
            "Efficiently detecting differences in data between replicas by comparing hierarchical hashes",
            "Routing messages between microservices based on content-type headers and topic patterns",
            "Compressing distributed log files by deduplicating repeated entries across all nodes"
        ],
        correct: 1,
        funFact: "Merkle trees are used in Cassandra for anti-entropy repair: nodes compare root hashes to quickly identify which data ranges are out of sync. Git and Bitcoin also use Merkle trees.",
        wiki: "https://en.wikipedia.org/wiki/Merkle_tree"
    },
    {
        question: "What is a 'count-min sketch' data structure used for?",
        options: [
            "Estimating the frequency of events in a data stream using sub-linear space",
            "Sketching network topology diagrams for visualizing service dependencies",
            "Counting the exact number of elements in a distributed queue for capacity planning",
            "Tracking the minimum and maximum values in a sliding time window"
        ],
        correct: 0,
        funFact: "Count-min sketches are used in network traffic monitoring, natural language processing, and database query optimization. They trade accuracy for massive memory savings on high-cardinality streams.",
        wiki: "https://en.wikipedia.org/wiki/Count%E2%80%93min_sketch"
    },
    {
        question: "What is a 'consistent hash ring' and why does it use virtual nodes?",
        options: [
            "A ring topology for network routing; virtual nodes provide backup paths when physical links fail",
            "A circular hash space for data distribution; virtual nodes improve balance by giving each physical node multiple positions on the ring",
            "A circular buffer for log storage; virtual nodes allow the buffer to expand dynamically beyond its initial capacity",
            "A ring-based encryption scheme; virtual nodes store partial keys for multi-party decryption ceremonies"
        ],
        correct: 1,
        funFact: "Without virtual nodes, adding or removing a physical node only affects its immediate neighbors, causing uneven distribution. With 100-200 virtual nodes per physical node, the load becomes much more even.",
        wiki: "https://en.wikipedia.org/wiki/Consistent_hashing"
    },
    {
        question: "What is 'infrastructure as code' (IaC) and what problem does it solve?",
        options: [
            "Writing application code that runs directly on bare-metal servers without an operating system",
            "Managing and provisioning infrastructure through machine-readable configuration files instead of manual processes",
            "Converting infrastructure metrics into source code for analysis in an IDE",
            "Running infrastructure management tools inside containers for portability across environments"
        ],
        correct: 1,
        funFact: "Terraform, CloudFormation, and Pulumi are popular IaC tools. IaC enables version control, code review, and automated testing of infrastructure changes, just like application code.",
        wiki: "https://en.wikipedia.org/wiki/Infrastructure_as_code"
    },
    {
        question: "What is the primary advantage of containerization with Docker over traditional virtual machines?",
        options: [
            "Containers provide stronger security isolation by running a full separate operating system kernel",
            "Containers can only run Linux applications while virtual machines support all operating systems",
            "Containers are lighter weight because they share the host OS kernel instead of running their own",
            "Containers persist data permanently while virtual machines lose data when they are stopped"
        ],
        correct: 2,
        funFact: "A Docker container can start in milliseconds compared to minutes for a VM. A single host can run hundreds of containers but typically only a handful of VMs due to resource overhead.",
        wiki: "https://en.wikipedia.org/wiki/Docker_(software)"
    },
    {
        question: "What does Kubernetes primarily manage?",
        options: [
            "Container orchestration including deployment, scaling, and management of containerized applications",
            "Database schema migrations and data replication across cloud regions",
            "Source code version control and continuous integration pipeline execution",
            "Network firewall rules and intrusion detection across cloud infrastructure"
        ],
        correct: 0,
        funFact: "Kubernetes was originally designed by Google, based on their internal system called Borg. It was donated to the CNCF in 2014. The name comes from Greek, meaning 'helmsman' or 'pilot.'",
        wiki: "https://en.wikipedia.org/wiki/Kubernetes"
    },
    {
        question: "What is a 'serverless' computing model?",
        options: [
            "A model where the cloud provider manages server infrastructure and charges only for actual compute time used",
            "Running applications on servers located in the user's own home or office rather than a datacenter",
            "Deploying applications that communicate exclusively through peer-to-peer protocols without any servers",
            "Running applications on client devices with no server communication required for any functionality"
        ],
        correct: 0,
        funFact: "AWS Lambda, Google Cloud Functions, and Azure Functions are serverless platforms. Lambda can scale from zero to thousands of concurrent executions in seconds with no capacity planning.",
        wiki: "https://en.wikipedia.org/wiki/Serverless_computing"
    },
    {
        question: "What is a 'multi-region' deployment strategy designed to provide?",
        options: [
            "Cost savings by running workloads in the cheapest available cloud region at any given time",
            "Compliance with data residency laws by storing all data in a single designated region",
            "Higher availability and lower latency by running the application in multiple geographic locations",
            "Simplified debugging by isolating different application versions to different regions"
        ],
        correct: 2,
        funFact: "Netflix runs in multiple AWS regions and can failover an entire region's traffic in minutes. Multi-region adds complexity around data replication, consistency, and routing decisions.",
        wiki: "https://en.wikipedia.org/wiki/Disaster_recovery"
    },
    {
        question: "What is MapReduce and what type of workload is it designed for?",
        options: [
            "A programming model for processing large datasets in parallel across a distributed cluster",
            "A caching strategy that maps keys to servers and reduces memory usage through compression",
            "A database indexing technique that maps column values to row IDs for faster queries",
            "A network routing algorithm that maps IP addresses to physical locations and reduces hop count"
        ],
        correct: 0,
        funFact: "Google published the MapReduce paper in 2004. The 'map' phase processes input in parallel across nodes, and the 'reduce' phase aggregates results. Hadoop's MapReduce is an open-source implementation.",
        wiki: "https://en.wikipedia.org/wiki/MapReduce"
    },
    {
        question: "What is a time-series database optimized for?",
        options: [
            "Synchronizing physical clocks between distributed nodes to maintain temporal consistency",
            "Managing calendar events and scheduling recurring tasks across multiple time zones",
            "Tracking the history of schema changes applied to relational database tables over time",
            "Storing and querying data points indexed by time, such as metrics, logs, and sensor readings"
        ],
        correct: 3,
        funFact: "InfluxDB, TimescaleDB, and Prometheus are popular time-series databases. They use specialized compression and storage engines optimized for high-volume timestamped writes and range queries.",
        wiki: "https://en.wikipedia.org/wiki/Time_series_database"
    },
    {
        question: "What is a data lake and how does it differ from a data warehouse?",
        options: [
            "A data lake compresses data for long-term archival while a data warehouse keeps data uncompressed for fast queries",
            "A data lake stores raw data in its native format while a data warehouse stores processed and structured data",
            "A data lake is a real-time streaming system while a data warehouse is a batch processing system",
            "A data lake stores only structured SQL data while a data warehouse stores unstructured documents"
        ],
        correct: 1,
        funFact: "Data lakes typically use object storage like S3 with formats like Parquet and ORC. They follow a 'schema on read' approach, whereas data warehouses enforce 'schema on write.'",
        wiki: "https://en.wikipedia.org/wiki/Data_lake"
    },
    {
        question: "What are feature flags (feature toggles) used for in software deployment?",
        options: [
            "Marking code sections as deprecated so that compilers generate warning messages",
            "Tagging log entries with feature identifiers for filtered searching in log aggregation tools",
            "Enabling or disabling features at runtime without deploying new code",
            "Flagging security vulnerabilities in code during automated static analysis scans"
        ],
        correct: 2,
        funFact: "Feature flags enable trunk-based development, A/B testing, and gradual rollouts. LaunchDarkly and Unleash are popular feature flag management platforms used by thousands of companies.",
        wiki: "https://en.wikipedia.org/wiki/Feature_toggle"
    },
    {
        question: "What is the Twelve-Factor App methodology?",
        options: [
            "A methodology for building SaaS applications that are portable, scalable, and suitable for cloud deployment",
            "A set of twelve security controls that web applications must implement to pass penetration testing",
            "A twelve-step process for migrating legacy monolithic applications to microservices architecture",
            "A framework for evaluating twelve key performance metrics of distributed database systems"
        ],
        correct: 0,
        funFact: "Created by Heroku co-founder Adam Wiggins, the twelve factors include codebase, dependencies, config, backing services, build/release/run, processes, port binding, concurrency, disposability, dev/prod parity, logs, and admin processes.",
        wiki: "https://en.wikipedia.org/wiki/Twelve-Factor_App_methodology"
    },
    {
        question: "What is 'hot spot' (or 'hot partition') problem in a distributed database?",
        options: [
            "When a server room overheats due to insufficient cooling capacity for the database hardware",
            "When a database index becomes fragmented causing slow queries across all partitions equally",
            "When a backup process locks the primary database preventing all read and write operations",
            "When a disproportionate amount of traffic is directed to a single partition or node, causing a bottleneck"
        ],
        correct: 3,
        funFact: "Celebrity accounts on social media can create hot partitions. If user_id is the partition key, a viral celebrity post hammers one partition. Solutions include salting keys or using composite partition keys.",
        wiki: "https://en.wikipedia.org/wiki/Partition_(database)"
    },
    {
        question: "What is 'long polling' and how does it differ from regular HTTP polling?",
        options: [
            "Long polling keeps the connection open until the server has new data, while regular polling sends repeated requests at fixed intervals",
            "Long polling uses larger HTTP request bodies while regular polling uses compact requests",
            "Long polling sends requests to multiple servers simultaneously while regular polling targets one server",
            "Long polling uses the HTTP POST method while regular polling uses only the HTTP GET method"
        ],
        correct: 0,
        funFact: "Long polling reduces unnecessary network traffic compared to regular polling. The server holds the request open until new data is available or a timeout occurs, then the client immediately reconnects.",
        wiki: "https://en.wikipedia.org/wiki/Push_technology"
    },
    {
        question: "What is Protocol Buffers (protobuf) and what advantage does it offer over JSON?",
        options: [
            "A human-readable configuration format that is easier to debug than JSON in production logs",
            "A database query language that provides type safety not available in JSON-based query interfaces",
            "A binary serialization format that is smaller and faster to parse than text-based JSON",
            "A network protocol that provides built-in encryption not available in JSON-over-HTTP"
        ],
        correct: 2,
        funFact: "Protocol Buffers were developed at Google and open-sourced in 2008. A protobuf message can be 3-10x smaller than the equivalent JSON and 20-100x faster to parse.",
        wiki: "https://en.wikipedia.org/wiki/Protocol_Buffers"
    },
    {
        question: "What is the 'Snowflake ID' scheme used for in distributed systems?",
        options: [
            "Generating encryption keys with unique snowflake-like patterns for visual verification",
            "Generating unique, roughly time-sortable 64-bit IDs without coordination between nodes",
            "Creating hierarchical folder structures that branch like snowflakes for file organization",
            "Assigning human-readable identifiers to servers based on their physical datacenter location"
        ],
        correct: 1,
        funFact: "Twitter created the Snowflake ID format: 41 bits for timestamp, 10 bits for machine ID, and 12 bits for sequence. This allows each machine to generate 4,096 unique IDs per millisecond without coordination.",
        wiki: "https://en.wikipedia.org/wiki/Snowflake_ID"
    },
    {
        question: "What is 'read repair' in eventually consistent distributed databases?",
        options: [
            "Repairing corrupted data by reading backup copies from a disaster recovery site",
            "Repairing broken foreign key relationships by scanning all tables during a maintenance window",
            "Restoring a database index after it becomes corrupted during a failed write operation",
            "Fixing inconsistencies between replicas by detecting and updating stale data during read operations"
        ],
        correct: 3,
        funFact: "Cassandra performs read repair by comparing data from multiple replicas during reads. If inconsistencies are found, the most recent version is written back to the stale replicas.",
        wiki: "https://en.wikipedia.org/wiki/Eventual_consistency"
    },
    {
        question: "What is 'compaction' in the context of LSM-tree based storage engines?",
        options: [
            "Compressing data files to reduce storage space on disk using standard compression algorithms",
            "Reducing the number of active network connections to free up system resources",
            "Merging and reorganizing sorted data files to reclaim space and improve read performance",
            "Shrinking database table schemas by removing unused columns and deprecated fields"
        ],
        correct: 2,
        funFact: "LSM trees write data to sorted files (SSTables). Over time, compaction merges overlapping files, removes deleted entries (tombstones), and consolidates data for faster reads.",
        wiki: "https://en.wikipedia.org/wiki/Log-structured_merge-tree"
    },
    {
        question: "What is a 'tombstone' in database systems?",
        options: [
            "A log entry recording when a database instance was permanently decommissioned",
            "A backup file created automatically before any destructive schema migration is applied",
            "A marker indicating that a record has been deleted, used to propagate deletions across replicas",
            "A monitoring alert triggered when a database query exceeds its maximum execution time"
        ],
        correct: 2,
        funFact: "In Cassandra, tombstones have a grace period (default 10 days). If a node is down longer than this, deleted data can reappear when the node comes back online, known as 'zombie data.'",
        wiki: "https://en.wikipedia.org/wiki/Tombstone_(data_store)"
    },
    {
        question: "What is Paxos and why is it significant in distributed computing?",
        options: [
            "A load balancing algorithm that distributes requests across servers using weighted priorities",
            "A data compression algorithm optimized for distributed file systems with large block sizes",
            "A network protocol for discovering services in a dynamic containerized environment",
            "A consensus algorithm that allows a group of unreliable nodes to agree on a single value"
        ],
        correct: 3,
        funFact: "Paxos was described by Leslie Lamport in 1989 using an analogy of a parliamentary system on a Greek island. Google's Chubby lock service and Spanner database both use variants of Paxos.",
        wiki: "https://en.wikipedia.org/wiki/Paxos_(computer_science)"
    },
    {
        question: "What are Lamport timestamps used for in distributed systems?",
        options: [
            "Measuring the physical elapsed time of operations for performance benchmarking",
            "Providing a partial ordering of events across distributed nodes without synchronized clocks",
            "Encrypting timestamps to prevent tampering with audit log entries",
            "Scheduling periodic maintenance tasks at consistent intervals across all cluster nodes"
        ],
        correct: 1,
        funFact: "Lamport timestamps use a simple counter incremented with each event. Leslie Lamport introduced them in his 1978 paper 'Time, Clocks, and the Ordering of Events in a Distributed System.'",
        wiki: "https://en.wikipedia.org/wiki/Lamport_timestamp"
    },
    {
        question: "What is 'immutable infrastructure' as a deployment philosophy?",
        options: [
            "Servers that are never modified after deployment; changes are made by replacing instances entirely",
            "Infrastructure that cannot be accessed by unauthorized users due to strict access controls",
            "Infrastructure provisioned with permanent static IP addresses that never change",
            "Configuration files that are checked into version control and cannot be edited directly"
        ],
        correct: 0,
        funFact: "With immutable infrastructure, you never SSH into a server to fix something. Instead, you build a new image, test it, and replace the old instances. This eliminates configuration drift.",
        wiki: "https://en.wikipedia.org/wiki/Immutable_infrastructure"
    },
    {
        question: "What is 'data locality' and why does it matter for distributed processing?",
        options: [
            "The practice of storing data in the same geographic region as the users who access it most",
            "Encrypting data so it can only be decrypted by processes running on the local machine",
            "Moving computation to where the data resides rather than moving data to where computation runs",
            "Storing related database rows on the same disk page to improve sequential read performance"
        ],
        correct: 2,
        funFact: "Hadoop's MapReduce schedules tasks on nodes that already have the data, avoiding expensive network transfers. Moving a 1TB dataset over a 10Gbps network takes about 15 minutes; local disk access takes seconds.",
        wiki: "https://en.wikipedia.org/wiki/Data_locality"
    },
    {
        question: "What is a 'service level agreement' (SLA) and how does it relate to SLOs?",
        options: [
            "An internal engineering target that has no financial or legal implications for the provider",
            "A formal contract between a service provider and customer that specifies penalties for not meeting SLO targets",
            "A monitoring dashboard that displays real-time performance metrics for executive stakeholders",
            "A deployment checklist that must be completed before a service can be promoted to production"
        ],
        correct: 1,
        funFact: "AWS S3 has an SLA guaranteeing 99.9% availability. If they miss this target, customers receive service credits. SLAs are typically less aggressive than internal SLOs to provide a safety buffer.",
        wiki: "https://en.wikipedia.org/wiki/Service-level_agreement"
    },
    {
        question: "What is A/B testing in the context of web application development?",
        options: [
            "Testing an application on both Android and iOS platforms before releasing to users",
            "Comparing two versions of a feature with different user groups to measure which performs better",
            "Running automated tests in two separate environments to verify consistent behavior",
            "Alternating between two deployment strategies on consecutive releases for risk reduction"
        ],
        correct: 1,
        funFact: "Google famously tested 41 shades of blue for their link color to determine which one generated the most clicks. Modern A/B testing platforms can run hundreds of experiments simultaneously.",
        wiki: "https://en.wikipedia.org/wiki/A/B_testing"
    },
    {
        question: "What is 'database connection pooling' and why is it important?",
        options: [
            "Combining multiple small databases into a single larger database for simplified management",
            "Maintaining a pool of reusable database connections to avoid the overhead of creating new ones per request",
            "Distributing database queries across a pool of read replicas using round-robin scheduling",
            "Pooling database backup files across multiple storage locations for disaster recovery"
        ],
        correct: 1,
        funFact: "Creating a new PostgreSQL connection takes 50-100ms due to process forking and TLS negotiation. With connection pooling, this cost is paid once and amortized across thousands of requests.",
        wiki: "https://en.wikipedia.org/wiki/Connection_pool"
    },
    {
        question: "What is the 'write-behind' (write-back) caching strategy?",
        options: [
            "Writing data to the cache only after confirming the database write was successful",
            "Writing data directly to the database and skipping the cache entirely for consistency",
            "Writing data to a backup cache that sits behind the primary cache for redundancy",
            "Writing data to the cache and then asynchronously writing to the backing store after a delay"
        ],
        correct: 3,
        funFact: "Write-behind improves write latency since the application only waits for the cache write. The risk is data loss if the cache fails before flushing to the database. CPU caches use this strategy extensively.",
        wiki: "https://en.wikipedia.org/wiki/Cache_(computing)"
    },
    {
        question: "What is 'tail latency' and why does it matter at scale?",
        options: [
            "The high-percentile response times (e.g., p99) that affect a significant fraction of user requests in large systems",
            "The delay at the end of a network packet caused by error correction checksums",
            "The latency experienced by the last user to join a session in a multiplayer system",
            "The additional latency added when a request is routed through a tail-end backup datacenter"
        ],
        correct: 0,
        funFact: "Jeff Dean at Google showed that if a request fans out to 100 servers, even a 1% chance of a slow response means 63% of user requests will experience tail latency. This is why p99 matters more than average latency.",
        wiki: "https://en.wikipedia.org/wiki/Latency_(engineering)"
    },
    {
        question: "What is 'graceful degradation' in system design?",
        options: [
            "Slowly decommissioning old servers by gradually reducing their traffic allocation over weeks",
            "Gradually lowering database query priority for non-paying users during high demand periods",
            "Decreasing the resolution of images and videos during peak traffic to save bandwidth",
            "Allowing a system to continue operating with reduced functionality when some components fail"
        ],
        correct: 3,
        funFact: "Amazon's product pages can still load even if the recommendation service is down - they just show the page without recommendations. This is graceful degradation in action.",
        wiki: "https://en.wikipedia.org/wiki/Graceful_degradation"
    },
    {
        question: "What is 'sharding key selection' and why is it a critical design decision?",
        options: [
            "Choosing the field used to determine how data is distributed across shards, affecting balance and query efficiency",
            "Selecting which database engine to use for each shard based on its access patterns",
            "Choosing the encryption key length for data stored across different database shards",
            "Selecting the order in which new shards are provisioned during horizontal scaling events"
        ],
        correct: 0,
        funFact: "A good shard key distributes data evenly and supports common query patterns. Instagram uses a compound shard key combining user_id with a timestamp component for their photo metadata.",
        wiki: "https://en.wikipedia.org/wiki/Shard_(database_architecture)"
    },
    {
        question: "What is the 'fan-out on read' vs 'fan-out on write' trade-off in feed systems?",
        options: [
            "Fan-out on read compresses data during reads while fan-out on write compresses during writes",
            "Fan-out on read assembles feeds at query time while fan-out on write precomputes feeds when new content is created",
            "Fan-out on read encrypts data per reader while fan-out on write encrypts once for all readers",
            "Fan-out on read distributes reads across replicas while fan-out on write distributes writes across shards"
        ],
        correct: 1,
        funFact: "Twitter switched from a pure fan-out-on-write approach to a hybrid model. For users with millions of followers, precomputing feeds for every follower on each tweet was too expensive.",
        wiki: "https://en.wikipedia.org/wiki/News_Feed"
    },
    {
        question: "What is 'geo-replication' in distributed database systems?",
        options: [
            "Storing geographic coordinate data in specialized spatial columns within a database",
            "Replicating data across geographically distant datacenters for disaster recovery and lower latency",
            "Using geographic information to determine the optimal shard for storing a record",
            "Routing database queries to the nearest replica based on the client's IP address geolocation"
        ],
        correct: 1,
        funFact: "CockroachDB and Azure Cosmos DB support geo-replication with configurable consistency. The challenge is balancing consistency with latency when replicas are hundreds of milliseconds apart.",
        wiki: "https://en.wikipedia.org/wiki/Replication_(computing)"
    },
    {
        question: "What is the 'retry budget' pattern?",
        options: [
            "A time-based budget that limits how long a single request can spend being retried before giving up",
            "The maximum amount of money allocated to cloud provider retry-related charges per billing cycle",
            "A per-service limit on the percentage of requests that can be retries, preventing retry amplification across the system",
            "A per-client limit on the number of API keys that can be used for retrying failed authentication attempts"
        ],
        correct: 2,
        funFact: "Without retry budgets, cascading retries can amplify load exponentially. If service A retries 3 times to B, and B retries 3 times to C, one failure at C can generate 9 requests.",
        wiki: "https://en.wikipedia.org/wiki/Retry_pattern"
    },
    {
        question: "What is 'database rebalancing' and when is it needed?",
        options: [
            "Optimizing SQL queries to distribute join operations evenly across CPU cores on a single server",
            "Switching database reads between primary and replica nodes based on current CPU utilization",
            "Redistributing data across nodes when shards become unevenly sized or new nodes are added to the cluster",
            "Rotating database credentials periodically to maintain security compliance requirements"
        ],
        correct: 2,
        funFact: "Rebalancing can be triggered automatically or manually. During rebalancing, data must be migrated without downtime. Vitess and CockroachDB support online rebalancing for MySQL and PostgreSQL workloads.",
        wiki: "https://en.wikipedia.org/wiki/Shard_(database_architecture)"
    },
    {
        question: "What is the 'scatter-gather' pattern in distributed systems?",
        options: [
            "Distributing writes to random nodes (scatter) and collecting them on a single node for ordering (gather)",
            "Splitting a database table across nodes randomly and gathering results using a full table scan",
            "Scattering cache entries across edge locations and gathering metrics from each location centrally",
            "Sending a request to multiple services in parallel and aggregating their responses into a single result"
        ],
        correct: 3,
        funFact: "Search engines use scatter-gather: a query is sent to multiple index shards in parallel, each returns its top results, and a coordinator merges them into the final ranked result set.",
        wiki: "https://en.wikipedia.org/wiki/Distributed_computing"
    },
    {
        question: "What is the purpose of a 'circuit breaker timeout' vs a 'request timeout'?",
        options: [
            "Circuit breaker timeouts apply to background jobs while request timeouts apply to user-facing requests",
            "Circuit breaker timeouts apply at the network layer while request timeouts apply at the application layer",
            "Circuit breaker timeouts are measured in minutes while request timeouts are measured in microseconds",
            "Circuit breaker timeouts determine when to stop sending requests to a failing service, while request timeouts limit how long to wait for a single response"
        ],
        correct: 3,
        funFact: "A typical pattern: request timeout of 2 seconds, circuit breaker opens after 5 consecutive failures, and stays open for 30 seconds before allowing a test request through (half-open state).",
        wiki: "https://en.wikipedia.org/wiki/Circuit_breaker_design_pattern"
    },
    {
        question: "What is 'content-based routing' in message queue systems?",
        options: [
            "Routing messages to different queues based on the message content or attributes",
            "Compressing message content before routing to reduce network bandwidth consumption",
            "Routing messages based on the geographic location of the content delivery network edge node",
            "Encrypting message content differently depending on which queue the message is routed to"
        ],
        correct: 0,
        funFact: "RabbitMQ supports content-based routing through topic exchanges and header exchanges. Messages can be routed based on routing keys, headers, or custom attributes without the producer knowing the consumers.",
        wiki: "https://en.wikipedia.org/wiki/Content-based_routing"
    },
    {
        question: "What is 'data denormalization' in the context of read-optimized databases?",
        options: [
            "Intentionally duplicating data across tables or documents to reduce the need for expensive joins during reads",
            "Converting structured relational data into unstructured blob storage for cost reduction",
            "Removing all indexes from a database to speed up write operations at the cost of slower reads",
            "Splitting a single large table into multiple smaller tables to improve query parallelism"
        ],
        correct: 0,
        funFact: "DynamoDB and Cassandra encourage denormalization because they don't support joins. You model data based on your query patterns, storing data redundantly to serve each query from a single table.",
        wiki: "https://en.wikipedia.org/wiki/Denormalization"
    },
    {
        question: "What is the 'ambassador pattern' specifically used to handle in cloud-native applications?",
        options: [
            "User authentication and session management for client-facing web applications",
            "Cross-cutting connectivity concerns like retries, monitoring, and logging without modifying application code",
            "Database migration and schema versioning across multiple microservice databases",
            "Continuous integration and automated testing in the deployment pipeline"
        ],
        correct: 1,
        funFact: "The ambassador pattern is particularly useful when legacy applications need cloud-native networking features. Instead of modifying the app, you deploy a proxy alongside it that handles modern connectivity patterns.",
        wiki: "https://en.wikipedia.org/wiki/Proxy_pattern"
    }
];

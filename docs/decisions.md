# Worklog – Engineering Decisions

This document records key technical decisions made during the
development of Worklog, including the reasoning and tradeoffs.

The goal is long-term clarity, not detailed tutorials.



## ID Strategy (cuid vs autoincrement)

**Decision:** Use `cuid()` for primary keys.

**Why:**
- IDs are safe to expose in URLs
- Generated at the application level, not DB-coupled
- Avoids predictable, sequential IDs
- Better suited for distributed and SaaS-style applications

**Alternatives considered:**
- `autoincrement()`  
  Rejected due to predictability and tighter database coupling.

**Outcome:**
- All core models use `String` IDs with `cuid()`

## Prisma Relation Modeling

**Decision:** Use explicit bidirectional relations in Prisma models.

**Why:**
- Prisma requires opposite relation fields for type safety
- Enables querying from both sides (Project → Tasks, Task → Project)
- Makes schema intent explicit and unambiguous

**Alternatives considered:**
- One-sided relations  
  Rejected due to Prisma validation errors and reduced clarity.

**Outcome:**
- `Project` includes `tasks: Task[]`
- `Task` includes `projectId` and `project` relation

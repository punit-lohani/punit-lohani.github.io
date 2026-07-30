---
layout: post
title: "SQL Order of Execution"
category: SQL
read_time: 2 min read
summary: "A concise guide to the logical order in which SQL query clauses are evaluated."
---

## What Is the SQL Order of Execution?

The SQL order of execution is the logical order in which a database evaluates the clauses in a query. It is worth understanding because this order differs from the order in which we write SQL.

For example, in `SELECT * FROM database`, it may look as though `SELECT` is evaluated first. In practice, processing begins with the `FROM` clause, which identifies the source data.

## SQL Order of Execution

1. **`FROM` / `JOIN`**: Identifies the tables from which to retrieve data and combines them when necessary.
2. **`WHERE`**: Filters rows before they are grouped.
3. **`GROUP BY`**: Groups rows that share a common value.
4. **`HAVING`**: Filters groups after grouping has occurred.
5. **`SELECT`**: Specifies the columns or expressions to return.
6. **`DISTINCT`**: Removes duplicate rows from the result set.
7. **`ORDER BY`**: Sorts the result set by the specified columns or expressions.
8. **`LIMIT`**: Sets the maximum number of rows to return.
9. **`OFFSET`**: Skips a specified number of rows before returning results.

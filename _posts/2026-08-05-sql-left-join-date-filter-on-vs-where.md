---
layout: post
title: "The SQL LEFT JOIN Trap: Filtering Dates in ON vs. WHERE"
category: SQL
read_time: 10 min read
summary: "A practical lesson on how date-filter placement changes a LEFT JOIN and why users with zero matching transactions can disappear."
---

I recently came across an interesting SQL issue while trying to count transactions for every user during a specific date range, including users with zero transactions.

It became a useful lesson in how placing a date filter in the `ON` clause versus the `WHERE` clause can completely change the result of a `LEFT JOIN`.

## The Context

Imagine a payment platform with two tables.

The `users` table contains one row for every registered user:

```text
user_id | user_name
--------+----------
101     | Alex
102     | Jordan
103     | Taylor
```

The `transactions` table records purchases made by those users:

```text
transaction_id | user_id | transaction_time
---------------+---------+-----------------
5001           | 101     | 2023-07-15
5002           | 101     | 2023-08-20
5003           | 102     | 2023-06-10
```

Here:

- Alex made two transactions during the reporting period.
- Jordan made a transaction before the reporting period.
- Taylor has never made a transaction.

The goal was to count transactions from July through September for every registered user including users with zero transactions.

## My First Attempt

My initial query looked reasonable:

```sql
SELECT
  u.user_id,
  COUNT(DISTINCT t.transaction_id) AS transaction_count
FROM users u
LEFT JOIN transactions t
  ON u.user_id = t.user_id
WHERE t.transaction_time >= '2023-07-01'
  AND t.transaction_time <  '2023-10-01'
GROUP BY u.user_id;
```

I expected the result to include all three users. Instead, it returned only Alex:

```text
user_id | transaction_count
--------+------------------
101     | 2
```

Jordan and Taylor disappeared instead of receiving a transaction count of zero.

## What Went Wrong?

A `LEFT JOIN` initially preserves every row from the left table—in this case, `users`.

For Taylor, who has no transactions, SQL creates an intermediate row with `NULL` transaction values:

```text
user_id | transaction_id | transaction_time
--------+----------------+-----------------
103     | NULL           | NULL
```

Jordan's transaction joins successfully, but its date is outside the reporting period:

```text
user_id | transaction_id | transaction_time
--------+----------------+-----------------
102     | 5003           | 2023-06-10
```

The important detail is that SQL applies the `WHERE` clause after the join.

Taylor's `NULL` timestamp does not satisfy the date condition, while Jordan's June timestamp falls outside the range. SQL therefore removes both rows.

By filtering the right-side table in `WHERE`, I had unintentionally made the `LEFT JOIN` behave like an `INNER JOIN`.

## The Fix: Move the Date Filter Into the Join

```sql
SELECT
  u.user_id,
  COUNT(DISTINCT t.transaction_id) AS transaction_count
FROM users u
LEFT JOIN transactions t
  ON u.user_id = t.user_id
 AND t.transaction_time >= '2023-07-01'
 AND t.transaction_time <  '2023-10-01'
GROUP BY u.user_id;
```

This version tells SQL:

> Keep every registered user, but only match transactions that occurred during the reporting period.

The result is now correct:

```text
user_id | transaction_count
--------+------------------
101     | 2
102     | 0
103     | 0
```

Jordan remains in the result even though his only transaction was outside the period. Taylor also remains despite having no transactions.

Because `COUNT(t.transaction_id)` ignores `NULL`, both receive a count of zero.

## The Lesson

The conditions may look almost identical, but their placement changes their purpose:

- A condition in `ON` determines which transaction rows match while preserving all users.
- A condition in `WHERE` determines which rows survive after the join.

The simplest way I now remember it is:

> `ON` decides what matches. `WHERE` decides what survives.

When working with a `LEFT JOIN`, place right-table date filters in the `ON` clause if you need to retain users with no qualifying transactions.

---
layout: post
title: "The SQL LEFT JOIN Trap: Filtering Dates in ON vs. WHERE"
category: SQL
read_time: 4 min read
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

Here let's say:

- Alex made two transactions during the reporting period.
- Jordan made a transaction before the reporting period.
- Taylor has never made a transaction.

The goal was to count transactions from July through September for every registered user—including users with zero qualifying transactions.

## My First Attempt

My initial query looked reasonable:

```vbnet
SELECT
  u.user_id,
  COUNT(DISTINCT t.transaction_id) AS transaction_count
FROM users u
LEFT JOIN transactions t
  ON u.user_id = t.user_id
WHERE (t.transaction_time >= '2023-07-01'
  AND t.transaction_time <  '2023-10-01')
  OR (t.transaction_time IS NULL)
GROUP BY u.user_id;
```

I added the `IS NULL` condition because I expected it to preserve users with no transactions. The query returned Alex and Taylor, but Jordan was still missing:

```text
user_id | transaction_count
--------+------------------
101     | 2
103     | 0
```

Taylor received the expected count of zero, but Jordan disappeared instead of receiving a zero.

## What Went Wrong?

A `LEFT JOIN` initially preserves every row from the left table, in this case, `users`.

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

Taylor has no matching transaction row, so the `LEFT JOIN` supplies `NULL` values for the transaction columns. The `OR t.transaction_time IS NULL` condition preserves that row.

Jordan is different. He has a matching transaction, so his timestamp is not `NULL`. However, that transaction occurred in June and falls outside the reporting period. Neither side of the `WHERE` condition is true, so SQL removes his row entirely.

This is the subtle trap: checking for `NULL` only preserves users who have no transaction rows at all. It does not preserve users who have transactions, but none within the selected date range.

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

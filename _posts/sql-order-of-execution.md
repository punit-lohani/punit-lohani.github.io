What Is SQL Order of Execution?

SQL order of execution refers to the order in which the different clauses in the query are evaluated. It's worth understanding because the execution order is usually different from how we write the SQL queries. To take the most simple example, you might think that in the case of SELECT * FROM database, the SELECT is evaluated first, but really the order of execution starts with it’s the FROM clause.

Here is the SQL order of execution. In the next section, we will go through the steps in detail. 

FROM/JOIN: Specifies the tables from which to retrieve data.
WHERE: Filters the rows that meet the condition before grouping.
GROUP BY: Groups rows that share a property.
HAVING: Filters groups based on conditions, applied after grouping.
SELECT: Specifies the columns to retrieve or calculate.
DISTINCT: Removes duplicate rows from the result set.
ORDER BY: Sorts the result set by specified columns.
LIMIT: Specifies the maximum number of rows to return.
OFFSET: Specifies how many rows to skip before starting to return rows.


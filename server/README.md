Task 2 (query)

Objective: create an API endpoint that performs the following calculations
in the DB and returns the results. All the calculations must be performed
in one SQL query.

For the employees who donated more than $100 to charity, calculate a one-time
reward equivalent to their contribution from the $10,000 pool.
For example, if an employee sent $200 out of a total of $1,000 donations,
he/she should receive 20% of the $10,000.
If employee contributions are less than $100, the value should be counted
towards the total, but the employee do not receive remuneration.

Commands:
`npm run dev` - run development
`npm run start` - run server

API endpoint:
[calculate-rewards](localhost:3000/api/calculate-rewards) - calculation in JSON format
[calculate-rewards/table](localhost:3000/api/calculate-rewards/table)- calculation in UI table
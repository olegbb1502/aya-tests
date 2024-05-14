Task 1

Objective: import the dump file into the DB.

### File format

A plain text format representing objects with properties and other nested
objects. The hierarchy is defined by indentation (each level 2 spaces).
The type of each object is named with a capital letter, properties - with a
small letter. The file contains a list of employees (Employee), each with basic
properties (first name, last name, ID). Also, each employee belongs to some
department (Department) and has a list of salaries (Statement) for the year.
The salary is defined by the date and amount (always in USD). An employee may
also have records of charitable contributions (Donation), the contribution
amount can be in any currency. In addition, the file contains the exchange
rates (Rate) for all date-currency pairs that were encountered in the
contributions. It is enough to store the equivalent of contributions in USD
in the database.
The dump file is dump.txt (for change setup it in package.json file in sync script).

Tools:
* Node.js
* SQLite3
* Squielize

Commands:
1. Create SQLite3 DB and migrate tables `npm run migrate`
2. Run sync process `npm run sync`

__Sync script reviews input file before syncing, if file doesn't valid (incorrect tabs or sctructure), code returns error message with incorect lines. Fix them and run `npm run sync` again.__

For undo migrations:
* `npm run migrate:undo` - for last migration file
* `npm run migrate:undo:all` - for all migrations (clean DB)
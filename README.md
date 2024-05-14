# Oleh Bolodan
[E-mail](mail-to:bolobanoleg@gmail.com)

Instruction for Backend:
1. Run scripts for /sync (follow to README file in folder)
2. Start server and follow to README file in folder

Instruction for Frontend:
1. Open folder `cd ui`
2. Run react (next.js) `npm run dev`

Questions:
1. How to change the code to support different file versions?
    * Not sure what you mean 'versions', but I created validator for testing dump file before syncing process
2. How the import system will change if data on exchange rates disappears from
   the file, and it will need to be received asynchronously (via API)?
   * For this I`ve created TODO method __syncRateFromApi__ that first getting all Symbols and Dates from Donates table and after that asking some API about these information and write new data into the database
3. In the future the client may want to import files via the web interface,
   how can the system be modified to allow this?
   * For this task we can create additional view (html) and write API endpoint for server. Also we should add functionality into sync method and after that connect this method with API. Ideal: create two microservices and join them with some midleware that will have an access to the sync method.
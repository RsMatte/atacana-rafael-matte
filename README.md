## Atacana Case Study

This repository contains the base code for the Case Study **Building an Accessible Pharma Trials Search Interface**. It was deployed to production using Vercel and be accessed on https://atacana-rafael-matte.vercel.app/search

To run the project in development mode, run:

```bash
npm i && npm run dev
```

Open [http://localhost:3000/search](http://localhost:3000/search) with your browser to see the result.

### Overview

Since the challenge required using React and involved fetching data of a database, I decided to use Next.js, since with a single application, we can resolve both requirements. The project has a single page that allows users to navigate through trials information in groups of up to 10, filter them by status, phase and/or completion date, and also type a search term to query them by code, title or acronym. All the filters and the search term are cumulative, meaning only the trials that match every condition will be displayed.

Page: **/search**  
GET: **/api/get** - { page: required, term: optional, status: optional, phase: optional, date: optional }  

Since the csv database is light, with approximately 4200 lines or 770kb, I decided to use the file itself as the database, keeping the project much simpler. The database is read with the help of the third party library [fast-csv](https://www.npmjs.com/package/fast-csv), which uses the [Node File System](https://nodejs.org/api/fs.html) to create a read stream and parse the file. The file is read only once per route, and then **saved in the variable data** on the server, so subsequently fetches only interact with the project's memory and are much faster.

![wireframe-v2](https://github.com/user-attachments/assets/62e0ed76-ca08-41da-8525-eb65407aff1d)

This design structure was made with a assumption that the database is not updated frequently. For future changes, if the database is updated occasionally, it could be uploaded to s3 and downloaded by the project instead of being "hardcoded" into it. If the database is updated frequently or if there are plans of implementing write operations, then the best way would be to convert the csv to a regular database.

### Performance

The search page is rendered on the server with the first 10 trials already populated, which doesn't trigger CLS for the user. In the client-side, useEffects were used as little as possible to stop unnecessary rerenders, the Table component is not rerendered when the form changes its states, and although the Pagination component is rerendered, all of its variables are memoized.

The results are always limited to 10, so the payload is lighter.

The client-side fetching has caching, so repeated requests will use the browser's disk, and Next.js App Router caches data on the server by default.

### Accessibility

Although the page is very simple, semantic HTML was used for every section, and the layout is very intuitive.

### Security

The api route has cache and always search for the values in the memory, never reading the database unnecessarily. It also uses the URL native browser api, which encodes special characters, preventing characters like **?** and **&** typed by the user to break the request.

If this was a "real" project, a WAF should protect the endpoints from too many requests from the same IP.

### Changes made in the second version of the project

- A completion date filter was added.
- The search term and the filters have been merged into a single form, now requiring a submit button to fetch. The trials returned must match every condition (search term + filters) to be displayed to the user.
- Since every input is used at once, now there is only a single api (**/api/get**), and the second one has been removed.
- The search input now has no pattern requirement, and the term submitted is matched in the database with trial code, title or acronym. If the term matches the code regex (NCT00000000), a single trial is searched and returned to improve performance.
- A simple header was added to the page, and now it is divided into three main components: **Form**, **Table** and **Pagination**.
- The form is handled by formik, a third party library that makes it easier to manage and submit multiple values.
- The pagination now displays the page quantity and the result quantity, and was moved below the table.
- The table layout was changed, now showing the entire title and the borders have been removed. Some minor details such as font-sizes, font-colors and border-radius were changed.
- The trials data management, api fetching and pagination is handled by the hook **useTrialsData**.
- The Table now displays a skeleton when the content is loading. An unexpected error will display an error message.
- Unit tests were added using **Jest** and **Testing-library** covering 100% of the files.

### Final thoughts

Although the UI might look similar to the v1 on first glance, the user experience was improved drastically. Not only the page now feels like an actual webpage, but the new options to filter by title, acronym, completion date, the page/results quantity displayed, the entire title being displayed and the loading status all contribute to a fluid navigation. As the developer I feel much more comfortable to present this project to anyone if it comes to that.

The client-side code was almost entirely refactored, and concerns are more isolated and easy to work with. Unit tests cover every line, branch, function and statement, and although integration tests might often work for projects with api calls, I feel like everything is being tested well.

Thank you again for the opportunity to make this new version.

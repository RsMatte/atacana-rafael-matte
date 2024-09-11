## Atacana Case Study

This repository contains the base code for the Case Study **Building an Accessible Pharma Trials Search Interface**. It was deployed to production using Vercel and be accessed on https://atacana-rafael-matte.vercel.app/search

To run the project in development mode, run:

```bash
npm i && npm run dev
```

Open [http://localhost:3000/search](http://localhost:3000/search) with your browser to see the result.

### Overview

Since the challenge required using React and involved fetching data of a database, I decided to use Next.js, since with a single application, we can resolve both requirements. The project has a single page that allows users to navigate through trials information in groups of up to 10, and also search for a specific trial by typing its code or filter by status and/or phase.

Page: **/search**  
GET: **/api/get** - { code: required }  
GET: **/api/filter** - { page : required, status: optional, phase: optional }

Since the csv database is light, with approximately 4200 lines or 770kb, I decided to use the file itself as the database, keeping the project much simpler. The database is read with the help of the third party library [fast-csv](https://www.npmjs.com/package/fast-csv), which uses the [Node File System](https://nodejs.org/api/fs.html) to create a read stream and parse the file. The file is read only once per route, and then **saved in the variable data** on the server, so subsequently fetches only interact with the project's memory and are much faster.

![wireframe](https://github.com/user-attachments/assets/3a0b6403-1e16-493c-b319-c7b3cbb8e31d)

This design structure was made with a assumption that the database is not updated frequently. For future changes, if the database is updated occasionally, it could be uploaded to s3 and downloaded by the project instead of being "hardcoded" into it. If the database is updated frequently or if there are plans of implementing write operations, then the best way would be to convert the csv to a regular database.

### Performance

The search page is rendered on the server with the first 10 trials already populated, which doesn't trigger CLS for the user. In the client-side, React states and useEffects were used as little as possible to stop unnecessary rerenders.

The results are always limited to 10, so the payload is lighter.

The client-side fetching has caching, so repeated requests will use the browser's disk, and even when it doesn't, the response timings are around 150 to 250ms, which is relatively fast.

### Accessibility

Although the page is very simple, semantic HTML was used for every section, and the layout is very intuitive.

### Security

Even though the api routes are open to anyone, they both validate the format of the parameters, and always search for the values in the memory, never reading the database unnecessarily.

If this was a "real" project, a WAF should protect the endpoints from too many requests from the same IP.

### Final Thoughts and improvements

Unfortunately due to the limited time I had this week, I couldn't implement everything I wanted. The overall design of the page is very simple, and is lacking at least a header and a footer. Error handling on both sides is also lacking, and finally the api's performance although not bad could be improved with server-side caching.

Having said that, I had a good time doing this challenge and would appreciate any feedback. Thank you!

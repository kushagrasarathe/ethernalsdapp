This is our project for [Ethernals Hackathon](https://ethernals.devfolio.co/). Built on Polygon and deployed using Spheron.

You can check out live project here:
[https://ethernals_dapp-fdf458.argoapp.io/](https://ethernals_dapp-fdf458.argoapp.io/)

You can also check out the demo of this project here:
[https://www.youtube.com/watch?v=VUyWEQKURok](https://www.youtube.com/watch?v=VUyWEQKURok)

## About this project

We have made a decentralized application that facilitates any company or individual to pay the salary of their employees in ethereum with just a click of a button. This application cuts down the necessary resources for anyone to pay their employees and will be significantly more efficient.

This dApp is built on top of the Polygon network using the Mumbai Testnet. The frontend of this application is made using various languages and tools. We have made use of HTML, tailwindcss which is a CSS framework and Next.js which is a framework of the React.js library. 

The backend of this application is a smart contract deployed on the Mumbai Testnet. This contract is written in Solidity which is a contract oriented language used to write smart contracts for the Ethereum blockchain. The smart contract is connected to the frontend using the Web3Modal library which allows our application to support multiple web3 providers such as Metamask. 

## Getting Started

First, install the necessary packages and dependencies on your local machine using:

```bash
yarn install 
# or
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

You can navigate through the various interfaces provided by our application such as Add Employee, Employees List, Pay Salary and Contract Funds.

Add Employee allows us to add an employee to the company's employees list based on their position which is either Intern, Junior or Senior.

Employees List allows us to the see the employees of our company based on their positions.

Pay Salary allows us to pay the salary of all the employees on our list at once with a single click of a button. 

Contract Funds allows us to see the current balance of our contract as well as accept payments from outside into our contract. 

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

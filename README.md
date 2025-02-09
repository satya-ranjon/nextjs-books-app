# NextJS Books App

A modern web application for managing and discovering books, built with Next.js 13+ and featuring authentication integration.

## Features

- 📚 Browse and search books
- 🔐 Authentication with NextAuth.js
  - GitHub login support
  - Google login support
- 💻 Modern UI with Tailwind CSS
- 🚀 Full TypeScript support

## Tech Stack

- [Next.js 13+](https://nextjs.org/) - React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up your environment variables:
   Create a `.env.local` file with the following:

```env
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   ├── components/
│   ├── pages/
│   └── styles/
```

## Authentication

This project uses NextAuth.js for authentication with the following providers:

- GitHub
- Google

To set up authentication:

1. Create OAuth applications in GitHub and Google
2. Add the credentials to your `.env.local` file
3. Configure any additional providers in `src/app/api/auth/[...nextauth]/route.ts`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

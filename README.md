# NextJS Books App

A modern web application for managing and discovering books, built with Next.js 13+ and featuring authentication integration.

## Live Demo

🌐 [View Live Demo](https://your-live-url-here.vercel.app)

## Features

- 📚 Book Management
  - Browse and search books
  - Add new books with cover images
  - View detailed book information
- ❤️ Personal Library
  - Add books to favorites
  - Manage your favorite books collection
- 🔐 Authentication with NextAuth.js
  - GitHub login support
  - Google login support
- 💻 Modern UI/UX
  - Responsive design for mobile and desktop
  - Dark/Light theme support
  - Mobile-friendly navigation
- 🚀 Technical Features
  - Full TypeScript support
  - Server-side rendering
  - API route protection
  - Database integration with Prisma

## Tech Stack

- [Next.js 13+](https://nextjs.org/) - React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Prisma](https://www.prisma.io/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [PostgreSQL](https://www.postgresql.org/) - Database

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
DATABASE_URL=your_postgresql_connection_string
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:

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
│   ├── api/           # API routes
│   │   └── auth/      # Authentication endpoints
│   ├── components/    # Reusable components
│   ├── lib/          # Utility functions and configurations
│   ├── types/        # TypeScript type definitions
│   └── styles/       # Global styles
├── prisma/           # Database schema and migrations
└── public/           # Static assets
```

## Authentication

This project uses NextAuth.js for authentication with the following providers:

- GitHub
- Google

To set up authentication:

1. Create OAuth applications in GitHub and Google developer consoles
2. Add the credentials to your `.env.local` file
3. Configure any additional providers in `src/app/api/auth/[...nextauth]/route.ts`

## Deployment

This project is deployed on Vercel. To deploy your own instance:

1. Fork this repository
2. Create a new project on [Vercel](https://vercel.com)
3. Connect your repository
4. Configure environment variables
5. Deploy!

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

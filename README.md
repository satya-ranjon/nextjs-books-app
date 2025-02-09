# 📚 Next.js Books App

A modern, full-stack book management application built with Next.js 15, featuring OAuth authentication, real-time search, and a favorites system.

🌐 **Live Demo**: [https://booklist-ochre.vercel.app/](https://booklist-ochre.vercel.app/)
📝 **GitHub**: [Repository Link](https://github.com/satya-ranjon/booklist)

## ✨ Key Features

### 🔐 Authentication

- Social login with Google and GitHub
- Protected routes and API endpoints
- Persistent sessions with NextAuth.js
- Secure token handling

### 📖 Book Management

- Browse books with cover images
- Add new books with image upload
- Real-time search functionality
- Advanced sorting options
- Server-side filtering
- Form validation

### ❤️ Favorites System

- Add up to 2 favorite books
- Dedicated favorites page
- Real-time UI updates
- Toast notifications
- Optimistic updates

### 🎨 UI/UX

- Responsive design
- Dark/Light mode
- Loading animations
- Toast notifications
- Modal dialogs
- Custom UI components

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Render)
- **Auth**: NextAuth.js
- **Validation**: Zod
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/                   # Next.js 15 App Router
├── components/            # React Components
├── hooks/                 # Custom React Hooks
├── lib/                   # Utility Functions
└── types/                # TypeScript Types
```

<details>
<summary>Detailed Structure</summary>

```
src/
├── app/
│   ├── actions/          # Server Actions
│   ├── api/              # API Routes
│   ├── favorites/        # Favorites Page
│   └── ...
├── components/
│   ├── books/           # Book-related Components
│   ├── header/          # Navigation Components
│   ├── modals/          # Modal Components
│   ├── providers/       # Context Providers
│   └── ui/              # UI Components
├── hooks/               # Custom Hooks
├── lib/                 # Utilities
│   ├── validations/     # Zod Schemas
│   └── prisma.ts        # Prisma Client
└── types/               # TypeScript Types
```

</details>

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x (Required for Next.js 15)
- PostgreSQL Database
- Google & GitHub OAuth credentials
- Cloudinary account for image uploads

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/nextjs-books-app.git
cd nextjs-books-app
```

2. **Install dependencies**

```bash
npm install
# or
pnpm install
# or
yarn install
```

3. **Environment Setup**

```bash
cp .env.example .env
```

4. **Configure environment variables**

```env
# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# OAuth Providers
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL=your-postgresql-connection-string

# Image Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

5. **Database Setup**

```bash
npx prisma migrate dev
```

6. **Start Development Server**

```bash
npm run dev
```

## 📱 Features in Detail

### Authentication Flow

1. Click "Sign In" button
2. Choose OAuth provider
3. Authorize application
4. Redirect to dashboard

### Book Management

1. Browse books grid
2. Use search bar for filtering
3. Sort by various criteria
4. Add new books (authenticated users)

### Favorites System

1. Click heart icon to favorite
2. Maximum 2 favorites per user
3. View favorites in dedicated page
4. Remove favorites as needed

## 🔧 Configuration

### OAuth Setup

1. **Google OAuth**

   - Create project in Google Cloud Console
   - Configure OAuth consent screen
   - Create credentials
   - Add authorized redirect URIs

2. **GitHub OAuth**
   - Register new OAuth application
   - Add callback URL
   - Copy client ID and secret

## 🧪 Development

### Code Style

- ESLint for linting
- Prettier for formatting
- TypeScript for type safety

### Best Practices

- Server Components by default
- Client Components when needed
- Server Actions for mutations
- Optimistic updates
- Error boundaries

## 📦 Deployment

### Vercel Deployment

1. Connect GitHub repository
2. Configure environment variables
3. Deploy application

### Database Setup

1. Create Render PostgreSQL database
2. Use the External Database URL
3. Add connection string to environment variables
4. Run migrations

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 👏 Acknowledgments

- Next.js team
- Vercel platform
- Render database service
- Open-source community

## 📞 Support

- Create GitHub issue
- Submit pull request
- Contact maintainers

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# OAuth Providers
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL=your-postgresql-connection-string

# Image Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Required Services

1. **Database**: [Render PostgreSQL](https://render.com/docs/databases)

   - Create a PostgreSQL database on Render
   - Get the External Database URL
   - Copy connection string to `DATABASE_URL`
   - Format: `postgresql://user:password@host:port/database`

2. **GitHub OAuth**:

   - Create OAuth app at [GitHub Developer Settings](https://github.com/settings/developers)
   - Add callback URL: `[YOUR_DOMAIN]/api/auth/callback/github`

3. **Google OAuth**:

   - Set up project in [Google Cloud Console](https://console.cloud.google.com)
   - Enable OAuth and create credentials
   - Add callback URL: `[YOUR_DOMAIN]/api/auth/callback/google`

4. **Cloudinary**:
   - Create account at [Cloudinary](https://cloudinary.com)
   - Get credentials from dashboard
   - Used for book cover image uploads

### Generate NEXTAUTH_SECRET

```bash
# Run this command to generate a secret
openssl rand -base64 32
```

### Local Development

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

## 🔄 Version Information

- Next.js: 15.x
- React: 18.x
- TypeScript: 5.x
- Tailwind CSS: 3.x
- Prisma: Latest

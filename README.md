# OpenVeda.in - Stop Guessing. Start Committing.

OpenVeda is a practical, no-bullshit platform I built to help Indian students actually get into open-source without tearing their hair out. Instead of generic advice, it gives you exact playbooks, active issues, and brutally honest mentors who've already cracked GSoC, LFX, and Outreachy.

## 🚀 What makes it different?

- **Exact Playbooks**: We tear down exactly how to get into orgs like Postman, Zerodha, and GNOME. No fluff.
- **Real Mentors**: Connect 1-on-1 with developers who actually write code for a living, not just "influencers."
- **Program Tracker**: Stop applying to everything. Track the mentorships that actually matter.
- **Built for Developers**: Fast navigation, keyboard shortcuts, and a UI that stays out of your way.
- **Dark Mode Default**: Because obviously.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion (Bespoke Animations)
- **Backend & Auth**: Supabase (PostgreSQL)
- **Infrastructure**: Vercel

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm
- Supabase Project (URL & Anon Key)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/openveda-labs/openveda.git
   cd openveda
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Initialization**:
   Run the SQL scripts to seed your Supabase instance:
   - `reconcile_db.sql` (Schema Reset)
   - `update_programs.sql` (Program Metadata)
   - `update_playbooks.sql` (Content)
   - `supabase/migrations/create_mentors.sql` (Profiles)

5. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🤝 Contributing

We welcome contributions from the community. Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

Built with ❤️ for the global contributor community.

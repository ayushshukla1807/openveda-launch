# OpenVeda.in - The Premium Open Source Launchpad

OpenVeda is a high-performance, minimalist launchpad designed to transform aspiring developers into elite open-source contributors. Built for the Indian developer ecosystem, it provides high-signal "Platinum Playbooks," 1-on-1 mentorship, and a direct bridge to prestigious programs like GSoC, LFX, Outreachy, and ESOC 2026.

## 🚀 Key Features

- **Platinum Playbooks**: Deep-dive strategy guides for top organizations (Postman, Zerodha, GNOME, etc.).
- **Mentorship Hub**: Connect directly with industry veterans and successful open-source alumni.
- **Programs Launchpad**: A centralized portal for tracking and applying to world-class mentorship initiatives.
- **Tactical Navigation**: Bespoke UI components for seamless profile and project exploration.
- **Dual-Theme Fidelity**: A robust HSL-based design system supporting both professional dark and light modes.

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
   git clone https://github.com/ayushshukla1807/openveda.git
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
   Run the SQL scripts located in the project root to seed your Supabase instance:
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

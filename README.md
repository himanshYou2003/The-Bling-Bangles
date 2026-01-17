# The Bling Bangles | Luxury Jewelry Showcase

A premium, high-performance showcase website for "The Bling Bangles", featuring a luxury aesthetic, 3D product visualization, and dynamic content management.

## 💎 Features

- **Luxury Aesthetic**: Custom gold-themed design with glassmorphism, smooth animations, and premium typography.
- **3D Bangle Showcase**: Interactive 3D model viewer using Three.js / React Three Fiber.
- **Dynamic Content**: Product details are loaded dynamically from `public/description/{id}/data.json`, allowing for easy updates without code changes.
- **Advanced Product Zoom**: Amazon-style hover zoom for detailed product inspection.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Collection Filtering**: Filter bangles by category (Modern, Traditional, etc.).

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [React Three Fiber](https://docs.pmndrs.assets/react-three-fiber) / [Drei](https://github.com/pmndrs/drei)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Run the development server**:

    ```bash
    npm run dev
    ```

3.  **Open the website**:
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

- **`app/`**: Next.js App Router pages and layouts.
- **`components/`**: Reusable UI components (e.g., `ProductZoom`, `BangleCanvas`).
- **`public/description/`**: JSON files containing bangle details (Name, Description, etc.).
- **`public/images/bangles/`**: Product images organized by ID.
- **`lib/`**: Utility functions and static data.

## 📝 Content Management

To update bangle details:

1.  Navigate to `public/description/{id}/`.
2.  Edit `data.json`.
3.  Changes will reflect immediately on the website.

To update images:

1.  Place high-resolution images in `public/images/bangles/{id}/`.
2.  Ensure filenames match what is referenced in your data (or use the standard naming convention).

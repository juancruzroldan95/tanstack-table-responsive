# TanStack Table Responsive Demo

This is a simple demo project showing how to create a **responsive table** with **collapsible hidden columns** using [TanStack Table](https://tanstack.com/table).

Depending on the screen size, the table automatically hides columns, and users can expand rows to view the hidden data.

## 📑 Article
You can read the full step-by-step article explaining how this project was built [**here**](https://dev.to/juancruzroldan/responsive-collapse-of-columns-in-tanstack-table-2175).

## 🚀 Tech Stack
- Vite + React
- TypeScript
- [@tanstack/react-table](https://tanstack.com/table)

## 🛠️ How It Works
- **Column visibility** is toggled dynamically based on screen width (using custom breakpoints).
- **Expandable rows** show hidden column data below the main row.
- **Custom expander** button to expand and collapse additional data.
The breakpoints can be easily customized to fit your needs!

## 📂 Project Structure
```
src/
 ├── components/
 │    └── Table.tsx
 ├── mocks/
 │    └── data.ts
 ├── types/
 │    └── person.ts
 └── App.tsx
```

## 📦 Getting Started
Clone the repo and install dependencies:
```bash
git clone https://github.com/juancruzroldan95/tanstack-table-responsive.git
cd tanstack-table-responsive
npm install
npm run dev
```
The app will be running at `http://localhost:5173`.

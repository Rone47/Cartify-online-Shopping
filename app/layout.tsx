import "./globals.css";
import { Toaster } from "react-hot-toast";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="font-poppins antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            // Default styles for all toasts
            style: {
              background: "#1f2937", // dark gray
              color: "#f9fafb", // light text
              padding: "12px 16px",
              borderRadius: "12px",
              fontSize: "14px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            },
            // Customize for success toast
            success: {
              style: {
                background: "#059669", // emerald green
              },
              iconTheme: {
                primary: "#d1fae5", // mint background
                secondary: "#064e3b", // dark green icon
              },
            },
            // Customize for error toast
            error: {
              style: {
                background: "#dc2626", // red-600
              },
              iconTheme: {
                primary: "#fee2e2", // rose background
                secondary: "#7f1d1d", // dark red icon
              },
            },
            // Customize for loading/info toast
            loading: {
              style: {
                background: "#3b82f6", // blue-500
              },
              iconTheme: {
                primary: "#dbeafe", // light blue
                secondary: "#1e3a8a", // navy
              },
            },
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;

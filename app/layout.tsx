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
            // Base styles for all toasts
            style: {
              background: "#111827", // rich black-blue
              color: "#FFFFFF",       // white text for contrast
              padding: "14px 18px",
              borderRadius: "16px",
              fontSize: "15px",
              fontWeight: 500,
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
              border: "1px solid #374151", // subtle border
            },
            // Success toast
            success: {
              style: {
                background: "#0a7350", // vivid emerald
                color: "#F0FDF4",
              },
              iconTheme: {
                primary: "#D1FAE5", // pale green
                secondary: "#065F46", // deep green
              },
            },
            // Error toast
            error: {
              style: {
                background: "#EF4444", // vivid red
                color: "#FFF1F2",
              },
              iconTheme: {
                primary: "#FECACA", // soft red-pink
                secondary: "#7F1D1D", // dark red
              },
            },
            // Loading/info toast
            loading: {
              style: {
                background: "#3B82F6", // bright blue
                color: "#EFF6FF",
              },
              iconTheme: {
                primary: "#BFDBFE", // soft blue
                secondary: "#1E3A8A", // deep blue
              },
            },
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;

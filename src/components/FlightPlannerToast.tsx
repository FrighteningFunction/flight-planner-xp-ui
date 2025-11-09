import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import { createContext } from "react";

export function DangerToast({ message }: Readonly<{ message: string }>) {
  const [show, setShow] = useState(true);

  return (
    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg="danger">
      <Toast.Header>
        <i className="bi bi-exclamation-triangle-fill rounded me-2" />
        <strong className="me-auto">Error</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export function SuccessToast({ message }: Readonly<{ message: string }>) {
  const [show, setShow] = useState(true);

  return (
    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg="success">
      <Toast.Header>
        <i className="bi bi-check rounded me-2" />
        <strong className="me-auto">Success</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

let toastIdCounter = 0;

interface ToastProps {
  id: number;
  type: "success" | "danger";
  message: string;
}

export const toastContext = createContext<{
  addToast: (type: "success" | "danger", message: string) => void;
  toasts: Array<ToastProps>;
}>({
  addToast: () => {},

  toasts: [],
});

export function ToastProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [toasts, setToasts] = React.useState<Array<ToastProps>>([]);

  const addToast = (type: "success" | "danger", message: string) => {
    const id = toastIdCounter++;
    setToasts((toasts) => [...toasts, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <toastContext.Provider value={{ toasts, addToast }}>
      {children}
    </toastContext.Provider>
  );
}

export function ToastContainer() {
  const { toasts } = React.useContext(toastContext);

  if (toasts.length === 0) return null;

  return (
    <div className="vstack position-absolute bottom-0 end-0 translate-middle-x gap-2">
      {toasts.map((toast) => {
        if (toast.type === "success") {
          return <SuccessToast key={toast.id} message={toast.message} />;
        } else {
          return <DangerToast key={toast.id} message={toast.message} />;
        }
      })}
    </div>
  );
}

import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

interface StatusAlertProps {
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  className?: string;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const styles = {
  success: "border-green-200 bg-green-50 text-green-800",
  error: "border-red-200 bg-red-50 text-red-800",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
  info: "border-blue-200 bg-blue-50 text-blue-800",
};

export default function StatusAlert({
  type,
  title,
  message,
  className = "",
}: StatusAlertProps) {
  const Icon = icons[type];

  return (
    <Alert className={`${styles[type]} ${className}`}>
      <Icon className="h-4 w-4" />
      <AlertDescription>
        {title && <div className="font-semibold mb-1">{title}</div>}
        {message}
      </AlertDescription>
    </Alert>
  );
}

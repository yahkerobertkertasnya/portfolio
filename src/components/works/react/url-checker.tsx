import { useEffect, useState } from "react";

interface UrlCheckerResult {
  isReachable: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useUrlChecker(url: string | undefined): UrlCheckerResult {
  const [isReachable, setIsReachable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setIsReachable(false);
      setIsLoading(false);
      return;
    }

    const checkUrl = async () => {
      try {
        setIsLoading(true);
        setError(null);

        await fetch(url, {
          method: "HEAD",
          mode: "no-cors",
        });

        setIsReachable(true);
      } catch {
        try {
          const img = new Image();
          img.onload = () => setIsReachable(true);
          img.onerror = () => setIsReachable(false);
          img.src = url;

          setTimeout(() => {
            if (isLoading) {
              setIsReachable(false);
              setError("Timeout");
            }
          }, 5000);
        } catch {
          setIsReachable(false);
          setError("URL not reachable");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkUrl();
  }, [url]);

  return { isReachable, isLoading, error };
}

export default function UrlChecker({ url, children }: { url: string | undefined; children: (result: UrlCheckerResult) => React.ReactNode }) {
  const result = useUrlChecker(url);
  return <>{children(result)}</>;
}

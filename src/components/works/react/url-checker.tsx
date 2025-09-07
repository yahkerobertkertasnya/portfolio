import { useState, useEffect } from "react";

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
        
        // Use a HEAD request to check if the URL is reachable
        await fetch(url, {
          method: 'HEAD',
          mode: 'no-cors', // This allows checking cross-origin URLs
        });
        
        // For no-cors mode, we can't read the response status
        // So we assume it's reachable if no error is thrown
        setIsReachable(true);
      } catch {
        // If fetch fails, try with a different approach
        try {
          // Create an image element to test if the URL loads
          const img = new Image();
          img.onload = () => setIsReachable(true);
          img.onerror = () => setIsReachable(false);
          img.src = url;
          
          // Set a timeout to avoid hanging
          setTimeout(() => {
            if (isLoading) {
              setIsReachable(false);
              setError('Timeout');
            }
          }, 5000);
        } catch {
          setIsReachable(false);
          setError('URL not reachable');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkUrl();
  }, [url]);

  return { isReachable, isLoading, error };
}

export default function UrlChecker({ 
  url, 
  children 
}: { 
  url: string | undefined; 
  children: (result: UrlCheckerResult) => React.ReactNode;
}) {
  const result = useUrlChecker(url);
  return <>{children(result)}</>;
}

import { useUrlChecker } from "./url-checker";

interface LiveStatusProps {
  projectUrl: string | undefined;
  children?: React.ReactNode;
}

export default function LiveStatus({ projectUrl, children }: LiveStatusProps) {
  const { isReachable, isLoading } = useUrlChecker(projectUrl);

  if (isLoading) {
    return (
      <div className="relative flex items-center">
        <span className="inline-flex h-3 w-3 animate-pulse rounded-full bg-gray-500" />
        <p className="ps-3 text-base text-white/50 max-lg:text-sm">Checking...</p>
      </div>
    );
  }

  if (!isReachable) {
    return null;
  }

  return <>{children}</>;
}

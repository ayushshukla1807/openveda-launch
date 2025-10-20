import Link from 'next/link';

// ... (Keep the GitHubIssue interface)

interface GitHubIssue {
  id: number;
  html_url: string;
  title: string;
  user: {
    login: string;
  };
  created_at: string;
  comments: number;
}

export default function LiveIssuesList({ issues, isLoading }: { issues: GitHubIssue[], isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Simple Loading Skeletons */}
        <div className="h-20 bg-gray-800 rounded-lg animate-pulse"></div>
        <div className="h-20 bg-gray-800 rounded-lg animate-pulse"></div>
        <div className="h-20 bg-gray-800 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <Link href={issue.html_url} key={issue.id} target="_blank" rel="noopener noreferrer" className="block p-6 bg-card border rounded-lg hover:border-primary transition-all">
          <p className="font-semibold text-lg text-card-foreground">{issue.title}</p>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <span>#{issue.id.toString().substring(0, 5)} by {issue.user.login}</span>
            <span className="mx-2">•</span>
            <span>{issue.comments} comments</span>
            <span className="mx-2">•</span>
            <span>Opened on {new Date(issue.created_at).toLocaleDateString()}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
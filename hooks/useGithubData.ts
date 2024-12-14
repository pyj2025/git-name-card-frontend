import { useQuery } from '@tanstack/react-query';

export function useGithubData(githubId: string) {
  const fetchGithubData = async (endpoint: string) => {
    const response = await fetch(`http://localhost:8000/${endpoint}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };

  return {
    name: useQuery({
      queryKey: ['name', githubId],
      queryFn: () => fetchGithubData(`get_name/${githubId}`)
    }),
    repos: useQuery({
      queryKey: ['repos', githubId],
      queryFn: () => fetchGithubData(`get_repos/${githubId}`)
    }),
    followers: useQuery({
      queryKey: ['followers', githubId],
      queryFn: () => fetchGithubData(`get_followers/${githubId}`)
    }),
  };
}

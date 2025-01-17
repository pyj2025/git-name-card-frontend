import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username } = await req.json();
    
    const headers: HeadersInit = process.env.GITHUB_ACCESS_TOKEN 
      ? {
          'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      : {
          'Accept': 'application/vnd.github.v3+json'
        };

    const userResponse = await fetch(`https://api.github.com/users/${username}`, { 
      headers,
      next: { revalidate: 3600 }
    });

    if (!userResponse.ok) {
      throw new Error('User not found');
    }

    const userData = await userResponse.json();

    return NextResponse.json({
      login: userData.login,
      id: userData.id,
      avatar_url: userData.avatar_url,
      html_url: userData.html_url,
      name: userData.name,
      company: userData.company,
      blog: userData.blog,
      location: userData.location,
      email: userData.email,
      bio: userData.bio,
      twitter_username: userData.twitter_username,
      public_repos: userData.public_repos,
      public_gists: userData.public_gists,
      followers: userData.followers,
      following: userData.following,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
      hireable: userData.hireable,
      type: userData.type
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
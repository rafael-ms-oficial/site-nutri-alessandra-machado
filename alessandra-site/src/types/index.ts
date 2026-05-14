export interface Post {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  category: string | null;
  published: boolean;
  author: string;
}

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  answers: string[] | null;
  source: string;
}

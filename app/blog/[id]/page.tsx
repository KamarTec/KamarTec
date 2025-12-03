import BlogPostContent from './BlogPostContent';

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await the params at the top level
  const { id } = await params;
  
  // Return a client component with the id as a prop
  return <BlogPostContent postId={id} />;
}
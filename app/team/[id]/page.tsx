// app/team/[id]/page.tsx
import TeamMemberContent from './TeamMemberContent';

export default async function TeamMemberPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await the params at the top level
  const { id } = await params;
  
  // Return a client component with the id as a prop
  return <TeamMemberContent memberId={id} />;
}
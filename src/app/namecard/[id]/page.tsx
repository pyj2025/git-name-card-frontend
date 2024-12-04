import NameCardClient from '@/components/NameCardClient';

export default function NameCardPage({ params }: { params: { id: string } }) {
  return <NameCardClient id={params.id} />;
}

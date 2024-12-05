import NameCardClient from '../../../components/NameCardClient';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function NameCardPage({ params }: PageProps) {
  const { id } = await Promise.resolve(params);

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto mt-10">
        <NameCardClient id={id} />
      </div>
    </div>
  );
}

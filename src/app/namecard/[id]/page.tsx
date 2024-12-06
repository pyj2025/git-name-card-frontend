import NameCard from '../../../components/NameCard';

interface PageProps {
  params: {
    id: string;
  };
}

export default function NameCardPage({ params }: PageProps) {
  const { id } = params;

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto mt-10">
        <NameCard id={id} />
      </div>
    </div>
  );
}

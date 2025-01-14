import CardPage from '../../../components/card/card-page';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function NameCardPage({ params }: PageProps) {
  const { id } = params;

  return (
    <div className="min-h-screen p-4 bg-gray-50 flex items-center justify-center border">
      <div className="w-full max-w-2xl border">
        <CardPage id={id} />
      </div>
    </div>
  );
}

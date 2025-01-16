import CardPage from '../../../components/card/card-page';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function NameCardPage({ params }: PageProps) {
  const { id } = params;

  return (
    <div className="h-screen bg-gray-50">
      <div className="h-full w-full max-w-2xl mx-auto">
        <CardPage id={id} />
      </div>
    </div>
  );
}

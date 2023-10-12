import primsadb from '@/lib/prismadb';
import { CompanionForm } from './components/CompanionForm';
import { auth, redirectToSignIn } from '@clerk/nextjs';

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await primsadb.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    },
  });

  const categories = await primsadb.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;

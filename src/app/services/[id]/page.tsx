import { storage } from '@/lib/storage/adapter';
import { ServiceDetailClient } from './ServiceDetailClient';

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await storage.getServiceById(id);

  return <ServiceDetailClient initialService={service} />;
}

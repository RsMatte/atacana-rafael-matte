import { getFilteredData } from '@/db/filter';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');
  const status = searchParams.get('status');
  const phase = searchParams.get('phase');

  if (!page || !parseInt(page))
    return new Response('Page parameter missing', { status: 500 });

  const data = await getFilteredData({ page: parseInt(page), status, phase });

  return Response.json(data);
}

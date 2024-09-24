import { getTrials } from '@/db/get';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');
  const status = searchParams.get('status') || '';
  const phase = searchParams.get('phase') || '';
  const term = searchParams.get('term') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';

  if (!page || !parseInt(page))
    return new Response('Page parameter missing', { status: 500 });

  return getTrials({ page: parseInt(page), status, phase, term, from, to })
    .then((data) => Response.json(data))
    .catch((e) => new Response(e, { status: 500 }));
}

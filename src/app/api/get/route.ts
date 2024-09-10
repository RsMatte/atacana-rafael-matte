import { getTrialByCode } from '@/db/get';

const codeRegex = new RegExp('^NCT[0-9]{8}$');

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code || !code.match(codeRegex))
    return new Response('Invalid code', { status: 500 });

  const trial = await getTrialByCode({ code });

  if (!trial) return new Response('Trial not found', { status: 404 });

  return Response.json(trial);
}

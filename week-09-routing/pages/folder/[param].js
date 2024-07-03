import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Page from '@/components/Page';

export default function Param() {
  const router = useRouter();
  const { param } = router.query;

  return (
    <Page>
      <Typography variant="h1">Param Page</Typography>
      <Typography>The param value is {param}.</Typography>
    </Page>
  );
}

import { Button } from '@/components/ui/button';
import { ButtonLoading } from '@/components/ui/button-loading';

export default function Home() {
  return (
    <>
      <Button>test</Button>
      <Button>test</Button>

      <ButtonLoading loading>loading test</ButtonLoading>
    </>
  );
}

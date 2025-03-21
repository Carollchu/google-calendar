import { Button, Heading, MultiStep, Text } from '@ignite-ui/react';
import { ArrowRight } from 'phosphor-react';
import { Container, Header } from '../styles';
import { ConnectBox, ConnectItem } from './styles';
import { signOut, useSession } from 'next-auth/react';

import previewImage from '../../../assets/microsoft_logo.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { data, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleSignOut = async () => {
    document.cookie = 'next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'next-auth.callback-url=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'next-auth.csrf-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';

    await signOut({ callbackUrl: '/register/connect', redirect: true });
  };

  if (status === 'loading') {
    return <p>Loading...</p>; // Show loading state when session is loading
  }

  return status === 'authenticated' ? (
    <Container>
      <Header>
        <Image
          width={60}
          height={60}
          quality={100}
          alt={data?.user?.name || ''}
          src={data?.user?.image || ''}
          style={{ borderRadius: '50%' }}
        />
        <Heading as="h2">{data?.user?.name}</Heading>
        <Text>{data?.user?.email}</Text>

        <Heading as="strong">Você está conectado!</Heading>
        <Text>Agora que está conectado pode realizar o envio de informações</Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Image
            src={previewImage}
            height={20}
            quality={100}
            priority
            alt="Microsoft logo"
          />
          <Button variant="secondary" size="sm" onClick={handleSignOut}>
            Logout
            <ArrowRight />
          </Button>
        </ConnectItem>
      </ConnectBox>
    </Container>
  ) : (
    <p>Loading...</p>
  );
}
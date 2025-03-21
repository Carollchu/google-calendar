import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Container, Header } from '../styles'
import { ConnectBox, ConnectItem } from './styles'
import { signIn } from 'next-auth/react'

import previewImage from '../../../assets/microsoft_logo.svg'
import Image from 'next/image'
 
 export default function Register() {
  
   return (
     <Container>
       <Header>
         <Heading as="strong">Conecte sua conta Microsoft</Heading>
         <Text>
           Conecte o sua conta microsoft para realizar os agendamentos envio de dados.
         </Text>
 
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
           <Button variant="secondary" size="sm" onClick={() => {
                signIn(
                 'azure-ad',
                  { callbackUrl: '/register/dashboard' },
                  { prompt: 'login' },
                );
              }}
            >
              Log in
             <ArrowRight />
           </Button>
         </ConnectItem>
 
         {/* <Button type="submit">
           Próximo passo
           <ArrowRight />
         </Button> */}
       </ConnectBox>
     </Container>
   )
 }
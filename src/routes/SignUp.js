import { Button, Flex, FormControl, Image, FormLabel, Input, InputGroup, InputRightElement, Stack, Text, Link } from "@chakra-ui/react";
import { Link as ReachLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react"
import { useAuth } from "../context/auth-context";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import dogwithglasses from '../img/dogwithglasses.png'
import logo from '../img/logo.png'
import symbol from '../img/symbol.png'

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signin } = useAuth();

  const from = location.state?.from?.pathname || "/";

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    await signin({ email, password });
    navigate(from, { replace: true });
  }

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)


  return (
    <Flex direction={'column'} align='center' pb={'24px'}>
      <Flex direction={'column'} bgImage={dogwithglasses} w='100%' bgPosition={'center'}
        bgRepeat='no-repeat' color='white'
        fontSize={'36px'} fontWeight='700' lineHeight={'49px'} p={'46px 32px 43px 26px'} justify='space-between'>
        <Image src={symbol} w={53} />
      </Flex>
      <FormControl as={Flex} marginTop={'32px'} px='32px' flexDirection={'column'} gap={'16px'} onSubmit={handleSubmit}>
        <Text fontSize={'24px'} fontWeight={'600'} lineHeight={'40px'}>Cadastro</Text>
        <FormLabel htmlFor='name' mt={'32px'}>Nome
          <Input id='name' type='text' placeholder="Nome" />
        </FormLabel>
        <FormLabel htmlFor='email'>Email
          <Input id='email' type='email' placeholder="Email" />
        </FormLabel>
        <FormLabel htmlFor='username'>Nome de usuário
          <Input id='username' type='text' placeholder="Ex.: @billbulldog" />
        </FormLabel>
        <FormLabel htmlFor='password'>Senha
          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Senha'
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick} bg='none'>
                {show ? <ViewOffIcon boxSize={6} /> : <ViewIcon boxSize={6} />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Text fontSize={'10px'}>Deve conter no mínimo um número e uma letra maiúscula</Text>
        </FormLabel>

        <Button bgColor='#00ACC1' color={'white'} mt={'44px'}>Cadastrar</Button>


        <Stack>
          <Text>Já possui cadastro?</Text>
          <Link as={ReachLink} to={'/'} color='#00acc1'>Faça login</Link>
        </Stack>
      </FormControl>

      <Image mt={'37px'} src={logo} height={'43px'} width='180px' />
    </Flex>
  );
}

export default SignUp;

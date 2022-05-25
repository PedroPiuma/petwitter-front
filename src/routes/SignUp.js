import { Button, Flex, FormControl, Image, FormLabel, Input, InputGroup, InputRightElement, Stack, Text, Link, Alert, AlertIcon } from "@chakra-ui/react";
import { Link as ReachLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import dogwithglasses from '../img/dogwithglasses.png'
import logo from '../img/logo.png'
import symbol from '../img/symbol.png'
import { signup } from "../services/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const schema = yup.object({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("Email obrigatório"),
    username: yup.string().required("Nome de usuário obrigatório"),
    password: yup.string().required("Senha Obrigatória"),
  }).required();
  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), });

  const onSubmit = async (event) => {
    try {
      const { name, email, username, password } = event
      await signup({ name, email, username, password });
      alert("Usuário criado com sucesso. Efetue o login para continuar")
      navigate(from, { replace: true });
    } catch (error) {
      console.log('Falha no submit')
    }
  }

  return (
    <Flex direction={'column'} align='center' pb={'24px'}>
      <Flex direction={'column'} bgImage={dogwithglasses} w='100%' bgPosition={'center'}
        bgRepeat='no-repeat' color='white'
        fontSize={'36px'} fontWeight='700' lineHeight={'49px'} p={'46px 32px 43px 26px'} justify='space-between'>
        <Image src={symbol} w={53} />
      </Flex>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl as={Flex} marginTop={'32px'} px='32px' flexDirection={'column'} gap={'16px'} onSubmit={handleSubmit}>
          <Text fontSize={'24px'} fontWeight={'600'} lineHeight={'40px'}>Cadastro</Text>
          <FormLabel htmlFor='name' mt={'32px'}>Nome
            <Input id='name' type='text' placeholder="Nome" {...register("name")} />
            {errors.name && <Alert status='warning'><AlertIcon />{errors.name.message}</Alert>}
          </FormLabel>
          <FormLabel htmlFor='email'>Email
            <Input id='email' type='email' placeholder="Email" {...register("email")} />
            {errors.email && <Alert status='warning'><AlertIcon />{errors.email.message}</Alert>}
          </FormLabel>
          <FormLabel htmlFor='username'>Nome de usuário
            <Input id='username' type='text' placeholder="Ex.: billbulldog" {...register("username")} />
            {errors.username && <Alert status='warning'><AlertIcon />{errors.username.message}</Alert>}
          </FormLabel>
          <FormLabel htmlFor='password'>Senha
            <InputGroup size='md'>
              <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Senha' {...register("password")} />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick} bg='none'>
                  {show ? <ViewOffIcon boxSize={6} /> : <ViewIcon boxSize={6} />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && <Alert status='warning'><AlertIcon />{errors.password.message}</Alert>}
            <Text fontSize={'10px'}>Deve conter no mínimo um número e uma letra maiúscula</Text>
          </FormLabel>

          <Button bgColor='#00ACC1' type="submit" color={'white'} mt={'44px'}>Cadastrar</Button>


          <Stack>
            <Text>Já possui cadastro?</Text>
            <Link as={ReachLink} to={'/'} color='#00acc1'>Faça login</Link>
          </Stack>
        </FormControl>
      </form>

      <Image mt={'37px'} src={logo} height={'43px'} width='180px' />
    </Flex>
  );
}

export default SignUp;

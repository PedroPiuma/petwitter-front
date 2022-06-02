import {
  useMediaQuery, Button, Flex, FormControl, Image, FormLabel,
  Input, InputGroup, InputRightElement, Stack, Text, Link, Alert, AlertIcon
} from "@chakra-ui/react";
import { Link as ReachLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import dogWithGlasses from '../img/dogwithglasses.png'
import logo from '../img/logo.png'
import symbol from '../img/symbol.png'
import { signup } from "../services/auth";
import dogWithGlassesDesktop from '../img/dogwithglassesdesktop.png'
import logoDesktop from '../img/logoDesktop.png'
import symbolBlue from '../img/symbolBlue.png'

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const [isLargerThan480] = useMediaQuery('(min-width: 480px)')

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
    <Flex direction={['column', 'row']} align='center' pb={['24px', 0]}>

      <Flex direction={'column'} bgImage={[dogWithGlasses, dogWithGlassesDesktop]} w='100%' maxW={'628px'} bgPosition={'center'} bgSize={'cover'}
        bgRepeat='no-repeat' color='white' height={['143px', '100vh']} bgColor='gray' alignSelf={'flex-start'}
        fontSize={'36px'} fontWeight='700' lineHeight={'49px'} p={'46px 32px 25px 26px'} justify={['space-between', 'center']}>
        {!isLargerThan480 ? <Image src={symbol} w={53} /> : <Image src={logoDesktop} width={'418px'} alignSelf='center' />}
      </Flex>

      <Stack alignSelf={'flex-start'} pl={['32px', '66px']} pr={['32px', '64px']} pt={['32px', '30px']} width={'100%'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl as={Flex} flexDirection={'column'} >
            {isLargerThan480 ? <Image src={symbolBlue} maxW={'76px'} /> : ''}
            <Text fontSize={'24px'} fontWeight={'600'} lineHeight={'40px'} pt={['', '20px']}>Cadastro</Text>
            <Stack spacing={'16px'}>
              <FormLabel htmlFor='name' margin={0} mt={['32px', '16px']} >Nome
                <Input id='name' type='text' placeholder="Nome" variant='outline' {...register("name")} />
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
            </Stack>

            <Button bgColor='#00ACC1' type="submit" color={'white'} mt={['36px', '28px']}>Cadastrar</Button>

            <Text>Já possui cadastro?{isLargerThan480 ? ' ' : <br />}<Link as={ReachLink} to={'/'} color='#00acc1'>Faça login</Link></Text>

          </FormControl>
        </form>
      </Stack>

      {isLargerThan480 ? '' : <Image mt={'37px'} src={logo} height={'43px'} width='180px' />}
    </Flex>
  );
}

export default SignUp;

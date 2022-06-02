import {
  Button, Flex, FormControl, Image, FormLabel, Input, InputGroup, InputRightElement,
  Stack, Text, Link, useMediaQuery
} from "@chakra-ui/react";
import { Link as ReachLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react"
import { useAuth } from "../context/auth-context";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import dogWithGlasses from '../img/dogwithglasses.png'
import dogWithGlassesDesktop from '../img/dogwithglassesdesktop.png'
import logo from '../img/logo.png'
import symbol from '../img/symbol.png'
import symbolBlue from '../img/symbolBlue.png'
import logoDesktop from '../img/logoDesktop.png'

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signin } = useAuth();
  const from = location.state?.from?.pathname || "/"
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const [isLargerThan480] = useMediaQuery('(min-width: 480px)')

  const schema = yup.object({
    email: yup.string().required("Email obrigatório"),
    password: yup.string().required("Senha Obrigatória"),
  }).required();
  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), });

  const onSubmit = async (event) => {
    try {
      await signin(event);
      navigate(from, { replace: true });
    } catch (error) {
      console.log('Falha no login')
      console.log(error)
    }
  }

  return (
    <Flex direction={['column', 'row']} align='center' pb={['24px', 0]}>
      <Flex direction={'column'} bgImage={[dogWithGlasses, dogWithGlassesDesktop]} w='100%' maxW={'768px'} bgPosition={'center'} bgSize={'cover'}
        bgRepeat='no-repeat' color='white' height={['262px', '100vh']}
        fontSize={'36px'} fontWeight='700' lineHeight={'49px'} p={'46px 32px 25px 26px'} justify={['space-between', 'center']}>
        {!isLargerThan480 ?
          <>
            <Image src={symbol} w={53} />
            <Stack>
              <Text>Comece agora.</Text>
              <Text>Conecte-se já!</Text>
            </Stack>
          </>
          :
          <Image src={logoDesktop} width={'418px'} alignSelf='center' />
        }
      </Flex>

      <Stack alignSelf={'flex-start'} marginTop={['32px', 0]} px={['32px', '72px']} pt={[0, '30px']}>
        <form onSubmit={handleSubmit(onSubmit)} >
          <FormControl as={Flex} flexDirection={'column'} gap={['40px', '20px']} >
            {isLargerThan480 ? <>
              <Image src={symbolBlue} maxW={'76px'} />
              <Text fontWeight={700} fontSize='36px' lineHeight={'49px'} color={'#00ACC1'}>Comece agora.<br />Conecte-se já!</Text>
            </> : ''}
            <Text fontSize='24px' fontWeight='600' lineHeight='40px'>Login</Text>
            <FormLabel>E-mail
              <Input id="email" type='email' placeholder="E-mail" variant={'outline'} {...register("email")} />
              {errors.email && <span>{errors.email.message}</span>}
            </FormLabel>
            <FormLabel>Senha
              <InputGroup size='md'>
                <Input id="password" pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Senha' {...register("password")} />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick} bg='none'>
                    {show ? <ViewOffIcon boxSize={6} /> : <ViewIcon boxSize={6} />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && <span>{errors.password.message}</span>}
            </FormLabel>
            <Button bgColor='#00ACC1' type="submit" color={'white'} >Entrar</Button>
            <Text>Ainda não possui uma conta?{isLargerThan480 ? ' ' : <br />}<Link as={ReachLink} to={'/signup'} color='#00acc1'>Cadastrar-se</Link></Text>
          </FormControl>
        </form>
      </Stack>
      {isLargerThan480 ? '' : <Image mt={'37px'} src={logo} height={'43px'} width='180px' />}
    </Flex>
  );
}

export default Login;

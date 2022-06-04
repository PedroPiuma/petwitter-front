import {
    Flex, Text, Icon, Input, InputGroup, InputLeftElement, InputRightElement,
    Button, useToast, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader
} from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { BsPencil, BsCheckLg } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdPets } from 'react-icons/md';
import { updateProfile } from "../services/auth";
import { useAuth } from "../context/auth-context";
import { useLocation } from "react-router-dom";

const Username = ({ name, setRefresh }) => {
    const [changingName, setChangingName] = useState(false)
    const { user } = useAuth()
    const location = useLocation()
    const toast = useToast()

    const schema = yup.object({ name: yup.string().max(25, 'Máximo 25 caracteres!').required("Nome obrigatório!") }).required();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema), });

    const onSubmit = async (event) => {
        try {
            const { name } = event
            await updateProfile(user.id, { name });
            toast({
                position: 'top',
                title: 'Perfil atualizado com sucesso.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            reset()
            setRefresh(Date.now())
        } catch (error) {
            toast({
                position: 'top',
                title: 'Ruf Ruf!?',
                description: 'Não foi possível atualizar pet name: ' + error.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
        } finally {
            setChangingName(false)
        }
    }

    return (changingName ?
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex align='center' >
                <InputGroup >
                    <InputLeftElement pointerEvents='none' children={<Icon as={MdPets} />} />
                    <Input type='text' defaultValue={user.name} placeholder='Nome do Pet' maxLength={25} {...register("name")} autoComplete='off' />
                    <Popover>
                        <PopoverTrigger>
                            <InputRightElement children={<Button type="submit" borderRadius={'0 8px 8px 0'}><Icon as={BsCheckLg} color='green.500' /></Button>} cursor='pointer' _hover={{ backgroundColor: 'green', borderRadius: '0 8px 8px 0' }} />
                        </PopoverTrigger>
                        {errors.name &&
                            <PopoverContent w={'fit-content'}>
                                <PopoverArrow />
                                <PopoverHeader bgColor={'red.500'} borderRadius='5px' color={'white'}>{errors.name.message}?!</PopoverHeader>
                            </PopoverContent>}
                    </Popover>
                </InputGroup>
                <Icon as={AiFillCloseCircle} w={'20px'} h={'20px'} ml={'5px'} cursor='pointer' color={'red.600'} onClick={() => setChangingName(false)} />
            </Flex >
        </form >
        :
        <Flex>
            <Text fontWeight={[700]} fontSize={['24px']} lineHeight={['33px']}>{name}</Text>
            {location.pathname === '/profile' ? <Icon as={BsPencil} w={'12px'} h={'12px'} ml={'5px'} cursor='pointer' onClick={() => location.pathname === '/profile' ? setChangingName(true) : ''} /> : ''}
        </Flex>
    )
}

export default Username

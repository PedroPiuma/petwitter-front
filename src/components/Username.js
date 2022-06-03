import {
    Flex, Text, Icon, Input, InputGroup, InputLeftElement, InputRightElement,
    Alert, AlertIcon, Button, useToast
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

const Username = ({ name }) => {
    const [changingName, setChangingName] = useState(false)
    const [profileName, setProfileName] = useState(false)
    const { user } = useAuth()
    const location = useLocation()
    const toast = useToast()

    const schema = yup.object({
        name: yup.string().required("Nome obrigatório"),
    }).required();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema), });

    const onSubmit = async (event) => {
        try {
            const { name } = event
            await updateProfile(user.id, { name });
            toast({
                position: 'top',
                title: 'Perfil atualizado com sucesso.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            reset()
            setChangingName(false)
            setProfileName(name)
        } catch (error) {
            console.log('Falha no submit')
        }
    }

    return (changingName ?
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex align='center' >
                <InputGroup >
                    <InputLeftElement pointerEvents='none' children={<Icon as={MdPets} />} />
                    <Input type='text' placeholder='Nome do pet' {...register("name")} autoComplete='off' />
                    {errors.name && <Alert status='warning'><AlertIcon />{errors.name.message}</Alert>}
                    <InputRightElement children={<Button type="submit" borderRadius={'0 8px 8px 0'}><Icon as={BsCheckLg} color='green.500' /></Button>} cursor='pointer' _hover={{ backgroundColor: 'green', borderRadius: '0 8px 8px 0' }} />
                </InputGroup>
                <Icon as={AiFillCloseCircle} w={'20px'} h={'20px'} ml={'5px'} cursor='pointer' color={'red.600'} onClick={() => setChangingName(false)} />
            </Flex >
        </form >
        :
        <Flex>
            <Text fontWeight={[700]} fontSize={['24px']} lineHeight={['33px']}>{profileName || name}</Text>
            {location.pathname === '/profile' ? <Icon as={BsPencil} w={'12px'} h={'12px'} ml={'5px'} cursor='pointer' onClick={() => location.pathname === '/profile' ? setChangingName(true) : ''} /> : ''}
        </Flex>
    )
}

export default Username

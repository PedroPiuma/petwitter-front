import {
    Button, Flex, Stack, Textarea, Image, Text, useColorMode,
    PopoverContent, PopoverArrow, PopoverHeader, Popover, PopoverTrigger, useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { createPetweet } from '../services/auth'
import { useAuth } from '../context/auth-context';
import profileDefault from '../img/profileDefault.png'

const PetweetBox = ({ setRefresh, onClose, setJump }) => {
    const [petwitteLength, setPetwitteLength] = useState(0)
    const [sending, setSending] = useState(false)
    const { colorMode } = useColorMode()
    const { user } = useAuth()
    const toast = useToast()

    const schema = yup.object({ body: yup.string().required("Texto obrigatório") }).required();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema), });

    const onSubmit = async (event) => {
        try {
            const { body } = event
            setSending(true)
            const response = await createPetweet({ body })
            if (response.status === 200) toast({
                title: 'Petweet feito com sucesso',
                position: 'top',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            reset()
            setPetwitteLength(0)
        } catch (error) {
            alert('Falha em petwittar')
            console.log(error)
        } finally {
            setJump(0)
            setSending(false)
            setRefresh(Date.now())
            onClose()
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} onChange={event => setPetwitteLength(event.target.value.length)}>
            <Stack w={['360px', '683px']} direction={['column']} display={['none', 'flex']} p={['20px 16px 16px 16px']} borderBottom={'8px solid #EEEEEE'}>
                <Flex>
                    <Image src={user.image_url ? user.image_url : profileDefault} borderRadius='full' boxSize={['48px', '40px']} />
                    <Textarea id='petwitte' disabled={false} border={'none'} _focus={{ border: 'none' }} resize={'none'} placeholder='O que está acontecendo?' maxLength="140"  {...register("body")} />
                </Flex>
                <Flex align={'center'} gap={'8px'} alignSelf='flex-end'>
                    <Text color={'#828282'} fontSize={'14px'} lineHeight={'24px'}>{petwitteLength}/140</Text>
                    <Popover>
                        <PopoverTrigger>
                            <Button isLoading={sending} bg={colorMode === 'light' ? '#99dee6' : '#3e3e3e'} color={'white'} borderRadius='8px' size={'sm'} type={'submit'}>Petwittar</Button>
                        </PopoverTrigger>
                        {errors.body && <PopoverContent w={'fit-content'}>
                            <PopoverArrow />
                            <PopoverHeader bgColor={'#ffba8e'} borderRadius='5px'>Petweet vazio?!</PopoverHeader>
                        </PopoverContent>}
                    </Popover>
                </Flex>
            </Stack>
        </form>
    )
}

export default PetweetBox

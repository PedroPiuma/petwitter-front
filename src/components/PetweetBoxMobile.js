import { Button, Flex, Textarea, Image, Text, useColorMode, Alert, AlertIcon } from '@chakra-ui/react'
import { useState } from 'react'
import profileDefault from '../img/profileDefault.png'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { createPetweet } from '../services/auth'
import { useAuth } from '../context/auth-context';

const PetweetBox = ({ setRefresh, onClose }) => {
    const [petwitteLength, setPetwitteLength] = useState(0)
    const [sending, setSending] = useState(false)
    const { colorMode } = useColorMode()
    const { user } = useAuth()

    const schema = yup.object({ body: yup.string().required("Texto obrigatório") }).required();
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), });

    const onSubmit = async (event) => {
        const { body } = event
        try {
            setSending(true)
            await createPetweet({ body });
            alert('Twitte criado com sucesso')
            document.getElementById('petwitte').value = ''
        } catch (error) {
            alert('Falha em petwittar')
            console.log(error)
        } finally {
            onClose()
            setSending(false)
            setRefresh(Date.now())
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} onChange={event => setPetwitteLength(event.target.value.length)}>
            <Flex paddingLeft={'16px'} paddingRight={'8px'} align={'center'} justifyContent={'space-between'} alignSelf='flex-end' borderBottom={'1px solid #ebebeb'} height={'64px'}>
                <Button colorScheme='blue' mr={3} onClick={onClose} variant={'link'} fontWeight={300} fontSize='12px' lineHeight={'21px'} color='#424242'>Cancelar</Button>
                <Flex align={'center'} gap={'8px'}>
                    <Text color={'#828282'} fontSize={'14px'} lineHeight={'24px'}>{petwitteLength}/140</Text>
                    <Button isLoading={sending} bg={colorMode === 'light' ? '#99dee6' : '#3e3e3e'} color={'white'} borderRadius='8px' size={'sm'} type={'submit'}>Petwittar</Button>
                </Flex>
            </Flex>
            {errors.body && <Alert status='warning'><AlertIcon />{errors.body.message}</Alert>}
            <Flex mt={'6px'} paddingLeft={'16px'} paddingRight={'8px'}>
                <Image crossOrigin='anonymous' src={user.image_url ? process.env.REACT_APP_API_URL + '/' + user.image_url : profileDefault} borderRadius='full' boxSize={'37px'} />
                <Textarea id='petwitte' disabled={false} border={'none'} _focus={{ border: 'none' }} resize={'none'} placeholder='O que está acontecendo?' maxLength="140"  {...register("body")} />
            </Flex>
        </form>
    )
}

export default PetweetBox

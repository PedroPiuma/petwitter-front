import {
    Stack, Image, Text, Flex, UnorderedList, ListItem, useColorMode,
    Icon, Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow,
    PopoverHeader, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, useDisclosure, useToast
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import profileDefault from '../img/profileDefault.png'
import client from '../providers/client'
import ReactTimeAgo from 'react-time-ago'
import { FaEllipsisH } from 'react-icons/fa'
import { HiOutlineTrash } from 'react-icons/hi'
import { deletePetwitte } from "../services/auth"
import { useForm } from "react-hook-form";

const Petwitte = ({ body, createdAt, user_id, id, setRefresh, image }) => {
    const [user, setUser] = useState([])
    const [userPicture, setUserPicutre] = useState(profileDefault)
    const { colorMode } = useColorMode()
    const location = useLocation()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { handleSubmit, reset } = useForm();
    const toast = useToast()

    useEffect(() => {
        const request = async () => {
            try {
                const response = await client.get(`/users/${user_id}`)
                setUser(response.data)
                if (image) setUserPicutre(image)
                else if (user.image_url) setUserPicutre(user.image_url)
            } catch (error) {
                const id = 'error-toast'
                if (!toast.isActive(id)) {
                    toast({
                        id,
                        position: 'top',
                        title: 'Ruf Ruf!?',
                        description: error.message,
                        status: 'error',
                        duration: 10000,
                        isClosable: true,
                    })
                }
            }
        }
        request()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user_id, user.image_url])

    const onSubmit = async () => {
        try {
            await deletePetwitte(id)
            toast({
                position: 'top',
                title: 'Ruf Ruf! Petwitte deletado!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            setRefresh(Date.now())
        } catch (error) {
            toast({
                position: 'top',
                title: 'Ruf Ruf!?',
                description: error.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
        } finally {
            onClose()
            reset()
        }
    }

    return (
        <Stack direction={'row'} p={['20px 16px 16px 16px']} borderBottom={'1px solid #EEEEEE'} maxW={['360px', '683px']}>
            <Image src={userPicture} borderRadius='full' boxSize={['48px', '40px']} />
            <Flex direction={'column'} gap={['4px', '9px']} width='100%' position={'relative'}>
                <Stack direction={'row'} align='center' gap={['4px']} >
                    <Link to={location.pathname === '/' ? `profile/${user_id}` : '#'} ><Text color={colorMode === 'light' ? ['#7d7d7d', 'black'] : '#e2e2e2'} fontWeight={700} fontSize={['14px', '15px']} lineHeight={['19px', '20px']} maxW={['100px', '200px']}>{user.name}</Text></Link>
                    <Text color={['#7d7d7d', '#828282']} fontWeight={[300, 400]} fontSize={['12px', '15px']} lineHeight={['17px', '20px']}>{user.username}</Text>
                    <UnorderedList ><ListItem ml={'15px'} color={'#757575'} fontWeight={300} fontSize={'12px'} lineHeight={'17px'}> <ReactTimeAgo date={Date.parse(createdAt)} locale="pt-BR" /></ListItem></UnorderedList>
                    {location.pathname === '/profile' ? <Popover>
                        <PopoverTrigger>
                            <Button position='absolute' variant={'link'} right={0}><Icon as={FaEllipsisH} /></Button>
                        </PopoverTrigger>
                        <PopoverContent w={'fit-content'} cursor='pointer' onClick={onOpen}>
                            <PopoverArrow />
                            <PopoverHeader display={'flex'} alignItems='center' gap={'8px'} color={'#f4212e'}><Icon as={HiOutlineTrash} boxSize='20px' />Deletar</PopoverHeader>
                        </PopoverContent>
                    </Popover> : ''}
                </Stack>
                <Text fontWeight={400} lineHeight={'18px'} color={colorMode === 'light' ? '#141619' : '#e2e2e2'}>{body}</Text>
            </Flex>

            {location.pathname === '/profile' && user.id === user_id ? <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Deletar Petwitte?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} flexDirection={'column'} gap='15px' >
                        <Text>Isso não pode ser desfeito, será removido do seu perfil e da linha do
                            tempo de todas as contas do Petwitte.</Text>
                        <form onSubmit={handleSubmit(onSubmit)}><Button w={'100%'} bgColor={'#f4212e'} borderRadius={'full'} type='submit'>Deletar</Button></form>
                        <Button variant='outline' borderRadius={'full'} onClick={onClose}>Cancelar</Button>
                    </ModalBody>
                </ModalContent>
            </Modal> : ''}
        </Stack>
    )
}

export default Petwitte

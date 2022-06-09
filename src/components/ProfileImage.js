import {
    Flex, Text, Icon, Input, InputGroup, InputLeftElement, InputRightElement,
    Button, useToast, Modal, ModalOverlay, ModalContent,
    Image, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Box,
    UnorderedList, ListItem, Link, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader
} from "@chakra-ui/react"
import { Fragment, useState } from "react"
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { BsCheckLg } from 'react-icons/bs';
import { updateProfile } from "../services/auth";
import { useAuth } from "../context/auth-context";
import { useLocation } from "react-router-dom";
import { MdPets, MdOutlineAddPhotoAlternate } from 'react-icons/md';

const ProfileImage = ({ profilePicture }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: zoomIs, onOpen: zoomOn, onClose: zoomClose } = useDisclosure()
    const { user } = useAuth()
    const location = useLocation()
    const toast = useToast()
    const [picture, setPicture] = useState(false)

    const schema = yup.object({ image_url: yup.string().required("Link obrigatório") }).required();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema), });

    const onSubmit = async (event) => {
        try {
            const { image_url } = event
            if (!image_url.includes('https://drive.google.com/file/d/')) return toast({
                position: 'top',
                title: 'Link inválido.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            const image = process.env.REACT_APP_GOGLE_DRIVE_URL + image_url.replace('https://drive.google.com/file/d/', '').split('/')[0]
            await updateProfile(user.id, { image_url: image });
            toast({
                position: 'top',
                title: 'Perfil atualizado com sucesso.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            reset()
            onClose()
            setPicture(image)
        } catch (error) {
            toast({
                position: 'top',
                title: 'Ruf Ruf!?',
                description: 'Não foi possível atualizar foto: ' + error.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
        }
    }

    return (
        <Fragment>
            <Box position='relative'>
                <Image cursor={'zoom-in'} borderRadius='full' boxSize={['73px', '120px']} src={picture || profilePicture} bgColor='#00ACC1' onClick={zoomOn} />
                {location.pathname === '/profile' ? <Icon as={MdOutlineAddPhotoAlternate} w={'15px'} h={'15px'} cursor='pointer' p={'1px'} position={'absolute'} onClick={onOpen} right={['-10px', 0]} bottom={0} bgColor={'#00acc1'} borderRadius={'5px'} /> : ''}
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Atualizar foto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody position={'relative'} >

                        <Text>REQUISITOS: </Text>
                        <UnorderedList>
                            <ListItem>Ter uma conta no <Link href="https://www.google.com/intl/pt-br/drive/about.html" isExternal color='#00ACC1'> Google Drive</Link>.</ListItem>
                            <ListItem>Fazer o upload da foto no Google Drive.</ListItem>
                            <ListItem>Gerar link de compartilhamento.</ListItem>
                            <ListItem>Tornar link público para qualquer pessoa.</ListItem>
                            <ListItem>Colar abaixo o link copiado.</ListItem>
                        </UnorderedList>
                        <Text mt={'10px'}>Tutorial rápido por vídeo <Link href='https://youtube.com/shorts/-xjbIBZXd7Y?feature=share' isExternal color='#00ACC1'>aqui</Link>. (30seg)</Text>

                        <Popover>
                            <PopoverTrigger>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Flex align='center' my={'20px'}>
                                        <InputGroup >
                                            <InputLeftElement pointerEvents='none' children={<Icon as={MdPets} />} />
                                            <Input type='tel' placeholder='Link da foto' {...register("image_url")} autoComplete='off' />
                                            <InputRightElement children={<Button type="submit" borderRadius={'0 8px 8px 0'} _hover={{ backgroundColor: 'green.200' }}><Icon as={BsCheckLg} color='green.500' /></Button>} />
                                        </InputGroup>
                                    </Flex >
                                </form >
                            </PopoverTrigger>
                            {errors.image_url &&
                                <PopoverContent w={'fit-content'}>
                                    <PopoverArrow />
                                    <PopoverHeader bgColor={'red.500'} borderRadius='5px'>{errors.image_url.message}</PopoverHeader>
                                </PopoverContent>
                            }
                        </Popover>

                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={zoomIs} onClose={zoomClose}>
                <ModalOverlay />
                <ModalContent><Image src={profilePicture} cursor={'zoom-out'} onClick={zoomClose} /></ModalContent>
            </Modal>
        </Fragment>
    )
}

export default ProfileImage

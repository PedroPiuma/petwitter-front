import {
    Flex, Text, Icon, Input, InputGroup, InputLeftElement, InputRightElement,
    Alert, AlertIcon, Button, useToast, Modal, ModalOverlay, ModalContent,
    Image, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Box,
    UnorderedList, ListItem, Link
} from "@chakra-ui/react"
import { Fragment, useState } from "react"
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { BsCheckLg } from 'react-icons/bs';
import { MdPets, MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { updateProfile } from "../services/auth";
import { useAuth } from "../context/auth-context";
import { useLocation } from "react-router-dom";

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
                duration: 2000,
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
            console.log('Falha no submit')
        }
    }

    return (
        <Fragment>
            <Box position='relative'>
                <Image cursor={'zoom-in'} borderRadius='full' boxSize={['73px', '120px']} src={picture || profilePicture} bgColor='#00ACC1' onClick={zoomOn} />
                {location.pathname === '/profile' ? <Icon as={MdOutlineAddPhotoAlternate} w={'15px'} h={'15px'} cursor='pointer' position={'absolute'} onClick={onOpen} right={['-10px', 0]} bottom={0} /> : ''}
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Atualizar foto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody position={'relative'} >
                        <Text>REQUISITOS:</Text>
                        <UnorderedList>
                            <ListItem>Ter uma conta no Google Drive.</ListItem>
                            <ListItem>Fazer o upload da foto no Google Drive.</ListItem>
                            <ListItem>Copiar link da foto clicando em compartilhar.</ListItem>
                            <ListItem>Colar abaixo o link copiado.</ListItem>
                        </UnorderedList>
                        <Text mt={'10px'}>Tutorial rápido por vídeo <Link href='https://youtube.com/shorts/-xjbIBZXd7Y?feature=share' isExternal color='#00ACC1'>aqui</Link>. (30seg)</Text>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Flex align='center' my={'20px'}>
                                <InputGroup >
                                    <InputLeftElement pointerEvents='none' children={<Icon as={MdPets} />} />
                                    <Input type='tel' placeholder='Link da foto' {...register("image_url")} autoComplete='off' />
                                    {errors.image_url && <Alert status='warning'><AlertIcon />{errors.image_url.message}</Alert>}
                                    <InputRightElement children={<Button type="submit" borderRadius={'0 8px 8px 0'} _hover={{ backgroundColor: 'green.200' }}><Icon as={BsCheckLg} color='green.500' /></Button>} />
                                </InputGroup>
                            </Flex >
                        </form >
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

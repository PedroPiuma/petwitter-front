import { Text, Flex, ListItem, Stack, UnorderedList, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Button, useToast } from "@chakra-ui/react";
import { Link, Link as ReachLink, Outlet } from "react-router-dom";
import menuHamburguer from '../img/menu-hamburguer.png'
import logo from '../img/logo.png'
import AuthStatus from "./AuthStatus";
import exitIcon from '../img/exit-icon.png'
import { useAuth } from "../context/auth-context";


import dogwithglasses from '../img/dogwithglasses.png'

function Layout() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const closeAll = () => toast.closeAll()
  const { signout } = useAuth()

  const logout = () => {
    signout()
    closeAll()
  }

  return (
    <Stack>
      <Flex align={'center'} p={'16px'}>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent height={'100vh'} m={0} width={'258px'} left={0} position={'fixed'}
            borderRadius={'0 8px 8px 0'}>
            <ModalCloseButton />
            <ModalBody display={'flex'} flexDirection={'column'} alignItems='center' pt={'40px'}>
              <Image borderRadius='full' boxSize='56px' src={dogwithglasses} />
              <Stack display={'flex'} flexDirection='column' alignItems={'center'} variant={''}>
                <Link as={ReachLink} to="/">Home</Link>
                <Link as={ReachLink} to="/#">Meu perfil</Link>
              </Stack>
              <Button colorScheme='teal' variant='link' onClick={() => {
                onClose()
                toast({
                  position: 'top', duration: 20000, isClosable: true,
                  render: () => (
                    <Stack p={'16px'} bgColor={'white'} borderRadius={'8px'}>
                      <Text fontWeight={'600'} fontSize='24px' color={'gray.700'}>Sair desta conta?</Text>
                      <Text fontWeight={'400'} fontSize='16px' color={'#757575'}>Deseja realmente sair desta conta?</Text>
                      <Flex justifyContent={'space-between'} gap={'12px'}>
                        <Button colorScheme='twitter' variant='outline' w={'146px'} onClick={logout}>Sair</Button>
                        <Button colorScheme='twitter' variant='solid' w={'146px'} onClick={closeAll}>Cancelar</Button>
                      </Flex>
                    </Stack>
                  )
                })
              }}>
                <Image src={exitIcon} mr='11px' />Sair</Button>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Image src={menuHamburguer} h={'16px'} w={'24px'} mr={'84px'} onClick={onOpen} />
        <Image src={logo} h={'28px'} w={'116px'} />
      </Flex>

      <AuthStatus />

      <UnorderedList>
        <ListItem>
          <ReachLink to="/">Public Page</ReachLink>
        </ListItem>
        <ListItem>
          <ReachLink to="/protected">Protected Page</ReachLink>
        </ListItem>
      </UnorderedList>

      <Outlet />
    </Stack>
  );
}

export default Layout;
